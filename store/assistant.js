/*
	负责处理本地缓存与服务器数据库的关系
	决定数据应该从本地缓存获取还是从服务器获取
	保证每个storage的get、set方法只出现一遍
*/
import { 
	netDailyInit,
	netClockIn,
	netGetUserInfo,
	netGetServerBookList,
	netAddUserBook,
	netGetBookInfo } from '../network/server'

//尝试获取用户信息，如果没有，发送网络请求获取 参数为true时，直接从服务器获取数据
export async function getUserInfo(net = false) {
	let userInfo = false
	if (!net) {
		//尝试从本地获取用户信息
		userInfo = uni.getStorageSync('USER_INFO')
	}
	//如果没有用户信息表，则发送请求重新获取用户信息表
	if (!userInfo) {
		console.log("没有用户信息表, 开始尝试从服务器获取")
		userInfo = await tryGetUserInfoFromNet()
	}
	return userInfo
}

//将用户信息存入本地
export async function saveUserInfo(userInfo) {
	// 如果有数据，将用户信息存入本地
	if (userInfo) {
		uni.setStorageSync('USER_INFO', userInfo)
	} else {
		//如果没有数据，尝试重新获取用户信息（保险机制）
		console.log("没有获取到用户信息表, 开始尝试从服务器获取")
		tryGetUserInfoFromNet()
	}
}


//尝试获取本地词书状态信息，如果没有，发送网络请求获取
export async function getBookInfo() {
	//如果用户没有选定的词书，跳过后面流程
	const userInfo = await getUserInfo()
	if (!userInfo.book_id) {
		return
	}

	//尝试从本地缓存获取词书信息	
	let bookInfo = uni.getStorageSync('BOOK_INFO')

	//如果没有词书信息，则发送请求重新获取
	if (!bookInfo) {
		console.log("没有词书信息, 开始尝试从服务器获取")
		bookInfo = await netGetBookInfo(userInfo.book_id)

		if (!bookInfo) {
			console.log("获取词书信息失败，请检查您的网络状态") //开始甩锅
			uni.removeStorageSync('TOKEN') //顺便把你token给扬了
			uni.redirectTo({
				url: '/pages/login/login/login.vue'
			})
			return
		}
		
		uni.setStorageSync('BOOK_INFO', bookInfo)
	}
	return bookInfo
}

//将书库信息存入本地缓存
export async function saveSysLib(booksList) {
	uni.setStorageSync('SYS_LIB', booksList)	
}

//获取书库信息
export async function getLibInfo() {
	//尝试从本地获取书库信息
	let booksList = uni.getStorageSync('SYS_LIB')
	if (!booksList) {
		//尝试从服务器获取书库信息
		console.log("没有获取到书库信息表, 开始尝试从服务器获取")
		//从服务器获取服务器提供的所有图书的列表
		booksList = await netGetServerBookList() 		
		saveSysLib(booksList)
	}
	return booksList
}



/*==================================================*/ 
//尝试从网络获取用户信息
const tryGetUserInfoFromNet = async function() {
	const userInfo = await netGetUserInfo()

	if (!userInfo) {
		console.log("获取用户信息失败，请重新登录") //基本不可能走到这里
		uni.removeStorageSync('TOKEN') //我怀疑是你的token有问题（开始甩锅）
		uni.redirectTo({
			url: '/pages/login/login/login.vue'
		})
		return
	}
	uni.setStorageSync('USER_INFO', userInfo)

	return userInfo
}

