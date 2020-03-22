import {
	LOCK,
	UPDATE_USER_INFO,
	UPDATE_BOOK_INFO,
	UPDATE_Lib_INFO,
	CLOCK_IN,
	UPDATE_QUEUE,
	SET_CURRENT_WORD,
	SET_CURRENT_DONE,
	SET_CURRENT_PAGE,
	UPDATE_REVIEW_QUEUE,
	UPDATE_REVIEW_DONE,
	ON_SYNC,
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
	getWaitingLength,
	setWordState,
	getDone,
	upload,
	getReviews,
	getReviewDone,
	getReviewQueue,
} from './assistant.js'

import { 
	netDailyInit,
	netClockIn,	
	netAddUserBook
	 } from '../network/server'

export default {
	lock(context, bool){
		context.commit(LOCK, bool)
	},
	
	//初始化用户信息
	async initUserInfo(context) {
		let userInfo = await getUserInfo()

		//判断是否需要更新每日记录表calendar

		//防止userInfo.calendar为null而报错
		let length = userInfo.calendar ? userInfo.calendar.length : 0

		let calendar = false
		//获取今天日期
		const today = dateFormat(Date.now() - 4 * 60 * 60 * 1000) //慢四个小时，字符串格式
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



	//更改当前显示的页面
	changePage(context, page){
		context.commit(SET_CURRENT_PAGE, page) 
	},

//===============Learn===================
 //初始化Learn单词队列(两个队列)
  async initQueues(context) {
		console.log("调用了initQueues")

		let waiting = []
		let queue = await getQueue() //从本地获取正在学习的单词队列

		//1.判断上一组学习目标是否已经完成，本地是否有缓存
		// let counter = await getCounter()//每次完成一组学习，会重置counter
		const done = getDone()
				console.log(done)
		if(!done || done.length === 0){ //done不存在或者长度为0

			//将waiting队列补充到40个单词
			
			//查询本地waiting队列单词数量
			const length = await getWaitingLength()			
			
			//2a.获取40-length个未背单词id的数组(要剔除还在queue里的单词)
			let wordsIdArr = []
			let book = context.state.book_info.book
			
			let i = 0
			for (const word of book) {
			  if(word.state === 0) {
					
					if(queue.findIndex(el => el._id === word._id) === -1){
						i++
						wordsIdArr.push(word.word_id)
						
						if(i >= 40-length){
							break
						}
					}									
			  }
			}

			//2b.获取单词详情列表
			let localWords = await getWaiting()//从本地获取
			let netWords = []
			if(wordsIdArr.length !== 0){
				netWords = await getWaiting(wordsIdArr, true)//从服务器获取
				if(!netWords){
					return {error: '网络错误'} //网络错误
				}
				console.log(netWords)
			}			
			
			//拼接，取得一个包含40个未背单词的数组（除非未背的单词不满40个）
			waiting = [...localWords, ...netWords]
			
		}else{//如果上一组学习未完成
			
			//2a.从本地获取单词详情列表
			waiting = await getWaiting()//从本地缓存获取			
		}


		
		//3.若正在学习的单词数不满10,补充到10
		let length = queue.length
		for(let i = 0; i < (10 - length); i++){
			queue.push(waiting.pop())
		}

		//4.保存到缓存
		saveToLocal('QUEUE', queue)
		saveToLocal('WAITING', waiting)		
		
		context.commit(SET_CURRENT_DONE, getDone())
		context.commit(UPDATE_QUEUE, queue)
  },
	
	
	//获取当前分数最高的一个单词和两个混淆单词
	async getCurrentWord(context) {
		console.log("调用了获取单词的方法")
		let queue = await getQueue() //获取到单词队列
		//获取score最大的单词
		console.log(queue)
		let word = {marker:{score: -1}}
		let index = -1
		for(let i = 0; i < queue.length; i++){
			let el = queue[i]
			//查找循环之前分数最大的单词
			if(el.marker.score > word.marker.score){
				word = el
				index = i
			}	
			//设置分数
			queue[i].marker.noshow = queue[i].marker.noshow + 1
			let noshow = queue[i].marker.noshow
			let error = el.marker.error
			let step = el.marker.step			
			queue[i].marker.score = noshow*2 + error + step
		}
				
		console.log(word)
		//加入混淆单词
		let wordArr = [word, queue[(index+3)%10],queue[(index+6)%10]]
		
		context.commit(SET_CURRENT_WORD, wordArr)		
			
		//更新缓存队列
		saveToLocal('QUEUE', queue)		
		//提交mutation
		context.commit(UPDATE_QUEUE, queue)	
	},


	//选择正确
	async isCorrect(context){
		let currentWord = context.state.currentWord
		let queue = context.state.queue
		
		//获取增加后的step值
		let newStep = currentWord.marker.step + 1

		//查找对应的单词
		let index = queue.findIndex(el => el._id === currentWord._id)		
		
		if(newStep<4){
			//更新marker
			queue[index].marker={
				error: 0,
				noshow: 0,
				score: newStep,
				step: newStep
			}			
		}else{
			//从queue中删除该单词
			const word = queue.splice(index,1)[0]//splice返回的是一个数组
			
			//保存到临时数组
			let done = [...getDone(),word]
			console.log(done)
			saveToLocal('DONE', done)
			
		  context.commit(SET_CURRENT_DONE, done)	
			
			//操作book_info中book列表里对应的单词
			await setWordState(word._id,1) //状态设为1，表示已背诵
			console.log(uni.getStorageSync('QUEUE'))
						
			//从waiting队列中获取一个新的单词
			let waiting = await getWaiting()
			queue.push(waiting.shift()) 
			saveToLocal('WAITING', waiting)
			
			if(done.length >= context.state.config.numbers){
				//弹出提示框,提示完成了一组的学习(onSync设为1) 点击可回首页，后续做成回顾单词
				context.commit(ON_SYNC,1) //1：正在上传数据
				
				//删除done缓存 (暂时在这里删	)，之后这里可以跳转到 回顾刚刚学习的单词
				saveToLocal('DONE', [])
				//尝试将数据同步到服务器（若失败，下次重试）
				if(await upload().err_code === 0) {
					context.commit(ON_SYNC,2) //2：上传成功
				}else{
					context.commit(ON_SYNC,3) //3：上传失败
				}
			}
		
		}
				
		//更新缓存队列
		saveToLocal('QUEUE', queue)		
		
		//提交mutation
		context.commit(UPDATE_QUEUE, queue)		
	},
	
	
	//选择错误
	async isMistake(context){
		let currentWord = context.state.currentWord
		let queue = context.state.queue
		
		//查找对应的单词
		let index = queue.findIndex(el => el._id === currentWord._id)

		let error = currentWord.marker.error + 1
		
		//更新marker
		queue[index].marker={
			error: error,
			noshow: 0,
			score: error,
			step: 0
		}
		
		//更新缓存队列
		saveToLocal('QUEUE', queue)
		
		//提交mutation
		context.commit(UPDATE_QUEUE, queue)	
	},	
	
	
//===============Review=================
	//初始化review单词队列
	async initReview(context){
		console.log("调用了initReview")
		let reviewWaiting = [] //等待复习队列
		let reviewQueue = [] //正在复习组
		
		//1.复习途中退出后，下一次进入会是一轮全新的复习，但已复习完的单词不列入
		saveToLocal('REVIEW_DONE',[]) //初始化
  	context.commit(UPDATE_REVIEW_DONE, [])	//发送mutation更新页面
		 
		//2.判断今天是否已经更新过待复习的单词数组
		let oldReviews = await getReviews()//从本地获取	
		
			//判断数组第一位的时间标记位日期是否是今日,或者数组为空
		if(!oldReviews || (oldReviews && oldReviews[0] && oldReviews[0].date !== dateFormat(Date.now()))) { //此处日期采用字符串的格式

			//2a.获取最多200个待复习单词id的数组
			let wordsIdArr = []
			let book = context.state.book_info.book
			const TODAY = dateFormat(Date.now())
			
			book.forEach((word) => {
				if(word.state === 1 && word.next_date <= TODAY) { 
					wordsIdArr.push(word.word_id)
				}				
			})
		
			//2b.获取单词详情列表
			if(wordsIdArr.length !== 0){
				reviewWaiting = await getReviews(wordsIdArr, true)//从服务器获取
				console.log(reviewWaiting[0]) //打印日期标志位

			}else{//当日满足待复习条件的单词数为0
				console.log("今天没有需要复习的单词")
			}					

		}else{//当日获取的待复习列表存在缓存中
			reviewWaiting = oldReviews
		}

		//3.判断正在学习的单词队列：
		reviewQueue = await getReviewQueue() //从本地获取正在复习的单词队列

		//4.若正在学习的单词数不满用户配置的每组个数,补充满
		const group = context.state.config.numbers
		const queueLength = reviewQueue.length
		const waitingLength = reviewWaiting.length
		
		for(let i = 0; i < (group - queueLength) && i < waitingLength; i++){
			const temp = reviewWaiting.pop()
			
			if(!temp.date){ //如果不是日期标志位
				reviewQueue.push(temp) //压入queue队列
			}
		}

		//5.保存到缓存
		saveToLocal('REVIEW_QUEUE', reviewQueue)
		saveToLocal('REVIEW_WAITING', reviewWaiting)		
		
		context.commit(UPDATE_REVIEW_QUEUE, reviewQueue)		
	},
	
	
	//获取下一个单词，和混淆答案
	getNextWord(context) {
		console.log("调用了获取下一个单词的方法")
			//getters渲染队列第一个单词，因此我在这里只需要更改队列排序就可以了
		let reviewQueue = getReviewQueue()	
		
		reviewQueue.push(reviewQueue.shift())//将数组第一个放到数组末尾
		
		let wordArr = [reviewQueue[0],reviewQueue[3],reviewQueue[7]]
			
		//保存到本地缓存，并且提交给mutation
		saveToLocal('REVIEW_QUEUE', reviewQueue)
		context.commit(SET_CURRENT_WORD, wordArr)		
		context.commit(UPDATE_REVIEW_QUEUE, reviewQueue)				
	},
	
	
	//选择分为三级，认识，模糊，不认识	
	//标记该单词完成复习,标记完成不需要调用nextword了
	async setFinish(context) {		
		let reviewQueue = getReviewQueue()
		let reviewDone = getReviewDone() ? getReviewDone() : []
		console.log(reviewQueue)
		let word = reviewQueue.shift() //从开头删除一个元素
		
		//操作book_info中book列表里对应的单词
		let next_date = await setWordState(word._id, -(word.marker.score)) //将score取反传入，setWordState方法会根据score设置下次复习的日期，如果score = 0，该单词设置重新学习
		
		reviewDone.push({'word': word.word, 'next_date': next_date, 'score': word.marker.score})
		
		//判断是否完成该组复习
		if(reviewQueue.length === 0){
			//弹出提示框,提示完成了一组的复习(onSync设为1) 可点击继续复习或者回到首页（后续可做成单词评分表）
			context.commit(ON_SYNC,1) 
			
			// //尝试将数据同步到服务器（若失败，下次重试）
			// if(await upload().err_code === 0) {
			// 	context.commit(ON_SYNC,2) //2：上传成功
			// }else{
			// 	context.commit(ON_SYNC,3) //3：上传失败
			// }
		}

		
		//下一个单词
		let wordArr = [reviewQueue[0],reviewQueue[3],reviewQueue[7]]
		context.commit(SET_CURRENT_WORD, wordArr)
		
		//存入缓存
		saveToLocal('REVIEW_QUEUE',reviewQueue)
		saveToLocal('REVIEW_DONE',reviewDone)
		
		//提交给mutation
		context.commit(UPDATE_REVIEW_QUEUE,reviewQueue)
		context.commit(UPDATE_REVIEW_DONE,reviewDone)		
		console.log(reviewDone)
	},
	
	
	//继续 deduct：减去的分数，1or2
	async goOn(context, deduct) {
		let reviewQueue = getReviewQueue()
		
		
		let score = reviewQueue[0].marker.score 
		let round = reviewQueue[0].marker.round		
		
		reviewQueue[0].marker.score = score - deduct
		reviewQueue[0].marker.round = round + 1
		
		let next = score <= 4 || (round === 1 && deduct === 2) ? -1 :  -2
		reviewQueue[0].marker.step = next
		
		
		if(reviewQueue[0].marker.round > 5){
			//如果该回合数大于5，强制结束该单词的学习
			await setFinish()			
		}	
		
		//存入缓存
		saveToLocal('REVIEW_QUEUE',reviewQueue)
		//提交给mutation
		context.commit(UPDATE_REVIEW_QUEUE,reviewQueue)
		
	},
	
	
	//设置同步状态标记
	setSyncSign(context, sign){
		//删除done缓存 (暂时在这里删	)，之后这里可以跳转到 回顾刚刚学习的单词
		saveToLocal('DONE', [])
		context.commit(ON_SYNC, sign)
	}
	
	
}

	




// //取得分数最小的两个单词
// const selectMinScore = function(list) {
// 	let word_a = {marker:{score: Number.MAX_VALUE}}
// 	let word_b = {marker:{score: Number.MAX_VALUE}}
// 	let arr = list.reverse()

// 	arr.forEach((el) => { //将数组颠倒，避免当所有单词的分数相同时，取到同一个单词
// 		if(el.marker.score < word_a.marker.score){

// 			word_a = el			
// 			if(word_a.marker.score < word_b.marker.score){
// 				[word_a,word_b] = [word_b,word_a]
// 			}			
// 		}
// 	})	
// 	return [word_a,word_b]
// }