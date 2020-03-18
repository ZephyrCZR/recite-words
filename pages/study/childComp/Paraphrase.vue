<template>
	<view class="par-content">
		<view class="par-btn" v-if="isBtn">
			<par-btn class="par-btn-itme" v-for="(item, index) in options" :key="index">
				<template>
					<view class="par-btn-content" @tap="tapOption(index)">
						<text class="word-pos base-text-thin base-color-sub">{{item.pos}}</text>
						<text class="word-par base-text-sub base-color-primary">{{item.meaning}}</text>
					</view>
				</template>
			</par-btn>			
		</view>
		
		<view class="par-hint" v-else>
			<view class="par-hint-item" v-for="(item, index) in options" :key="index">
				<text class="word-pos base-text-thin base-color-sub">{{item.pos}}</text>
				<text class="word-par base-text-sub base-color-primary">{{item.meaning}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import ParBtn from '../../../components/bottom/ParBtn.vue'
	export default {
		name: 'Paraphrase',
		components: {
			ParBtn
		},
		props:{
			options: {
				type: Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {
				isBtn: false
			}			
		},
		methods:{
			tapOption(index){
				console.log(index)
			}
		}
	}
</script>

<style>
	.par-hint{
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
	}
	.par-hint-item{
		display: flex;
		justify-content: center;
		/* align-items: center; */
		flex-direction: column;
	}
	
	
	
	.word-par {
		line-height: 46rpx;
	}
	.word-pos {
		line-height: 36 rpx
	}
	.par-btn-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 30rpx;

		}
	.par-btn-itme {
		margin-bottom: 20rpx;
	}
	.par-btn {		
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		/* background-color: hotpink; */
	}

	.par-content {
	/* background-color: #007AFF; */
	height: 480rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	}
</style>
