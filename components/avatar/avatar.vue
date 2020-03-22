<template>
		<view class="avatar" @tap="$emit('tapAvatar')" :class="{'rotate_loop': isSyncing === 1}">
			<image :src="avatar_img" class="avatar_img" ></image>
		</view>
</template>

<script>
	export default {
		name: 'avatar',
		props:{
			avatar_img: {
				type: String,
				default() {
					return '/static/imgs/g.png'
				}
			}
		},
		computed:{
			isSyncing(){
				return this.$store.getters.onSync
			}
		}
	}
</script>

<style scoped>
	.avatar {
		height: 100%;
		width: 100%;
		border-radius: 50%;	
		border: 2px solid rgba(200,200,200,0.4);
		overflow: hidden;
	}

  .avatar_img {
		height: 100%;
		width: 100%;
	}
	
	.cuIcon-loading1 {
		color: #333333;
		font-size: 140rpx;
	}
	
	/* 旋转动画 */
	.rotate_loop {
		-webkit-transition-property: -webkit-transform;
		-webkit-transition-duration: 2s;
		-moz-transition-property: -moz-transform;
		-moz-transition-duration: 2s;
		-webkit-animation: rotate 2s linear infinite;
		-moz-animation: rotate 2s linear infinite;
		-o-animation: rotate 2s linear infinite;
		animation: rotate 2s linear infinite;
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
