import request from '@/utils/request'
export const login = data => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}
// 获取验证码
export const sendMsg = (data) => {
  return request({
    url: '/v1_0/sms/codes/',
    method: 'GET',
    data
  })
}
