<template>
	<view class="nav-content">
		<view class="nav-left">
			<text class="cuIcon-back" @tap="onTap"></text>
		</view>
		<view class="nav-center">
			<slot></slot>
		</view>
		<view class="nav-right">
			<text> </text>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'NavBar',
		data() {
			return {

			}
		},
		methods: {
			onTap() {
				uni.redirectTo({
					url: '../../pages/index/index'
				})
			}
		}
	}
</script>

<style>
	.nav-center {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nav-left,
	.nav-right {
		height: 100%;
		width: 200rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
	}

	.nav-content {
		width: 100%;
		height: 118rpx;
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
