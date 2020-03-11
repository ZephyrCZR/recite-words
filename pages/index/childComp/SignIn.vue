<template>
	<view class="sign_in mask"><span class="iconfont icon-calendar sign_icon"></span>
			<span>
				<span class="text">+10</span>
				<span class="text iconfont icon-collection_fill">
			</span>
			</span>
			<span class="text">打卡</span>
	</view>
</template>

<script>
	export default {
		name: 'SignIn',
		data() {
			return {
				
			}
		},
		methods: {

		},
		created() {
			// 获取日期

			
		}
	}
</script>

<style>
.sign_in {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 300rpx;
		width: 300rpx;		
		border-radius: 20%;
	}
	.sign_icon {
		line-height: 70rpx;
		font-size: 40px;
	}
</style>
