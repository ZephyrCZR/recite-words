<template>
	<view id="register">
		<!-- 头部LOGO -->
		<logo></logo>
		<!-- 表单 -->
		<view class="main">
			<wInput v-model="phoneData" type="text" maxlength="11" placeholder="手机号"></wInput>
			<wInput v-model="passData" type="password" maxlength="11" placeholder="登录密码" isShowPass></wInput>
			<wInput v-model="verCode" type="number" maxlength="4" placeholder="验证码" isShowCode ref="runCode" @setCode="getVerCode()"></wInput>

			<wButton text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton>
		</view>

		<!-- 底部信息 -->
		<view class="footer">
			<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'">同意</text>
			<!-- 协议地址 -->
			<navigator url="" open-type="navigate">《协议》</navigator>
		</view>
	</view>
</template>

<script>
	import Logo from '../childComp/Logo.vue';
	import wInput from '../../../components/watch-login/watch-input.vue';
	import wButton from '../../../components/watch-login/watch-button.vue';
	
	export default {
		components: {
			Logo,
			wInput,
			wButton,

		},
		data() {
			return {
				phoneData:'', // 用户/电话
				passData:'', //密码
				verCode:"", //验证码
				showAgree:true, //协议是否选择
				isRotate: false, //是否加载旋转
			}
		},
		mounted() {
			_this= this;
		},
		methods: {
			isShowAgree(){
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			getVerCode(){
				//获取验证码
				if (_this.phoneData.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				console.log("获取验证码")
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: '模拟倒计时触发'
				});
				
				setTimeout(function(){
					_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '模拟倒计时终止'
					});
				},3000)
			},
		    startReg() {
				//注册
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '请先同意《协议》'
				    });
				    return false;
				}
				if (this.phoneData.length !=11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
		        if (this.passData.length < 6) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return false;
		        }
				if (this.verCode.length != 4) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '验证码不正确'
				    });
				    return false;
				}
				console.log("注册成功")
				_this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false
				},3000)
		    }
		}
	}
</script>

<style>
	@import url("../../../components/watch-login/css/icon.css");
	
	#register {
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
