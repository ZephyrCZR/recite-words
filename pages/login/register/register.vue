<template>
	<view class="register">
		<!-- 头部LOGO -->
		<logo></logo>
		<!-- 表单 -->
		<view class="main">
			<wInput v-model="phone" type="text" maxlength="11" placeholder="手机号"></wInput>
			<wInput v-model="password" type="password" maxlength="15" placeholder="登录密码" isShowPass></wInput>
			<wInput v-model="code" type="number" maxlength="4" placeholder="验证码" isShowCode ref="runCode" @setCode="getVerCode()"></wInput>

			<wButton text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton>
		</view>

		<!-- 底部信息 -->
		<view class="footer">
			<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'">同意</text>
			<!-- 协议地址 -->
			<navigator url="" open-type="navigate">《用户协议》</navigator>
		</view>
	</view>
</template>

<script>
	import Logo from '../childComp/Logo.vue';
	import wInput from 'components/watch-login/watch-input.vue';
	import wButton from 'components/watch-login/watch-button.vue';
	
	import {expTest} from 'common/utils.js'
	import {register,getMessage} from 'network/logAndReg.js'

	export default {
		components: {
			Logo,
			wInput,
			wButton
		},
		data() {
			return {
				phone: '', // 用户/电话
				password: '', //密码
				code: "", //验证码
				showAgree: true, //协议是否选择
				isRotate: false, //是否加载旋转
			}
		},
	
		methods: {
			isShowAgree() {
				//是否选择协议
				this.showAgree = !this.showAgree;
			},

			getVerCode() {
				//获取验证码
				if (!expTest('phone',this.phone)) {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '手机号码不正确'
					});
					return false;
				}

				getMessage({
					phone: this.phone
				}).then((res) => {
					console.log(res)
					if (res.data.err_code == 0) {
						this.$refs.runCode.$emit('runCode'); //触发倒计时（请求成功验证码后调用）
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '验证码已发送，请注意查收'
						});
						//保存token
						if(res.data.temptoken){
							uni.setStorageSync('TempToken', res.data.temptoken)
						}else{
							uni.showToast({
								icon: 'none',
								position: 'center',
								title: '出错啦！请稍后重试'
							});
						}						
					} else {
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: res.data.message
						});
					}

				}, (err) => {
					console.log(err)
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '出错啦！请重试'
					});
				})
			},
			
	/**
	 * 新用户注册
	 */
			startReg() {
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree === false) {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '请先同意《用户协议》'
					});
					return false;
				}
				if (!expTest('phone',this.phone)) {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '手机号码不正确'
					});
					return false;
				}
				if (!expTest('password',this.password)) {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '密码只能以字母开头，长度在6~15之间，且只包含字母、数字和下划线'
					});
					return false;
				}
				
				if (this.code.length !== 4) {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '请输入短信验证码'
					});
					return false;
				}

				this.isRotate = true

				const payload = {
					phone: this.phone,
					password: this.password,
					code: this.code
				}

				register(payload).then((success) => {
					console.log(success)
					
					
					if(success.data.err_code !== 0){
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: success.data.message
						});
						this.isRotate = false
						return false
					}					
					if(!success.data.token){
						// 获取不到用户信息,让用户重新登录
						uni.redirectTo({
							url:'/pages/login/login/login'
						})
					}
					//注册成功：
				
					uni.setStorageSync('TOKEN', success.data.token)
				
					uni.showToast({
						icon: 'success',
						position: 'center',
						title: "注册成功！",
						mask: true,
						
						complete: () => {
							uni.redirectTo({
								url: '/pages/index/index'
							})
						}
					});

				}, (error) => {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: error
					});
					this.isRotate = false
				})
			}
		}
	}
</script>

<style scoped>
	.register {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.main {
		margin-top: 72rpx;
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
