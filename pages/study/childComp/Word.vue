<template>
	<view class="word-content">
		<view class="word-main" v-if="word.page === 3">
			<text class="word-main-icon base-color-primary icon-sound-filling iconfont" @tap="playAudio"></text>
		</view>
		<view class="word-main" v-else>
			<text class="word-main-ex">{{word.word}}</text>
		</view>

		<view class="word-pronounce" v-if="word.is_kk^isChange">
			<!-- 异或门 -->
			<text class="word-icon base-text-sub base-color-sub" @tap="tapSound">{{word.soundmark[0].soundtype}}</text>
			<text class="word-pronounce-ex base-text-sub base-color-sub" @tap="playAudio">/ {{word.soundmark[0].symbol}} /</text>

		</view>

		<view class="word-pronounce" v-else>
			<text class="word-icon base-text-sub base-color-sub" @tap="tapSound">{{word.soundmark[1].soundtype}}</text>
			<text class="word-pronounce-ex base-text-sub base-color-sub" @tap="playAudio">[ {{word.soundmark[1].symbol}} ]</text>

		</view>

		<view class="word-main-sign">
			<view class="sign-bar" v-for="index in word.step" :key="index"></view>
		</view>

	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	
	export default {
		name: 'Word',
		computed:{
			...mapGetters(['word'])
			
			
		},
		data() {
			return {
				isChange: false,
				innerAudioContext: null
			}
		},
		methods: {
			tapSound() {
				this.isChange = !this.isChange
			},
			playAudio() {//播放音频
				if (!this.isChange) {
					this.innerAudioContext.src = this.word.soundmark[0].audio;
				} else {
					this.innerAudioContext.src = this.word.soundmark[1].audio;
				}
				this.innerAudioContext.play(() => {})
			}
		},
		created() {
			console.log(this.$store.getters.word)
			
		},
		mounted() {//加载音频，若需要自动播放，则自动播放
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.autoplay = this.word.auto_audio;
			if (this.word.is_kk) {
				this.innerAudioContext.src = this.word.soundmark[0].audio;
			} else {
				this.innerAudioContext.src = this.word.soundmark[1].audio;
			}
		}
	}
</script>

<style>
	.sign-bar {
		height: 4rpx;
		width: 75rpx;
		background-color: #FFFFFF;
		box-shadow: 0 0 20rpx 5rpx #FFFFFF;
	}

	.word-main-sign {
		background-color: rgba(120, 120, 120, 0.5);
		height: 4rpx;
		margin-top: 30rpx;
		border-radius: 2rpx;
		width: 300rpx;
		display: flex;
	}

	.word-icon {
		padding-right: 20rpx;
	}

	.word-pronounce {
		padding-top: 20rpx;
	}

	.word-main-ex {
		font-size: 90rpx;
		font-weight: 600;
	}

	.word-main-icon {
		font-size: 180rpx;
	}

	.word-main {
		display: flex;
		align-items: center;
	}

	.word-content {
		width: 100%;
		height: 100%;
		padding-top: 80rpx;
		/* background-color: #007AFF; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
