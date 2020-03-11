<template>
	<view id="login">
		<!-- 头部LOGO -->
		<logo></logo>
		<!-- 表单 -->
		<view class="main">
			<wInput v-model="phone" type="text" maxlength="11" placeholder="用户名/手机号码"></wInput>
			<wInput v-model="password" type="password" maxlength="11" placeholder="密码"></wInput>

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
	import wInput from 'components/watch-login/watch-input.vue';
	import wButton from 'components/watch-login/watch-button.vue';

	import {expTest} from 'common/utils.js'
	import {login} from 'network/user.js'

	export default {
		data() {
			return {
				phone: '', //用户/电话
				password: '', //密码
				isRotate: false, //是否加载旋转
			};
		},
		components: {
			Logo,
			wInput,
			wButton,
		},
		mounted() {
			_this = this;
			//this.isLogin();
		},
		methods: {

			startLogin() {
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}

				if (!expTest('phone', this.phone)) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请填入正确的手机号码'
					});
					return;
				}
				if (!this.password) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入密码'
					});
					return;
				}

				this.isRotate = true

				login({
					phone: this.phone,
					password: this.password
				}).then((success) => {
					console.log('请求成功')
					console.log(success)
					if (success.data.err_code !== 0) {
						this.isRotate = false
						uni.hideLoading();
						uni.showToast({
							icon: 'error',
							position: 'center',
							title: success.data.message
						});
						return false
					}
					uni.setStorageSync('UserInfo', success.data.userInfo)
					uni.setStorageSync('TOKEN', success.data.token)
					
					uni.showToast({
						duration: 2000,
						icon: 'success',
						position: 'center',
						title: "登录成功",
						mask: true,
						complete: () => {
						this.checkToken()
						}
					});

				}, (error) => {					
					this.isRotate = false
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: "网络错误"
					});
				})
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
