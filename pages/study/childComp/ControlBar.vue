<template>
	<view class="control-content">
		<view class="con-btn-type" v-if="btnType === 0">
			<view class="con-btn-content" :class="{'con-btn-active': onTouch === 1}" @tap="tapYes" @touchstart="touchStar"
			 @touchend="touchEnd" :data-id=1>
				<text class="word-text base-text-sub base-color-primary">看答案</text>
				<view class="word-point"></view>
			</view>
		</view>
		<view class="con-btn-type" v-else-if="btnType === 1">
			<view class="con-btn-content" :class="{'con-btn-active': onTouch === 1}" @tap="tapYes" @touchstart="touchStar"
			 @touchend="touchEnd" :data-id=1>
				<text class="word-text base-text-sub base-color-primary">认识</text>
				<view class="word-point"></view>
			</view>
			<view class="con-btn-content" :class="{'con-btn-active': onTouch === 0}" @tap="tapNo" @touchstart="touchStar"
			 @touchend="touchEnd" :data-id=0>
				<text class="word-text base-text-sub base-color-primary">不认识</text>
				<view class="word-point"></view>
			</view>
		</view>
		<view class="con-btn-type" v-else-if="btnType === 2">
			<view class="con-btn-content" :class="{'con-btn-active': onTouch === 1}" @tap="tapYes" @touchstart="touchStar"
			 @touchend="touchEnd" :data-id=1>
				<text class="word-text base-text-sub base-color-primary">下一词</text>
				<view class="word-point"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ControlBar',
		props: {
			btnType: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data() {
			return {
				onTouch: -1
			}
		},
		methods: {
			tapYes() {
				this.$emit('tapYes')
			},
			tapNo() {
				this.$emit('tapNo')
			},
			touchStar(e) {
				this.onTouch = e.currentTarget.dataset.id
			},
			touchEnd() {
				this.onTouch = -1
			}
		}

	}
</script>

<style>
	.con-btn-active {
		background-color: rgba(30, 30, 30, 0.3);
	}

	.word-point {
		width: 8rpx;
		height: 8rpx;
		background-color: #fd5e58;
		border-radius: 50%;
		margin-top: 10rpx;
	}

	.con-btn-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 30rpx;
		border-radius: 20rpx;
	}

	.con-btn-type {
		margin-bottom: 20rpx;
		width: 100%;
		height: 140rpx;
		display: flex;
	}

	.control-content {
		width: 100%;
		height: 140rpx;
		box-sizing: border-box;
		margin-bottom: 118rpx;
	}
</style>
