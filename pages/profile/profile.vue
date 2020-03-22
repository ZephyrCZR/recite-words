<template>
	<view class="profile-content base-bg-image">
		<nav-bar></nav-bar>

		<view class="profile-main">
			<view class="profile-head">
				<avatar class="profile-avatar"></avatar>
				<view class="user_name">Zephyr</view>
			</view>

			<view class="profile-body">

				<view class="cu-form-group margin-top">
					<view class="title">自动发音</view>
					<switch @change="SwitchA" :class="switchA?'kk':'en'" ></switch>
				</view>
				<view class="cu-form-group ">
					<view class="title">拼写测试</view>
					<switch @change="SwitchA" :class="switchA?'kk':'en'" ></switch>
				</view>
				<view class="cu-form-group ">
					<view class="title">每组学习单词量</view>
					<text class="title">20个</text>
				</view>
				<view class="cu-form-group ">
					<view class="title">单词发音类型</view>
					<text class="title">英式</text>
				</view>
			

				<view class="profile-footer">
					<button class="cu-btn bg-gradual-green margin-tb-sm lg profile-logout">同步学习数据</button>
					
					<button class="cu-btn bg-gradual-orange margin-tb-sm lg profile-logout">退出登录</button>
				</view>
			</view>


		</view>

	</view>
</template>

<script>
	import NavBar from '../../components/navbar/NavBar.vue';
	import Avatar from '../../components/avatar/avatar.vue';
	import RadioModal from '../../components/radioModal/RadioModal.vue';
	
	export default {
		components: {
			NavBar,
			Avatar,
			RadioModal
		},
		data() {
			return {

			}
		},
		methods: {
			SwitchA(e) {
				this.switchA = e.detail.value
			},
		}
	}
</script>

<style>
	.profile-content {
		background-color: #007AFF;
		width: 100%;
		height: 100vh;
	}

	.profile-main {
		width: 100%;
		height: 70vh;
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 1);
	}

	.profile-head {
		margin-top: -100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.profile-avatar {
		display: block;
		height: 200rpx;
		width: 200rpx;
	}

	.user_name {
		padding-top: 10rpx;
		font-weight: bolder;
	}

	.profile-body {
		height: 96%;
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
	}


	.profile-footer {
		width: 100%;
		padding-top: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.profile-logout {

		height: 100rpx;
		width: 70%;
	}


</style>
