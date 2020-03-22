<template>
		<view class="my-popup-btn" :class="{'my-touch': !onTouch}" @touchstart="startTouch" @touchend="endTouch">
			<slot></slot>
		</view>
</template>

<script>
	export default {
		name: 'childBtn',
		
		data() {
			return {
				onTouch: false
			}
		},
		methods: {
			startTouch() {
				this.onTouch = true
			},
			endTouch() {
				this.onTouch = false
			}
		}
	}
</script>

<style>
	.my-popup-btn {
		background-color: rgba(211, 204, 199, 153);
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.my-touch {
		color: #a88151;
		background-color: rgba(167, 134, 107, 0.2);
	}
</style>
