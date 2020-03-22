<template>
	<view class="control-content">
		<view class="con-btn-type" v-show="btnType.page? (btnType.step === 0 || btnType.step === 2 || btnType.step === -2) : false">
			<view class="con-btn-content" :class="{'con-btn-active': onTouch === 1}" 
			:data-id=1 @tap="tapNo" @touchstart="touchStar" @touchend="touchEnd">
				<text class="word-text base-text-sub base-color-primary">看答案</text>
				<view class="word-point"></view>
			</view>
		</view>
		<view class="con-btn-type" v-show="btnType.page? (btnType.step === 1 || btnType.step === 3 || btnType.step === -1) : false">
			<view class="con-btn-content" :class="{'con-btn-active': onTouch === 1}"
			:data-id=1 @tap="tapYes" @touchstart="touchStar" @touchend="touchEnd">
				<text class="word-text base-text-sub base-color-primary">认识</text>
				<view class="word-point"></view>
			</view>
			
			<view class="con-btn-content" v-show="btnType.step === -1" :class="{'con-btn-active': onTouch === 2}"
			:data-id=2 @tap="tapNoClear" @touchstart="touchStar" @touchend="touchEnd">
				<text class="word-text base-text-sub base-color-primary">模糊</text>
				<view class="word-point"></view>
			</view>
			
			<view class="con-btn-content" :class="{'con-btn-active': onTouch === 0}"
			:data-id=0 @tap="tapNo" @touchstart="touchStar" @touchend="touchEnd">
				<text class="word-text base-text-sub base-color-primary">不认识</text>
				<view class="word-point"></view>
			</view>
		</view>
		<view class="con-btn-type" v-show="btnType.page === 0">
			<view class="con-btn-content" :class="{'con-btn-active': onTouch === 1}" 
			:data-id=1 @tap="tapNext" @touchstart="touchStar" @touchend="touchEnd" >
				<text class="word-text base-text-sub base-color-primary">下一词</text>
				<view class="word-point"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ControlBar',
		computed:{		

			btnType() {
				let	_this = this
				if(this.$store.getters.isLock){ //如果lock为true，返回变化之前的值
				console.log("hold住了")
					return _this.hold
				}else{
					//当lock为false，保存变化之前的值
					_this.hold = this.$store.getters.btnType
					console.log("没hold住")
					return this.$store.getters.btnType
				}
				
			}
		},
		data() {
			return {
				onTouch: -1,
				hold: null
			}
		},
		methods: {
			tapYes() {
				this.$emit('tapYes')
			},
			tapNo() {
				this.$emit('tapNo')
			},
			tapNext(){
				this.$emit('tapNext')
			},
			tapNoClear(){
				this.$emit('tapNoClear')
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
	.word-text{
		font-weight: bold;
	}
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
