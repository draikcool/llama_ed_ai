export interface UserData {
  accessToken: string
  userInfo: UserInfo
}

interface UserInfo {
  id: number
  nickname: string
  head_img: string
  uname: string
  college: string
  major: string
  email: string
  desc: string
  openid: null | string
  unionid: null | string
  channel_id: number
  phone: string
  platform: string
  createtime: number
  updatetime: number
  channel_id_text: string
  status_text: string
}
