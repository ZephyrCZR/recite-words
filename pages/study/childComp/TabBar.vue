<template>
	<view class="my-tab-bar ">
		<view class="back" @tap="back"><span class="iconfont icon-return tab-icon base-color-sub"></span></view>	
		<view class="books" ><span class="iconfont icon-brush tab-icon base-color-sub"></span></view>	
		<view class="settings"><span class="iconfont icon-textile-products tab-icon base-color-sub"></span></view>					
		<view class="theme" ><span class="iconfont icon-ashbin tab-icon base-color-sub"></span></view>
	</view>
</template>

<script>
	export default {
		name: 'TabBar',
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style>
.my-tab-bar {
		position: absolute;
		height: 98rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
		bottom: 10rpx;
		left: 0;
		/* background-color: #CCE6FF ; */
	}
	
	.tab-icon {
		line-height: 98rpx;
		font-size: 28px;
	}
</style>
