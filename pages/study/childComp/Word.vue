<template>
	<view class="word-content">
		<view class="word-main">
			<text class="word-main-ex">{{options.word}}</text>
		</view>

		<view class="word-pronounce" v-if="options.is_kk^isChange">
			<!-- 异或门 -->
			<text class="word-icon base-text-sub base-color-sub" @tap="tapSound">{{options.soundmark[0].soundtype}}</text>
			<text class="word-pronounce-ex base-text-sub base-color-sub" @tap="playAudio">/ {{options.soundmark[0].symbol}} /</text>

		</view>

		<view class="word-pronounce" v-else>
			<text class="word-icon base-text-sub base-color-sub" @tap="tapSound">{{options.soundmark[1].soundtype}}</text>
			<text class="word-pronounce-ex base-text-sub base-color-sub" @tap="playAudio">[ {{options.soundmark[1].symbol}} ]</text>

		</view>

		<view class="word-main-sign">
			<view class="sign-bar" v-for="index in options.state" :key="index"></view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'Word',
		props: {
			options: {
				type: Object,
				default() {
					return {
						word: '',
						soundmark: [],
						state: 0,
						is_kk: false,
						auto_audio: false
					}
				}
			}
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
					this.innerAudioContext.src = this.options.soundmark[0].audio;
				} else {
					this.innerAudioContext.src = this.options.soundmark[1].audio;
				}
				this.innerAudioContext.play(() => {})
			}
		},
		mounted() {//加载音频，若需要自动播放，则自动播放
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.autoplay = this.options.auto_audio;
			if (this.options.is_kk) {
				this.innerAudioContext.src = this.options.soundmark[0].audio;
			} else {
				this.innerAudioContext.src = this.options.soundmark[1].audio;
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
