<template>
	<view class="content">
		<view class="avatar">
			<image src="../../static/imgs/g.png" class="avatar_img" ></image>
		</view>
		

			<view v-if="!isSign" class="sign_in mask"><span class="iconfont icon-calendar sign_icon"></span>
<!-- 		<span>
			<span class="text">+10</span>
			<span class="text iconfont icon-collection_fill">
		</span> -->
		</span>
		<span class="text">点击签到</span>
		</view>
		
		<view class="bg_dec">
			<span class="bg_word">beach</span>
			<span class="bg_par">n. 海滩；湖滨</span>
		</view>

		
			
			
		<view class="buttons">
			<view class="button mask"><span class="text">剩余单词</span><span class="text">3690</span></view>
			<view class="button mask"><span class="text">待复习</span></span><span class="text">18</span></view>
		</view>			
		
		
		<view class="nav_bar mask">
			<view class="search"><span class="iconfont icon-search nav_icon"></span></view>	
			<view class="books"><span class="iconfont icon-shengyijing nav_icon"></span></view>	
			<view class="settings"><span class="iconfont icon-flag nav_icon"></span></view>					
			<view class="theme"><span class="iconfont icon-integral nav_icon"></span></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				isSign: true
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	

	.bg_dec {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 28%;
		width: 100vw;
		/* background-color: #007AFF; */
		align-items: center;
		
	}
	.bg_dec>.bg_word {
		/* background-color: #4CD964; */
		font-size: 88rpx;
		padding-bottom: 30rpx;
		line-height: 88rpx;
	}
	.bg_dec>.bg_par {
		/* background-color: #007AFF; */
		font-size: 34rpx;
		line-height: 40rpx;
	}
	.text {
		font-size: 32rpx;
		line-height: 44rpx;
		/* background-color: #007AFF; */
		}
	
	.nav_bar {
		/* background-color:#3F536E; */
		position: absolute;
		height: 96rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
		bottom: 0;
		
	}
	
	.nav_icon {
		line-height: 96rpx;
		font-size: 24px;
	}
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-image: url(http://attach.bbs.miui.com/forum/201406/28/011404x55gqgsuaufp95sq.jpg);
		background-size:cover;
		background-repeat: no-repeat;		
	}
	
	
	.mask {
		backdrop-filter: blur(8rpx);
		background-color: rgba(255,255,255,0.8);
	}
	
	.sign_in {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 300rpx;
		width: 300rpx;		
		border-radius: 30%;
		position: absolute;
		top: 28%;
		left: 50%;
		transform: translateX(-150rpx);
	}
	.sign_icon {
		line-height: 70rpx;
		font-size: 40px;
	}
	
	.avatar {
		height: 100rpx;
		width: 100rpx;
		/* background-color: #007AFF; */
		position: absolute;
		top: 60rpx;
		left: 30rpx;
		border-radius: 50%;	
		overflow: hidden;
	}

  .avatar_img {
		height: 100%;
		width: 100%;
	}
	
	.buttons {
		/* background-color: #007AFF; */
		position: absolute;
		top: 70%;
		display: flex;		
	  justify-content: space-between;
		height: 120rpx;
		width: 100%;
	}
	
	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		/* background-color:#F0AD4E ; */
		width: 260rpx;
		height: 100%;
		margin: 0 30rpx;
		flex-direction:column;
		border-radius: 18rpx;

	}
	


	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		/* color: #8f8f94; */
	}
</style>
