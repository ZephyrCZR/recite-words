import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

	import {getUserInfo} from 'network/logAndReg.js'

// 判断登陆状态，无登录则跳转到登录页, 已登录跳转到首页
Vue.prototype.checkLogin = function(){
	console.log("调用了checkLogin方法")
	const TOKEN = uni.getStorageSync('TOKEN')
	const UserInfo = uni.getStorageSync('UserInfo')

	if(TOKEN&&!UserInfo){ //如果token存在但是用户信息不存在
		console.log("用户信息丢失，尝试重新获取")
		getUserInfo()		
	}
		
	if(TOKEN == ''){
		console.log("未登录")
		uni.redirectTo({
			url:'/pages/login/login/login'
		}) 
		return false
	}else{
		return true
	}	
}

App.mpType = 'app'

const app = new Vue({
		// store,
    ...App
})
app.$mount()
