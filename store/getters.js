import {
	dateFormat
} from '../common/utils.js'

export default {
	//index
	//头像
	avatar(state) {
		return state.user.avatar
	},
	
	//词书的单词状态统计数量
	bookState(state) {
		let book_state = {learn: 0, review: 0}
		//获取单词列表
		console.log(!state.book_info)
		if(!state.book_info){ 
			return book_state
		}
		let wordsList = state.book_info.book
		
		let learn = 0 //未背诵的				
		let review = 0 //需要复习的	
		const today = dateFormat(Date.now())
		for (let i = 0; i < wordsList.length; i++) {
			const word = wordsList[i]
			if (word.state === 0) {
				learn++
				continue;
			}
			if (word.state === 1 && word.next_date <= today) {
				review++
				continue;
			}
		}
		book_state.learn = learn
		book_state.review = review
		return book_state
	},
	
	//是否已签到
	isClock(state) {
		let is_clock = true
		let calendar = state.calendars 
		let length = calendar ? calendar.length : 0
		//获取今天日期 yyyy-mm-dd
		const today = dateFormat(Date.now() - 4 * 60 * 60 * 1000) //慢四个小时
		//如果最后一张记录表的日期是今天的，设置isClock状态
		if (length > 0 && state.calendars[length - 1].date === today) {
			is_clock = state.calendars[length - 1].clock
		}
		return is_clock
	},
	
	//book
	sysLib(state) {
		let bookType =
		 [{type: '我的',list: []},
			{type: '大学',list: []},
			{type: '出国',list: []},
			{type: '高中',list: []},
			{type: '初中',list: []},
			{type: '小学',list: []},
			{type: '实用',list: []},
			{type: '其它',list: []}]
		//遍历请求结果，过滤用户已有的词书并分类数据
		state.sys_lib.forEach((book) => {
			if (!checkUserBook(state.books_list, book.book_name)) { //判断用户是否拥有该词书
				//进行分类
				bookType.forEach((category) => {
					if (book.book_type === category.type) {
						category.list.push(book)
					}
				})
			}
		})		
		//获取用户词书信息				
		bookType[0].list = state.books_list
		return bookType		
	}	
}


//判断该词书是否已经存在用户词书列表里（后端也有判断的）		
const checkUserBook = function(List, book_name) {
	let flag = false
	if (List) {
		List.forEach((el) => {
			if (el.book_name === book_name) {
				flag = true
			}
		})
	}
	return flag
}