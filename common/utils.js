import {	
	getUserInfo
} from '../network/server.js'
import {getBookInfo} from '../network/study.js'

//正则匹配，type：phone，password 
export function expTest(type, string) {
	let exp = new RegExp()
	if (type == 'phone') {
		exp = new RegExp("^1(3|4|5|7|8)\\d{9}$");
	}
	if (type == 'password') {
		exp = new RegExp("^[a-zA-Z]\\w{5,17}$");
	}
	return exp.test(string)
}

//格式化时间戳
export function dateFormat(time) {
	let date = new Date(time)
	let arr = []
	arr.push(date.getFullYear())
	arr.push(date.getMonth() + 1)
	arr.push(date.getDate())
	return arr.join('-')
}

//尝试获取用户信息，如果没有，发送网络请求获取
export async function getUInfo(net = false) {
	let UserInfo = false
	if(!net){
		//尝试从本地获取用户信息
		UserInfo = uni.getStorageSync('UserInfo')
	}
	
	//如果没有用户信息表，则发送请求重新获取用户信息表
	if (!UserInfo) {
		console.log("没有用户信息表, 开始尝试从服务器获取")
		UserInfo = await tryGetUserInfoFromNet()
	}
	return UserInfo
}

//将用户信息存入本地
export async function setUInfo(uInfo) {
	// 将用户信息存入本地,并检测是否存入成功
	if (uInfo) {
		console.log("存入用户信息")
		console.log(uInfo)
		uni.setStorageSync('UserInfo', uInfo)
	} else {
		console.log(uInfo)
		//如果存入失败，尝试重新获取用户信息（保险机制）
		console.log("没有获取到用户信息表, 开始尝试从服务器获取")
		tryGetUserInfoFromNet()
	}
}

//尝试从网络获取用户信息
const tryGetUserInfoFromNet = async function() {
	const UserInfo = await getUserInfo()

	if (!UserInfo) {
		console.log("获取用户信息失败，请重新登录") //基本不可能走到这里
		uni.removeStorageSync('TOKEN') //我怀疑是你的token有问题（开始甩锅）
		uni.redirectTo({
			url: '/pages/login/login/login.vue'
		})
		return
	}
	uni.setStorageSync('UserInfo', UserInfo)

	return UserInfo
}

//尝试获取本地词书状态信息，如果没有，发送网络请求获取
export async function getBInfo() {
	//如果用户没有选定的词书，跳过后面流程
	const uInfo = await getUInfo()
	if (!uInfo.book_id) {
		return
	}

	//尝试从本地缓存获取词书信息	
	let BookInfo = uni.getStorageSync('BookInfo')

	//如果没有词书信息，则发送请求重新获取
	if (!BookInfo) {
		console.log("没有词书信息, 开始尝试从服务器获取")
		const BookInfo = await getBookInfo(uInfo.book_id)

		if (!BookInfo) {
			console.log("获取词书信息失败，请检查您的网络状态") //开始甩锅
			uni.removeStorageSync('TOKEN') //顺便把你token给扬了
			uni.redirectTo({
				url: '/pages/login/login/login.vue'
			})
			return
		}
		uni.setStorageSync('BookInfo', BookInfo)
	}
	return BookInfo
}



