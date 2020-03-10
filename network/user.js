const request = require("./request");
const sha256 = require("sha256");

const TEMP_TOKEN = uni.getStorageSync('TempToken')

//获取背景图，背景图片描述
export function login(options) {
	const key = sha256(options.password + "zengchun529")
	return request.post('/login', {
		phone: options.phone,
		password: key
	})
}

export function register(options) {	
	const key = sha256(options.password + "zengchun529")	
	return request.post('/register', {
		phone: options.phone,
		password: key,
		code: options.code,
		token: TEMP_TOKEN
	})
}

export function getMessage(options) {
	return request.post('/getmsg', options)
}


// export function resetpassword() {
// 	return uniReq.post('/home/loaddata')
// }

	
module.exports ={ login, register, getMessage }