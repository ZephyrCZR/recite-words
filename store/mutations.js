import {
	LOCK,
	UPDATE_USER_INFO,
	UPDATE_BOOK_INFO,
	UPDATE_Lib_INFO,
	CLOCK_IN,
	UPDATE_COIN,
	UPDATE_QUEUE,
	SET_CURRENT_WORD,
	SET_CURRENT_DONE,
	SET_CURRENT_PAGE,
	UPDATE_REVIEW_QUEUE,
	UPDATE_REVIEW_DONE,
	ON_SYNC
} from "./mutation-types"


export default {
	//更新用户数据
	[UPDATE_USER_INFO](state, payload) {
		state.user.nickname = payload.nickname
		state.user.coin = payload.coin
		state.user.avatar = payload.avatar
		state.config.numbers= payload.config.numbers
		state.config.auto_audio= payload.config.auto_audio
		state.config.is_kk= payload.config.is_kk
		state.config.is_hold= payload.config.is_hold
		state.calendars = payload.calendar
		state.books_list = payload.book_list
		state.book_id = payload.book_id		
	},
	
	//更新词书信息
	[UPDATE_BOOK_INFO](state, payload) {
		state.book_info = payload //用户选定的图书信息
	},
	
	//更新书库信息
	[UPDATE_Lib_INFO](state, payload) {
		state.sys_lib = payload //系统书库信息
	},
		
	//签到
	[CLOCK_IN](state, payload) {
		state.calendars = payload.calendar
		state.user.coin = payload.coin
	},
	
	//更新M币数量
	[UPDATE_COIN](state, payload) {
		state.user.coin = payload
	},
	
	//更新单词队列
	[UPDATE_QUEUE](state, payload) {
		state.queue = payload
	},
	
	//设置当前单词
	[SET_CURRENT_WORD](state, payload){
		state.currentWord = payload[0]
		state.errorWordA = payload[1]
		state.errorWordB = payload[2]
 	},
	
	//设置当前done数组
	[SET_CURRENT_DONE](state, payload){
		state.done = payload
	},
	
	//设置当前显示的页面
	[SET_CURRENT_PAGE](state, payload){
		state.page = null
		state.page = payload
	},
	
	//更新复习队列
	[UPDATE_REVIEW_QUEUE](state, payload){
		state.reviewQueue = payload
	},
	
	//更新复习完成的队列
	[UPDATE_REVIEW_DONE](state, payload){
		state.reviewDone = payload
	},
	
	//锁
	[LOCK](state, payload){
		state.lock = payload
	},
	
	//正在同步数据
	[ON_SYNC](state, payload){
		state.onSync = payload
	}
	
}
