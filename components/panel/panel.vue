<template>
	<view id="panel" class="panel-bg-mask"  v-show="isShow">
		<view class="panel-control-block " @tap="onTap">
				<text class="panel-fold-bar"></text>
		</view>
		<view class="panel-content ">
			<slot></slot>
		</view>
	</view>
	
	

</template>
<!-- 拉动效果以后再做 -->
<!-- <script module="swipe" lang="wxs" src="./swipe.wxs"></script> -->
<script>	
	export default {
		name: 'panel',
		props: {
			isShow: {
				type:Boolean,
				default: true
			}
		},
		methods: {
			onTap() {
				this.$emit('closePanel')
			}
		},

	}
</script>

<style>	
	.panel-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}
	/* fold控制条 */
	.panel-fold-bar {
		display: inline-block;
		width: 80rpx;
		height: 16rpx;
		background-color: #808080;
		border-radius: 8rpx;
	}

	.panel-control-block {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 60rpx;
	}
	
	.panel-bg-mask {
		backdrop-filter: blur(100rpx);
		background-color: rgba(255, 255, 255, 0.4);
		width: 100%;
		height: 67%;
		position: absolute;
		z-index: 99;
		bottom: 0;
		left: 0;
		border-radius: 50rpx 50rpx 0 0;
		box-shadow: 10 100 100 100 #000000;
	}

</style>
