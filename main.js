import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 判断登陆状态，无登录则跳转到登录页
Vue.prototype.checkLogin = function(backpage, backtype){
	console.log("调用了checkLogin方法")
	var TOKEN = uni.getStorageSync('TOKEN')
	var SUID = uni.getStorageSync('SUID')
	var AVATAR = uni.getStorageSync('AVATAR')
	if(TOKEN == '' || SUID == '' || SFACE == ''){
		uni.redirectTo({
			url:'/pages/login/login/login'
		})
		return false
	}	
	return {
		avatar: AVATAR
	}	
}


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
