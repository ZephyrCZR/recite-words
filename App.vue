<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')

			// 判断登陆状态，无登录则跳转到登录页, 已登录跳转到首页
			if (!uni.getStorageSync('TOKEN')) {
				console.log("未登录")
				uni.redirectTo({
					url: '/pages/login/login/login'
				})
			}
		},
		onShow: function() {
			console.log('App Show')

			console.log(uni.getStorageInfoSync()) //打印Storage信息
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* @import url("./uni.scss"); */

	@import "colorui/main.css";
	@import "colorui/icon.css";

	@import url("/static/css/iconfont/iconfont.css");
	@import url("/static/css/base.css");
</style>
