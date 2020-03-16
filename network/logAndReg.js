const sha256 = require("sha256");
const baseURL = 'http://192.168.0.105:5230/member'

const LAR = function(path, body) {	
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'POST',
			url: baseURL + path,
			data: body,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}

//登录 并获取用户信息表 token
export function login(options) {
	const key = sha256(options.password + "zengchun529")
	return LAR('/login', {
		phone: options.phone,
		password: key
	})
}

//注册 并获取用户信息表 token
export function register(options) {
	const TEMP_TOKEN = uni.getStorageSync('TempToken')
	if (TEMP_TOKEN) {
		const key = sha256(options.password + "zengchun529")
		return LAR('/register', {
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
	return LAR('/getmsg', options)
}

//修改密码
// export function resetpassword() {
// 	return uniReq.post('/home/loaddata')
// }




