import { get as httpGet } from 'https'
import {randomBytes} from 'crypto'

export function getRandomString (byte: number):Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(byte, function(err, buf) {
      if (err) reject(err)
      resolve(buf.toString('hex'))
    })
  })
}

export function wxjscode2session (code: string):object {
  return new Promise((resolve, reject) => {
    httpGet(`https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.WXAPPID}&secret=${process.env.WXAPPSECRET}&js_code=${code}&grant_type=authorization_code`, (res) => {
      res.on('data', (d) => {
        let data:any = d
        
        if (Buffer.isBuffer(d)) {
          data = data.toString()
        }
        
        data = JSON.parse(data)
     
        if (data.errcode) {
          reject(data)
        }
        resolve(data)
      })
    }).on('error', (e) => {
      reject('wxjscode2session error')
    })
  })
}

export function wrapRoutesMethod (p: Promise<any>, req, res): void {
  p.then(d => {
    res.send(d)
  }).catch(e => {
    console.error(e)
    res.status(e.code || 400)
    res.send(e.message)
  })
}
 