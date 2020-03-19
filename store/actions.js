import {
	UPDATE_USER_INFO,
	UPDATE_BOOK_INFO,
	UPDATE_Lib_INFO,
	CLOCK_IN,
	UPDATE_QUEUE,
	SET_CURRENT_WORD,
	SET_CURRENT_COUNT,
	SET_CURRENT_PAGE
} from "./mutation-types"

import {
	dateFormat
} from '../common/utils.js'

import {
	getUserInfo,	
	getBookInfo,
	getLibInfo,
	saveUserInfo,
	saveToLocal,
	getWaiting,
	getQueue,
	getCounter,
	getWaitingLength
} from './assistant.js'

import { 
	netDailyInit,
	netClockIn,	
	netAddUserBook
	 } from '../network/server'

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
		console.log(userInfo)
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


 //初始化单词队列(两个队列)
  async initQueues(context) {
		let waiting = []
		let queue = []

		//1.判断上一组学习目标是否已经完成，本地是否有缓存
		let counter = await getCounter()//每次完成一组学习，会重置counter

		if(counter === 0){ //当counter = 0 表示学习组已重置, 上组学习已完成或者本地缓存被清除

			//将waiting队列补充到40个单词
			
			//查询本地waiting队列单词数量
			const length = await getWaitingLength()
			
			
			//2a.获取40-length个未背单词id的数组
			let wordsIdArr = []
			let book = context.state.book_info.book

			for(let i = 0; i<40-length && i < book.length;){
				const word = book[i]		
				if(word.state === 0) {
					wordsIdArr.push(word.word_id)
					i++
				}
			}	 
			
			//2b.获取单词详情列表
			let localWords = await getWaiting()//从本地获取
			let netWords = []
			if(wordsIdArr.length !== 0){
				netWords = await getWaiting(wordsIdArr, true)//从服务器获取
			}			
			
			//拼接，取得一个包含40个未背单词的数组（除非未背的单词不满40个）
			waiting = [...localWords, ...netWords]
			
		}else{//如果上一组学习未完成
			
			//2a.从本地获取单词详情列表
			waiting = await getWaiting()//从本地缓存获取			
		}

		//3.判断正在学习的单词队列：
		queue = await getQueue() //从本地获取正在学习的单词队列
		
		//4.若正在学习的单词数不满10,补充到10
		let length = queue.length
		for(let i = 0; i < (10 - length); i++){
			queue.push(waiting.pop())
		}
		console.log(queue)
		console.log(waiting)
		//5.保存到缓存
		saveToLocal('QUEUE', queue)
		saveToLocal('WAITING', waiting)		
		
		context.commit(UPDATE_QUEUE, queue)
  },
	
	//获取当前分数最高的一个单词和分数最低的两个单词
	async getCurrentWord(context) {
		let queue = await getQueue() //获取到单词队列
		//获取score最大的单词
		let word = {marker:{score: -1}}
		queue.forEach((el) => {
			if(el.marker.score > word.marker.score){
				word = el
			}
		})
		
	  let wrong = selectMinScore(queue)
		let wordArr = [word,...wrong]
		
		context.commit(SET_CURRENT_WORD, wordArr)			
	},
	
	//获取计数器
	async getCurrentCount(context, setter = -1) {
		let counter = 0
		if(setter !== -1){
			counter = await getCounter(setter)
		}else{
			counter = await getCounter()
		}		
		context.commit(SET_CURRENT_COUNT, counter)		
	},
	
	//更改当前显示的页面
	async changePage(context, page){
		context.commit(SET_CURRENT_PAGE, page) 
	},
	
	//选择正确
	async isCorrect(context){
		let currentWord = context.state.currentWord
		let queue = context.state.queue
		
		//获取增加后的step值
		let newStep = currentWord.marker.step + 1
		let index = -1
		//查找对应的单词
		for (let i = 0; i < queue.length; i++) {
			let el = queue[i]
			let noshow = ++el.marker.noshow
			el.marker.score = noshow + error*2>10?10:error*2 + step
 			if(el._id === currentWord._id){
				index = i
			}
		}		
		console.log("index:",index)
		
		if(newStep<4){
				console.log(queue[index])
			//更新marker
			queue[index].marker={
				error: 0,
				noshow: 0,
				score: newStep,
				step: newStep
			}
			
		}else{
			//从queue中删除该单词
			let word = queue.splice(index,1)
			console.log("刚刚被完成的单词是：")
			console.log(word)
			
			//从waiting队列中获取一个新的单词
			let waiting = await getWaiting()
			queue.push(waiting.shift()) 
		}
				
		//更新缓存队列
		saveToLocal('QUEUE', queue)
		
		//提交mutation
		context.commit(UPDATE_QUEUE, queue)		
	},
	
	//选择错误
	async isistake(context){
		let currentWord = context.state.currentWord
		let queue = context.state.queue

		
		//查找对应的单词
		let index = queue.findIndex(el => el._id === currentWord._id)

		let error = currentWord.marker.error + 1
		let score = error*2 > 10 ? 10 : error*2
		
		//更新marker
		queue[index].marker={
			error: error,
			noshow: 0,
			score: score,
			step: 0
		}
						
		//更新缓存队列
		saveToLocal('QUEUE', queue)
		
		//提交mutation
		context.commit(UPDATE_QUEUE, queue)	
	},
	
}


const selectMinScore = function(list) {
	let word_a = {marker:{score: Number.MAX_VALUE}}
	let word_b = {marker:{score: Number.MAX_VALUE}}
	let arr = list.reverse()
		console.log(arr)
	arr.forEach((el) => { //将数组颠倒，避免当所有单词的分数相同时，取到同一个单词
		if(el.marker.score < word_a.marker.score){
			console.log(el)
			word_a = el			
			if(word_a.marker.score < word_b.marker.score){
				[word_a,word_b] = [word_b,word_a]
			}			
		}
	})	
	return [word_a,word_b]
}