<template>
		<view class="avatar">
			<image :src="avatar_img" class="avatar_img" ></image>
		</view>
</template>

<script>
	export default {
		name: 'Avatar',
		props:{
			avatar_img: {
				type: String,
				default() {
					return '/static/imgs/g.png'
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

	.avatar {
		height: 100rpx;
		width: 100rpx;
		position: absolute;
		top: 62rpx;
		left: 30rpx;
		border-radius: 50%;	
		border: 2px solid rgba(200,200,200,0.4);
		overflow: hidden;
	}

  .avatar_img {
		height: 100%;
		width: 100%;
	}
</style>
