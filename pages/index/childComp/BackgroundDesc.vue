<template>
	<view class="bg-dec">
			<span class="bg-word">{{desc.word}}</span>
			<span class="bg-par">{{desc.par}}</span>
		</view>
</template>

<script>
	export default {
		name: 'BackgroudDesc',
		props:{
			desc: {
				type: Object,
				default() {
					return {
						word: "beach",
						par: "n. 海滩；湖滨"
					}
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
.bg-dec {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: bold;		
	}
  .bg-word {
		/* background-color: #4CD964; */
		font-size: 88rpx;
		padding-bottom: 30rpx;
		line-height: 88rpx;
	}
	.bg-par {
		/* background-color: #007AFF; */
		font-size: 34rpx;
		line-height: 40rpx;
	}
</style>
