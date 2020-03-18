import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
		user: { //用户基本信息
			nickname: 'MEOW用户',
			coin: 0,
			avatar: ''			
		},
		config: {},//用户配置
		calendars: [],//每日学习记录
		books_list: [], //用户拥有的图书
		
		book_id: '',//用户选定的图书id		
		book_info: false,//用户选定的图书信息
				
		sys_lib: [], //系统书库信息
  },
  actions,
  mutations,
  getters  
})

export default store