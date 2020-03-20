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
		config: {numbers: 20,auto_audio:false,is_kk:false,is_hold:false},//用户配置
		calendars: [],//每日学习记录
		books_list: [], //用户拥有的图书
		
		book_id: '',//用户选定的图书id		
		book_info: false,//用户选定的图书信息
				
		sys_lib: [], //系统书库信息
		
		page: 1, //0：答案页，1：选择页，2：遮挡页，3：音频页
		done: [], //存储当前组完成学习的单词
		queue: [], //正在学习的单词队列	
		currentWord: {marker:{},paraphrase:[]}, //当前单词
		errorWordA:{marker:{},paraphrase:[]},
		errorWordB:{marker:{},paraphrase:[]},
		
		lock: false
  },
  actions,
  mutations,
  getters  
})

export default store