"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const co = require("co");
const mongoose = require("mongoose");
const libs_1 = require("../common/libs");
const WXBizDataCrypt = require("../common/WXBizDataCrypt");
const User = mongoose.model('User');
/*
private
*/
/*
public
*/
/**
* create user if this user not be created
*/
var create = function (req, res) {
    const user = req.body;
    if (!user || !user.telephone || !user.password) {
        return res.send({
            code: 422,
            message: 'user\'s telephone & password is necessary'
        });
    }
    User
        .findOne({ 'telephone': user.telephone }, { '_id': false })
        .exec(co.wrap(function* (err, result) {
        if (err)
            return res.send(err);
        if (result) {
            res.send({
                code: 403,
                message: 'this telephone is already exist'
            });
        }
        else {
            var newUser = new User();
            newUser.telephone = user.telephone;
            newUser.password = user.password;
            newUser.name = user.name || `用户${user.telephone}`;
            var result = yield newUser.save();
            res.send(result);
        }
    }));
};
/**
* use telephone number to get user's data
*/
function load(req, res) {
    const telephone = req.query.telephone;
    if (!telephone) {
        return res.send({
            code: 422,
            message: `telephone cound not be null`
        });
    }
    User
        .findOne({ telephone: telephone }, {
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
            });
        }
        if (result) {
            res.send(result);
        }
        else {
            res.send({
                code: 403,
                message: 'this user isn\'s exist'
            });
        }
    });
}
/**
* use weixin's login code to get session_key and openid
*/
function wxauth(req, res) {
    libs_1.wrapRoutesMethod(new Promise((resolve, reject) => {
        const code = req.body.code;
        if (typeof code !== 'string' || code === '')
            resolve({
                code: 400,
                message: 'code didn\'t exist'
            });
        co(function* () {
            let [wxsession, mysession] = yield [
                libs_1.wxjscode2session(code),
                libs_1.getRandomString(16)
            ];
            let wxBiz = new WXBizDataCrypt(process.env.WXAPPID, wxsession.session_key);
            // save wx 3rd session
            req.session[mysession] = wxsession;
            resolve({
                key: mysession,
                value: wxsession,
                wxbiz: wxBiz.decryptData(req.body.encryptedData, req.body.iv)
            });
        }).catch(e => {
            console.log(e);
            reject(e);
        });
    }), req, res);
}
function parseWXencryptedData() {
    WXBizDataCrypt;
}
module.exports = {
    create,
    load,
    wxauth
};
