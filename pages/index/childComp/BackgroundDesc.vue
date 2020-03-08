<template>
	<view class="bg_dec">
			<span class="bg_word">{{desc.word}}</span>
			<span class="bg_par">{{desc.par}}</span>
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
.bg_dec {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: bold;		
	}
	.bg_dec>.bg_word {
		/* background-color: #4CD964; */
		font-size: 88rpx;
		padding-bottom: 30rpx;
		line-height: 88rpx;
	}
	.bg_dec>.bg_par {
		/* background-color: #007AFF; */
		font-size: 34rpx;
		line-height: 40rpx;
	}
</style>
