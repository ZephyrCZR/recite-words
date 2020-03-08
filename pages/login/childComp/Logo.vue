<template>
	<view class="logo">
		<image class="logo_img" :src="logo_img"></image>
	</view>
</template>

<script>
	export default {
		name: 'Logo',
		data() {
			return {
				logo_img: '/static/logo-250.png'
			}
		}
	}
</script>

<style scoped>
	.logo {
		margin-top: 220rpx;
	}

	.logo_img {
		box-shadow: 0 0 26px rgba(167, 134, 107, 1);
		width: 200rpx;
		height: 200rpx;
		border-radius: 24px;
	}
</style>
