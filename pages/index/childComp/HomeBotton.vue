<template>
	<view class="my-buttons">
		<view class="my-button base-mask"><span class="base-text-primary">Learn</span><span class="base-color-focus">{{book_state.learn}}</span></view>
		<view class="my-button base-mask"><span class="base-text-primary">Review</span></span><span class="base-color-focus">{{book_state.review}}</span></view>
	</view>			
</template>

<script>

	export default {
		name: 'HomeBotton',
		props: {
			book_state: {
				type: Object,
				default() {
					return {
						learn: 0,
						review: 0
					}
				}
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style>
.my-button {
		display: flex;
		justify-content: center;
		width: 260rpx;
		height: 150rpx;
		margin: 0 30rpx;
		flex-direction:column;
		border-radius: 10rpx;		
		padding-left: 50rpx;
		line-height: 60rpx;
	}
	.my-buttons {
		display: flex;		
	  justify-content: space-between;		
		width: 100%;
	}
</style>
