import * as co from 'co';
import * as mongoose from 'mongoose';
import {getRandomString, wxjscode2session, wrapRoutesMethod} from '../common/libs'
import * as WXBizDataCrypt from '../common/WXBizDataCrypt'

interface IUser extends mongoose.Document {
  telephone: string,
  password: string,
  name: string
}

interface CallbackData {
  err: {
    code: number,
    msg: string
  },
  data: any
}

const User: mongoose.Model<IUser> = mongoose.model<IUser>('User');

/* 
private
*/

/* 
public
*/

/**
* create user if this user not be created
*/
var create = function (req, res): void {
  const user = req.body
  if (!user || !user.telephone || !user.password) {
    return res.send({
      code: 422,
      message: 'user\'s telephone & password is necessary'
    })
  }
  User
    .findOne({'telephone': user.telephone}, {'_id': false})
    .exec(co.wrap(function* (err, result) {
      if (err) return res.send(err)

      if (result) {
        res.send({
          code: 403,
          message: 'this telephone is already exist'
        })
      } else {
        var newUser = new User()
        newUser.telephone = user.telephone
        newUser.password = user.password
        newUser.name = user.name || `用户${user.telephone}`

        var result = yield newUser.save()
        res.send(result)
      }
    }))
}

/**
* use telephone number to get user's data
*/

function load (req, res) {
  const telephone = req.query.telephone

  if (!telephone) {
    return res.send({
      code: 422,
      message: `telephone cound not be null`
    })
  }
  User
    .findOne({telephone: telephone}, {
      '_id': false,
      'telephone': true,
      'usable_credit': true,
      'total_credit': true,
      'rank': 'true',
      'created': true,
      'address': true,
      'order': true,
      'birthday': true,
      'name': true
    })
    .exec(function (err, result) {
      if (err) {
        return res.send({
          code: 500,
          message: err
        })
      }

      if (result) {
        res.send(result)
      } else {
        res.send({
          code: 403,
          message: 'this user isn\'s exist'
        })
      }
    }
  )
}

/**
* use weixin's login code to get session_key and openid
*/

function wxauth (req, res) {
  wrapRoutesMethod(new Promise((resolve, reject) => {
      const code = req.body.code
      
      if (typeof code !== 'string' || code === '') 
        resolve({
          code: 400,
          message: 'code didn\'t exist'
        })

      co(function *() {
        const [wxsession, mysession] = yield [
          wxjscode2session(code),
          getRandomString(16)
        ]
        
        const wxBiz = new WXBizDataCrypt(process.env.WXAPPID, wxsession.session_key)
        const wxUserData = wxBiz.decryptData(req.body.encryptedData, req.body.iv)
        
        // save wx 3rd session
        req.session[mysession] = wxsession
        
        resolve({
          key: mysession,
          value: wxsession,
        })
      }).catch(e => {
        console.log(e)
        reject(e)
      })
    }), req, res)
}

function parseWXencryptedData() {
  WXBizDataCrypt
}

module.exports = {
  create,
  load,
  wxauth
}
