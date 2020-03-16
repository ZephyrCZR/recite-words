<template>
	<view class="my-popup">
		<view class="base-mask my-tips">
			<view class="my-text">
				<text>添加词书</text>
				<text>开始背单词</text>
			</view>
			<view @tap="goSelect" 
			class="my-popup-btn" :class="{'my-touch':onTouch}" 
			@touchstart="startTouch"  @touchend="endTouch">GO!</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Popup',
		data(){
			return {
				onTouch: false
			}
		},
		methods: {
			startTouch() {
				this.onTouch = true
			},
			endTouch() {
				this.onTouch = false
			},
			goSelect() {
				uni.redirectTo({
					url: '/pages/books/books'
				})
			}
		}
	}
</script>

<style>
	.my-popup {
		position: absolute;
		z-index: 999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.my-tips {
		height: 300rpx;
		width: 350rpx;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}

	.my-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 2;
	}
	
	.my-popup-btn {
		background-color: rgba(167, 134, 107, 0.6);
		width: 100%;
		flex: 1;
		border-radius: 0 0 30rpx 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.my-touch {
		color: #a88151;
		background-color: rgba(167, 134, 107, 0.2);
	}
</style>
