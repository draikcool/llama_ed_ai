import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import md5 from '../md5/md5.js'
import { UserData } from '../../types/user.js'

// const baseURL = 'http://jiazhpc.cn'

const axios: AxiosInstance = Axios.create({
  timeout: import.meta.env.VUE_APP_TIMEOUT, // 请求超时
  headers: {
    'Content-Type': 'application/json',
    channel: '2'
  }
})

function requestEncrypt(data: { [x: string]: string }) {
  const secret = import.meta.env.VUE_APP_SECRET

  let _str = ''
  const keys = Object.keys(data)
  keys.sort()
  keys.forEach((key) => {
    _str += key + data[key]
  })
  _str = secret + _str + secret
  return md5.hex_md5_32Upper(_str)
}

export default function request(options: AxiosRequestConfig) {
  options.data.timestamp = new Date().valueOf()
  options.data.app_key = import.meta.env.VUE_APP_KEY
  options.data.sign = requestEncrypt(options.data)

  if (options.method == 'get') {
    let params = ''
    const keys = Object.keys(options.data)
    keys.forEach((key) => {
      params += key + '=' + options.data[key] + '&'
    })
    options.url += '?' + params
  }
  // 从 localStorage 获取存储的用户信息，并尝试解析为 JSON
  const userInfoString: string | null = localStorage.getItem('userInfo')

  let userData: UserData | null = null
  let auth: string = ''

  if (userInfoString) {
    try {
      // 解析存储的字符串为用户信息对象
      userData = JSON.parse(userInfoString) as UserData
      // 如果解析成功，设置授权令牌
      auth = 'Bearer ' + userData.accessToken
    } catch (e) {
      // 处理 JSON 解析错误，例如打印错误信息或设置默认值
      console.error('解析用户信息时出错：', e)
      auth = '' // 或者设置为默认的 auth 值
    }
  }

  axios.defaults.headers['AUTHORIZATION'] = auth

  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
