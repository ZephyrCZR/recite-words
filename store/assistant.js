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
	netGetBookInfo,
	netGetWaitingWords} from '../network/server'

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
		saveToLocal('BOOK_INFO', bookInfo)
	}
	return bookInfo
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
		saveToLocal('SYS_LIB', booksList)
	}
	return booksList
}

//获取计数器
export async function getCounter(reset = 0) { 
	/*
		参数为0: 正常获取缓存值，若缓存值为0或不存在，返回-1，若缓存值存在且不为0，返回缓存值；
		参数为-1: 重置counter缓存值为0，返回0
		参数>0: 设置counter缓存值，并且返回修改完成的值
	*/
	let counter = false
	
	if(!reset){//如果reset为零，从本地获取值
		counter = uni.getStorageSync('COUNTER')
	}
	
	if(!counter){//如果reset不为零，则允许更改counter
		reset = reset === -1 ? 0 : reset
		uni.setStorageSync('COUNTER', reset)
		counter = reset
	}	
	return counter ? counter : 0 
}

//获取Waiting长度
export async function getWaitingLength() {
	//尝试从本地获取
	const waiting = uni.getStorageSync('WAITING')
	return waiting ? waiting.length : 0
}

//从服务器/本地获取指定数量单词信息(waiting)
export async function getWaiting(wordsIdArr = [],net = false) {
	let words = []
	if(!net) {
		words = uni.getStorageSync('WAITING')
	}else{
		words = await netGetWaitingWords(wordsIdArr)
		
		//添加marker对象
		words.forEach((word) => {
			word.marker = {}
			word.marker.step = 0 //阶段
			word.marker.noshow = 0 //连续没出现回合每次+1
			word.marker.error = 0 //连续错误的次数每次错误+2，最高6分
			word.marker.score = 3 //决定出场的顺序，初始3分，出现过一次之后按照score = noshow + error计算
		})		
		
	}	
	return words	
}

//获取本地的正在学习单词队列
export async function getQueue() {
	let queue = uni.getStorageSync('QUEUE')
	console.log('getQueue')
	console.log(queue)
	return queue ? queue : []
}


	

//通用版保存到本地的方法，无再次从服务器获取数据的保险机制，只保证存入的数据不为空
export async function saveToLocal(storageName, data) {
	if(data){
		uni.setStorageSync(storageName,data)
	}else{
		console.log(storageName + "数据保存失败")
	}
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

// export async function getData(storageName) {
// 	//尝试从本地获取
// 	let data = uni.getStorageSync(storageName)
// 	if(!data){
// 		//尝试从服务器获取
// 		data = await netGetWaitingWords(wordsIdArr)
		
// 	}
// }