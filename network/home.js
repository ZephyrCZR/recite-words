import {
	get,
	post
} from "./request";

const INFO = uni.getStorageSync('UserInfo')
console.log(INFO.calendar)
// console.log(INFO.calendar[0])

//获取词书状态信息
export function getBookInfo(book_id) {
	return get('/word/download', {
		book_id
	})
}

//每日初始化，并且获取用户信息表
export function dailyInit() {
	return post('/home/init',{
		_id: INFO._id,
		calendar: INFO.calendar[0]
	})
}

//打卡
export function clockIn() {
	return get('/home/clock', {
		user_id: INFO._id
	})
}

