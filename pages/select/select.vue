<template>
	<view class="bg_image">

		<view id="bolck" class="block" @tap="move">
			btnaaaaaaaaaaaaaaaaaaaafsfadf
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				isShow: false
			}
		},
		methods: {

			onTap() {
				console.log("ces")
				let view = uni.createSelectorQuery().select("#bolck");
				console.log(view)

				view.fields({
					size: true
				}, data => {
					console.log(data)
				}).exec();

			}
		},


	}
</script>

<style>
	.block {
		height: 3000rpx;
		width: 50%;
		background-color: #1CBBB4;
	}
</style>
