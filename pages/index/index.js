import {
	getUInfo,
	setUInfo,
	getBInfo,
	dateFormat
} from '../../common/utils.js'

import {
	dailyInit,
	getBookInfo,
	clockIn
} from '../../network/server.js'

// 获取今天日期 yyyy-mm-dd
const today = dateFormat(Date.now())

//尝试初始化用户记录表
const tryInitRecord = async function(that, UserInfo) {

	//防止UserInfo.calendar为null而报错
	let length = UserInfo.calendar ? UserInfo.calendar.length : 0

	let calendar = false
	if (length > 0) { //判断用户信息表中是否有记录表	
		let index = UserInfo.calendar.length - 1
		calendar = UserInfo.calendar[index] //获取最后一张记录表
		//如果该表是今日的记录表，设置签到组件状态（凌晨0-4点无法签到）
		if (calendar.date === today) {
			that.isClock = calendar.clock
			return //并且中断退出该方法
		}

	}
	//程序运行到这里，calendar要么为false，要么是一张旧的记录表
	//发送初始化请求
	const uInfo = await dailyInit(calendar)
	that.isClock = uInfo.isClock
	console.log("今日初始化完成")
	setUInfo(uInfo)
}

//判断用户信息中，有没有选定的词书，如果没有，要求添加词书；如果有，判断该词书状态信息表是否存在，如果没有，发送请求获取。 
const checkBook = async function(that, UserInfo) {

	if (UserInfo.book_id) { //判断是否已有选中的词书
		//尝试获取词书信息
		await getBInfo()
	} else { //如果没有已选中的词书，设置this.noBook为true，弹出要求添加词书
		that.noBook = true
	}
}

//统计词书信息
const statistics = async function(that) {

	//获取本地词书信息
	const BookInfo = await getBInfo()

	if (!BookInfo) { //如果用户没有词书，return
		return
	}
	const book = BookInfo.book
	//识别分类单词的状态
	let learn = 0 //未背诵的				
	let review = 0 //需要复习的

	for (let i = 0; i < book.length; i++) {
		const word = book[i]
		if (word.state === 0) {
			learn++
			continue;
		}
		if (word.state === 1 && word.next_date <= today) {
			review++
			continue;
		}
	}
	that.book_state.learn = learn
	that.book_state.review = review
}

export async function init(that) {

	//获取用户信息
	const UserInfo = await getUInfo()

	if (!UserInfo) { //如果获取不到用户信息
		return
	}

	//记录表
	await tryInitRecord(that, UserInfo)
	//检查用户是否用有词书
	await checkBook(that, UserInfo)
	//统计词书信息
	await statistics(that)
}

//签到
export async function clock() {
	const uInfo = await clockIn()
	// 更新本地用户信息表
	await setUInfo(uInfo)
	return //new Promise(() => {}) 
}
