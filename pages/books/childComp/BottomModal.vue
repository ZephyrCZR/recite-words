<template>
	<view class="cu-modal bottom-modal show">
		<view class="cu-dialog">
			<view class="cu-bar bg-white">
				<view class="action text-red" @tap="confirm">确定</view>
				<view class="action text-green" @tap="cancel">取消</view>
			</view>
			<view class="padding-xl">
				删除该词书
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'BottomModal',
		methods:{
			cancel(){				
					this.$emit('cancel')
			},
			confirm(){
				this.$emit('confirm')
			}
		}
	}
</script>

<style>
</style>
