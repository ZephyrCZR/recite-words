<template>
	<view class="tab_bar mask">
		<view class="search"><span class="iconfont icon-search tab_icon"></span></view>	
		<view class="books"><span class="iconfont icon-shengyijing tab_icon"></span></view>	
		<view class="settings"><span class="iconfont icon-flag tab_icon"></span></view>					
		<view class="theme"><span class="iconfont icon-integral tab_icon"></span></view>
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
			
		}
	}
</script>

<style>
.tab_bar {
		/* background-color:#3F536E; */
		position: absolute;
		height: 96rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
		bottom: 0;
		left: 0;
	}
	
	.tab_icon {
		line-height: 96rpx;
		font-size: 24px;
	}
</style>
