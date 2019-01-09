import request from './request'


// 登录
export function getToken_api(params) {
  return request.post('user/getToken', params)
}

// 获取用户信息
export function getUserInfo_api(token) {
  return request.get('user/getInfo', {
    params: { token }
  })
}

// 获取验证码
export function getSmsCode_api(phone) {
  return request.get('user/sendSMS', {
    params: { phone }
  })
}

// 验证验证码
export function checkSmsCode_api(phone) {
  return request.get('user/checkSMS', {
    params: { phone }
  })
}

// 重置密码
export function updatePassword_api(params) {
  return request.post('user/resetPass', params)
}