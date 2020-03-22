<template>
	<transition name="bounce">
		<view class="my-sign-in base-mask" :class="['buttonBorder',!_rotate?'dlbutton':'dlbutton_loading']" >
			<view :class="_rotate?'rotate_loop':''">
				<view class="my-sign-in" v-if="!_rotate" :class="{'my-touch': onTouch}" @touchstart="touchstart" @touchend="touchend">
					<text class="iconfont icon-calendar my-sign-icon">
					</text>
					<text>
						<text class=""></text>
					</text>
					</text>
					<text class="text">签到</text>
					<text class="my-date">{{date}}</text>
				</view>

				<text v-if="_rotate" class="cuIcon cuIcon-loading1 "></text>
			</view>
		</view>


		</view>
	</transition>

</template>

<script>
	export default {
		name: 'ClockIn',
		data() {
			return {
				date: '',
				rotate: false,
				onTouch: false
			}
		},
		methods: {

			touchstart() {
				this.onTouch = true
			},
			touchend() {
				this.onTouch = false
				this.rotate = !this.rotate
				this.$emit('onTap')
			},
			//获取当前日期
			mDate() {
				let date = new Date(Date.now()).toString()
				let arr = date.split(' ')
				let str = arr[0] + ' ' + arr[1] + ' ' + arr[2]
				return str
			}
		},
		computed: {
			_rotate() {
				//处理值
				return String(this.rotate) !== 'false'
			}
		},
		created() {
			// 获取日期
			this.date = this.mDate()
		}
	}
</script>

<style>
	.cuIcon-loading1 {
		color: #333333;
		font-size: 80rpx;
	}

	.my-sign-in {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 300rpx;
		width: 300rpx;
		border-radius: 20%;
		cursor:pointer;
	}

	.my-sign-icon {
		margin-top: 40rpx;
		line-height: 70rpx;
		font-size: 30px;
	}

	.my-date {
		font-size: 30rpx;
		color: #808080;
	}
	.my-touch {
		color: #808080;
	}


	.dlbutton_loading {

		height: 200rpx;
		width: 200rpx;
		color: #333333;
		font-size: 80rpx;
		border-radius: 50%;
		text-align: center;
		margin: 50rpx;
	}

	/* 旋转动画 */
	.rotate_loop {
		-webkit-transition-property: -webkit-transform;
		-webkit-transition-duration: 1s;
		-moz-transition-property: -moz-transform;
		-moz-transition-duration: 1s;
		-webkit-animation: rotate 1s linear infinite;
		-moz-animation: rotate 1s linear infinite;
		-o-animation: rotate 1s linear infinite;
		animation: rotate 1s linear infinite;
	}

	@-webkit-keyframes rotate {
		from {
			-webkit-transform: rotate(0deg)
		}

		to {
			-webkit-transform: rotate(360deg)
		}
	}

	@-moz-keyframes rotate {
		from {
			-moz-transform: rotate(0deg)
		}

		to {
			-moz-transform: rotate(359deg)
		}
	}

	@-o-keyframes rotate {
		from {
			-o-transform: rotate(0deg)
		}

		to {
			-o-transform: rotate(359deg)
		}
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg)
		}

		to {
			transform: rotate(359deg)
		}
	}
</style>
