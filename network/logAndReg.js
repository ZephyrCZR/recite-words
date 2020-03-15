import {
	get,
	post
} from "./request";
const sha256 = require("sha256");



//登录 并获取用户信息表 token
export function login(options) {
	const key = sha256(options.password + "zengchun529")
	return post('/login', {
		phone: options.phone,
		password: key
	})
}

//注册 并获取用户信息表 token
export function register(options) {
	const TEMP_TOKEN = uni.getStorageSync('TempToken')
	if (TEMP_TOKEN) {
		const key = sha256(options.password + "zengchun529")
		return post('/register', {
			phone: options.phone,
			password: key,
			code: options.code,
			token: TEMP_TOKEN
		})
	}else{
		return new Promise((resolve, reject) => {
			reject("网络繁忙，请重试")//其实是没获取到临时token，让用户再获取一次
		})
	}

}

//获取短信验证码
export function getMessage(options) {
	return post('/getmsg', options)
}

//修改密码
// export function resetpassword() {
// 	return uniReq.post('/home/loaddata')
// }

//获取用户信息并保存
export function getUserInfo() {
	return new Promise((resolve, reject) => {
		get('/home/getUserInfo').then(suc => {
			console.log(suc)
			if (suc.data.uInfo) {
				uni.setStorageSync('UserInfo', suc.data.uInfo)
				console.log("获取用户信息成功")
				resolve()
			} else {
				console.log("获取用户信息失败，请重新登录")
				reject()
			}
		})
	})
}

