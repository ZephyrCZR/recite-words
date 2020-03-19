<template>
	<view class="top-bar-content">
		<text>{{count}}/{{numbers}}</text>
	</view>
</template>

<script>
	export default {
		name: 'TopBar',
		computed: {
			count() {
				return this.$store.getters.count
			},
			numbers() {
				return this.$store.getters.numbers
			}

		},
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
