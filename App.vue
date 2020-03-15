<script>


	export default {
		onLaunch: function() {
				//登录状态
			this.checkLogin()
			console.log('App Launch')

		},
		onShow: function() {

			console.log(uni.getStorageInfoSync())
			console.log('App Show')
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
