import { uniReq } from "./request";

//获取背景图，背景图片描述
export function getBackgroundImg() {
  return uniReq.get ('/home/bg')
}

export function syncData() {
  return uniReq.post ('/home/upload')
}

export function loadData() {
  return uniReq.post ('/home/loaddata')
}

