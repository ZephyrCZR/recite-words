import {
	UPDATE_USER_INFO,
	UPDATE_BOOK_INFO,
	UPDATE_Lib_INFO,
	CLOCK_IN,
	UPDATE_COIN,
} from "./mutation-types"


export default {
	//更新用户数据
	[UPDATE_USER_INFO](state, payload) {
		state.user.nickname = payload.nickname
		state.user.coin = payload.coin
		state.user.avatar = payload.avatar
		state.config = payload.config
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
}
