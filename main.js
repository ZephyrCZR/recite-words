import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 判断登陆状态，无登录则跳转到登录页, 已登录跳转到首页
Vue.prototype.checkToken = function(){
	console.log("调用了checkLogin方法")
	const TOKEN = uni.getStorageSync('TOKEN')
	const UserInfo = uni.getStorageSync('UserInfo')
	if(TOKEN !== ''){
		uni.redirectTo({
			url:'/pages/login/login/login'
		})
		return false
	}	
	uni.redirectTo({
		url:'/pages/index/index'
	})
}


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
