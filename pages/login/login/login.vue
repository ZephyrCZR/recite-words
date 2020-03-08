<template>
	<view id="login">
		<!-- 头部LOGO -->
		<logo></logo>
		<!-- 表单 -->
		<view class="main">
			<wInput v-model="phoneData" type="text" maxlength="11" placeholder="用户名/手机号码"></wInput>
			<wInput v-model="passData" type="password" maxlength="11" placeholder="密码"></wInput>

			<wButton text="登 录" :rotate="isRotate" @click.native="startLogin()"></wButton>
		</view>
 
		<!-- 底部信息 -->
		<view class="footer">
			<navigator url="forget" open-type="navigate">找回密码</navigator>
			<text>|</text>
			<navigator url="../register/register" open-type="navigate">注册账号</navigator>
		</view>
	</view>
</template>

<script>
	import Logo from '../childComp/Logo.vue';
	import wInput from '../../../components/watch-login/watch-input.vue';
	import wButton from '../../../components/watch-login/watch-button.vue';
	export default {
		data() {
			return {
				phoneData:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否加载旋转
			};
		},
		components:{
			Logo,
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
			//this.isLogin();
		},
		methods: {
			isLogin(){
				//判断缓存中是否登录过，直接登录
				// try {
				// 	const value = uni.getStorageSync('setUserData');
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：",value);
				// 		_this.$store.dispatch("setUserData",value); //存入状态
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},
		    startLogin(){
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能为空'
				    });
				    return;
				}
		        if (this.passData.length < 5) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return;
		        }
				
				console.log("登录成功")
				
				_this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false
				},3000)
				// uni.showLoading({
				// 	title: '登录中'
				// });
				// getLogin()
				// .then(res => {
				// 	//console.log(res)
				// 	//简单验证下登录（不安全）
				// 	if(_this.phoneData==res.data.username && _this.passData==res.data.password){
				// 		let userdata={
				// 			"username":res.data.username,
				// 			"nickname":res.data.nickname,
				// 			"accesstoken":res.data.accesstoken,
				// 		} //保存用户信息和accesstoken
				// 		_this.$store.dispatch("setUserData",userdata); //存入状态
				// 		try {
				// 			uni.setStorageSync('setUserData', userdata); //存入缓存
				// 		} catch (e) {
				// 			// error
				// 		}
				// 		uni.showToast({
				// 			icon: 'success',
				// 			position: 'bottom',
				// 			title: '登录成功'
				// 		});
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}else{
				// 		_this.passData=""
				// 		uni.showToast({
				// 			icon: 'error',
				// 			position: 'bottom',
				// 			title: '账号或密码错误，账号admin密码admin'
				// 		});
				// 	}
				// 	uni.hideLoading();
				// }).catch(err => {
				// 	uni.hideLoading();
				// })
				
		    }			
		}
	}
</script>

<style>
	#login {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.main {
		margin-top: 84rpx;
		height: 500rpx;
		width: 540rpx;
		display: flex;
		flex-direction: column;
		align-items: space-between;
	}

	/* 底部 */
	.footer {		
		position: absolute;
		bottom: 66rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}
	
	.footer text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
