<template>
	<view class="par-btn base-mask" :class="{'btn-active': onTouch}" @touchstart="tStart" @touchend="tEnd">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'ParBtn',
		data() {
			return {
				onTouch: false
			}
		},
		methods: {
			tStart() {
				this.onTouch = true
			},
			tEnd() {
				this.onTouch = false
			}
		}
	}
</script>

<style>
	.btn-active {
		background-color: rgba(255, 255, 255, 0.9);
		box-shadow: 0 0 20rpx 5rpx rgba(0, 0, 0, 0.3);
	}

	.par-btn {
		width: 100%;
		height: 140rpx;
		border-radius: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
