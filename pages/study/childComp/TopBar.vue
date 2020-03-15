<template>
	<view class="top-bar-content">
		<text>{{progress.achieve}}/{{progress.count}}</text>
	</view>
</template>

<script>
	export default {
		name: 'TopBar',
		props:{
			progress: {
				type: Object,					
				default() {
					return {}
				}
			}			
		}

	}
</script>

<style>
	.top-bar-content {
		position: absolute;
		top: 6%;
		left: 0;
		padding-left: 30rpx;
	}
</style>
