<template>
	<view class="buttons">
		<view class="button mask"><span class="text">Learn</span><span class="count">{{book_state.learn}}</span></view>
		<view class="button mask"><span class="text">Review</span></span><span class="count">{{book_state.review}}</span></view>
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
.button {
		display: flex;
		justify-content: center;
		width: 260rpx;
		height: 150rpx;
		margin: 0 30rpx;
		flex-direction:column;
		border-radius: 10rpx;		
		padding-left: 50rpx;
	}
	.buttons {
		display: flex;		
	  justify-content: space-between;		
		width: 100%;		
	}
</style>
