import {
	UPDATE_USER_INFO,
	UPDATE_BOOK_INFO,
	UPDATE_Lib_INFO,
	CLOCK_IN
} from "./mutation-types"

import {
	dateFormat
} from '../common/utils.js'

import {
	getUserInfo,	
	getBookInfo,
	getLibInfo,
	saveUserInfo,
	saveLibInfo,
} from './assistant.js'

import { 
	netDailyInit,
	netClockIn,
	netGetUserInfo,
	netGetServerBookList,
	netAddUserBook,
	netGetBookInfo } from '../network/server'

export default {
	
	//初始化用户信息
	async initUserInfo(context) {
		let userInfo = await getUserInfo()

		//判断是否需要更新每日记录表calendar

		//防止userInfo.calendar为null而报错
		let length = userInfo.calendar ? userInfo.calendar.length : 0

		let calendar = false
		//获取今天日期 yyyy-mm-dd
		const today = dateFormat(Date.now() - 4 * 60 * 60 * 1000) //慢四个小时
		/*
		判断用户信息表中是否有学习记录表，如果有学习记录表且该表是今日的记录表，
		（系统返回的calendar.date全都慢4四个小时）
		*/
		//如果用户信息中是否有学习记录表，获取最后一张记录表
		if (length > 0) {
			calendar = userInfo.calendar[length - 1]
		}
		//如果没有学习记录表，或者最后一张学习记录表不是今天的，向服务器获取新的记录表
		if (length === 0 || calendar.date !== today) {
			//发送每日初始化请求，获取到新的用户信息
			const newUersInfo = await netDailyInit(calendar)
			//将新的信息表存入本地缓存
			await saveUserInfo(newUersInfo)
			userInfo = newUersInfo

			console.log("今日初始化完成")
		}

		context.commit(UPDATE_USER_INFO, userInfo)
		return ('用户信息初始化完成')
	},


	//初始化词书信息
	async initBookInfo(context) {
		//获取获取词书信息
		context.commit(UPDATE_BOOK_INFO, await getBookInfo())
		return ('词书信息初始化完成')
	},


	//初始化书库信息
	async initLibInfo(context) {		
		context.commit(UPDATE_Lib_INFO, await getLibInfo())
		return ('书库信息初始化完成')
	},


	//签到
	async clock(context) {
		const userInfo = await netClockIn()
		// 更新本地用户信息表
		await saveUserInfo(userInfo)
		// 更新M币数量
		context.commit(CLOCK_IN, userInfo)
	},


	//添加词书
	async addBook(context, book_name) {
		//发送添加词书的网络请求
		const userInfo = await netAddUserBook(book_name)		
		//更新用户信息
		await saveUserInfo(userInfo)		
		context.commit(UPDATE_USER_INFO, userInfo)
	},


}
