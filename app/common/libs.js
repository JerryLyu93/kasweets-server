"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const crypto_1 = require("crypto");
function getRandomString(byte) {
    return new Promise((resolve, reject) => {
        crypto_1.randomBytes(byte, function (err, buf) {
            if (err)
                reject(err);
            resolve(buf.toString('hex'));
        });
    });
}
exports.getRandomString = getRandomString;
function wxjscode2session(code) {
    return new Promise((resolve, reject) => {
        https_1.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.WXAPPID}&secret=${process.env.WXAPPSECRET}&js_code=${code}&grant_type=authorization_code`, (res) => {
            res.on('data', (d) => {
                let data = d;
                if (Buffer.isBuffer(d)) {
                    data = data.toString();
                }
                data = JSON.parse(data);
                if (data.errcode) {
                    reject(data);
                }
                resolve(data);
            });
        }).on('error', (e) => {
            reject('wxjscode2session error');
        });
    });
}
exports.wxjscode2session = wxjscode2session;
function wrapRoutesMethod(p, req, res) {
    p.then(d => {
        res.send(d);
    }).catch(e => {
        console.error(e);
        res.status(e.code || 400);
        res.send(e.message);
    });
}
exports.wrapRoutesMethod = wrapRoutesMethod;
