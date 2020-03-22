<template>
	<view class="search-content">
		<search class="search-input" @inputFocus="inputFocus" @inputBlur="inputBlur"></search>
		
		<scroll-view scroll-y="true" class="search-scroll-content">
			
				<view class="search-history" v-if="!onInput"><!-- //这里是不对的，暂时先这样写 -->
			
					<view class="search-word" v-for="index in 10" :key="index">
						<text class="search-word-word base-text-sub">mutation</text>
						<text class="search-word-pos base-text-sub base-color-sub">n.变异，突变</text>
					</view>
				
					<view class="search-history-clear">
						<button class="cu-btn round lines-gray line-gray">清除查询记录</button>
					</view>

				</view>

				<view class="search-new" v-else>
					<view class="search-word">

					</view>
				</view>

		</scroll-view>




	</view>
</template>

<script>
	import Search from '../../components/search/search.vue'
	export default {
		components: {
			Search
		},
		data() {
			return {
				onInput: false
			}
		},
		methods: {
			inputFocus(){
				this.onInput = true
			},
			inputBlur(){
				this.onInput = false
			},
		}
	}
</script>

<style>
	.search-content {
		background-color: #F0F0F0;
		padding-top: 138rpx;
		height: 100vh;
		width: 100%;
	}
	.search-scroll-content{
		height: 100%;
	}
	.search-history {		
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.search-word-word {
		display: inline-block;
		min-width: 200rpx;
	}

	.search-word-pos {
		padding-left: 30rpx;
	}

	.search-history-clear {
		margin-top: 60rpx;
		margin-bottom: 60rpx;
		height: 300rpx;
	}

	.search-word {
		width: 100%;
		padding: 30rpx;
	}
</style>
