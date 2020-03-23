<template>
	<view class="my-popup">
		<view class="base-mask my-tips">
			<view class="my-text">
				{{params.text}}
			</view>
			<view class="my-popup-btns">
				<view class="my-popup-btn" v-for="(item, index) in params.btn" :key="index" @tap="$emit('onTap', index)">
					<child-btn class="my-popup-btn" >
					<template>
						<view class="base-text-thin">{{item}}</view>
					</template>
				</child-btn>
				</view>
				
			</view>


		</view>
	</view>
</template>

<script>
	import childBtn from './childComp/childBtn.vue'
	export default {
		name: 'Popup',
		props:{
			params:{
				type: Object,
				default(){					
					return {
						text: '',
						btn: []
					}
					
				}
			}
		},
		components:{
			childBtn
		},
		methods: {
			goSelect() {
				this.$emit('tapGo')
			}
		}
	}
</script>

<style>
	.my-popup {
		position: absolute;
		z-index: 999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.my-tips {
		height: 300rpx;
		width: 440rpx;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 0.9);
	}

	.my-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 2;
		padding: 46rpx;
	}

	.my-popup-btns {
		width: 100%;
		height: 30%;
		display: flex;
		
	}
	
	.my-popup-btn{
		flex:1 ;
	}


</style>
