<template>

	<view class="cu-bar search">
		<view class="search-form input-inner ">
			<text class="cuIcon-search"></text>
			<input class="" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索对应单词"
			 confirm-type="search"></input>
		</view>
		<view class="action">
			<text>取消</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'search',
		components: {

		},
		data() {
			return {
				InputBottom: 0
			}
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
				this.$emit('inputFocus')
			},
			InputBlur(e) {
				this.InputBottom = 0
				this.$emit('inputBlur')
			}
		}
	}
</script>

<style>
	.input-inner {
		background-color: #e7e7e7;
		border-radius: 50rpx;
		height: 100rpx;
	}
</style>
