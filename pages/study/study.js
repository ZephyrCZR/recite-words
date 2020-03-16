// import {dateFormat} from '../../common/utils.js'
// //必须在线
// //1.判断必要条件：用户信息表，词书信息表
// const UserInfo = uni.getStorageSync('UserInfo')
// let BookInfo = uni.getStorageSync('BookInfo')
// if (!UserInfo) {
// 	//如果没有用户信息表，则发送请求重新获取用户信息表
// 	console.log("没有用户信息表")
// }
// if (!BookInfo) {
// 	//如果没有词书信息表，则发送请求重新获取词书信息表
// 	console.log("没有词书信息表")
// }

// //2.获取用户参数
// const config = UserInfo.config

// //3.获取今日的记录表(凌晨4点之前都算作前一天)
// let record = UserInfo.calendar[UserInfo.calendar.length - 1] 
// if(!record.date === dateFormat(Date.now() - 4*60*1000)){
// 	//如果最后一张记录表不是今天的，则发送网络请求获取新的记录表
// }

// //4.获取管理器信息，用于临时保存随机选项信息，并记录当前组完成的单词数
// let Controller = uni.getStorageSync('Controller')
// if (!Controller) {
// 	const sample = []
// 	const counter = 0
// 	Controller = {
// 		sample,
// 		counter
// 	}
// 	uni.setStorageSync('Controller', {
// 		sample,
// 		counter
// 	})
// }

// //5.获取词书信息，分拣数据
// 	classify() {
// 				//获取本地词书信息
// 				const book = uni.getStorageSync('BOOKINFO').book
// 				if(!book){
// 					return
// 				}
// 				// 获取今天日期 yyyy-mm-dd
// 				const today = dateFormat(Date.now())

// 				//识别分类单词的状态
// 				let learn = [] //未背诵的
// 				let doing = [] //背过但是未达到掌握的，等待复习
// 				let review = [] //需要复习的
// 				let done = [] //已掌握的
				
// 				for (let i = 0; i < book.length; i++) {
// 					const word = book[i]
// 					if (word.state === 0) {
// 						learn.push(word)
// 						continue;
// 					}
// 					if (word.state === 1) {
// 						doing.push(word)
// 						if (word.next_date <= today) { //如果达到复习的日期
// 							review.push(word)
// 						}
// 						continue;
// 					}
// 					if (word.state === 2) {
// 						done.push(word)
// 						continue
// 					}
// 				}
// 				// console.log(learn)
// 				// console.log(doing)
// 				// console.log(review)
// 				// console.log(done)
// 				this.book_state.learn = learn.length
// 				this.book_state.review = review.length
// 			},

// //5.获取单词队列
// let queue = uni.getStorageSync('Queue')
// if(!queue){
// 	//如果单词队列不存在，发送网络请求获取10个单词的详细信息
// }


// //获取记录表

// //检查临时记录
// //检查用户词书表


// //设置topbar组件参数
// function setTopbar(that) {
// 	that.topbar = {
// 		done: Controller.counter,
// 		count: config.count
// 	}
// }

// //设置word组件参数
// function setWord(that) {

// }

// //设置paraphrase组件参数
// function setParaphrase(that) {

// }
