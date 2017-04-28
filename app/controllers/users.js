'use static';

var Users = require('../models/users')

function createUser (user) {
  return new Promise((resolve, reject) => {
    if (!user || !user.telephone || !user.password) {
      reject({
        code: 422,
        message: 'user\'s telephone & pwd is necessary'
      })
    }
    Users
      .findOne({'telephone': user.telephone}, {'_id': false})
      .exec(function (err, result) {
        if (err) reject(err)

        if (result) {
          reject({
            code: 403,
            message: 'this user is already exist'
          })
        } else {
          var newUser = new Users()
          newUser.telephone = user.telephone
          newUser.password = user.password
          resolve()
        }
      })
  })

}

exports.createUser = createUser
