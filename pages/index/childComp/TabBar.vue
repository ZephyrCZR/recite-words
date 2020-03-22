<template>
	<view class="my-tab-bar base-mask">
		<view class="search" @tap="toSea"><span class="iconfont icon-search tab-icon"></span></view>	
		<view class="books" @tap="toBoo"><span class="iconfont icon-shengyijing tab-icon"></span></view>	
		<view class="settings" @tap="toSet"><span class="iconfont icon-flag tab-icon"></span></view>					
		<view class="theme" @tap="toThe"><span class="iconfont icon-integral tab-icon"></span></view>
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
			toSea() {
				this.$emit("toSea")
			},
			toBoo() {
				uni.navigateTo({
					url:'/pages/books/books'
				})
			},
			toSet() {
				this.$emit("toSet")
			},
			toThe() {
				this.$emit("toThe")
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
		padding: 5rpx 0;
		bottom: 0;
		left: 0;
	}
	
	.tab-icon {
		line-height: 98rpx;
		font-size: 28px;
	}
</style>
