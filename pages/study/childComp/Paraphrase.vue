<template>
	<view class="par-content">

		<view class="par-hint" v-if="options.page === 0 || !isShow">
			<view class="par-hint-item" v-for="(item, index) in options.right" :key="index">
				<text class="word-pos base-text-thin base-color-sub">{{item.pos}}</text>
				<text class="word-par base-text-sub base-color-primary">{{item.meaning}}</text>
			</view>
		</view>
		
		<view class="par-btn" v-if="options.page? (options.step === 0 || options.step === 2) : false"> 
			<par-btn class="par-btn-itme" v-for="(item, index) in options.choices" :key="index" :class="[isTrue === index? 'trueColor':'',isFalse === index? 'falseColor':'']">
				<template>
					<view class="par-btn-content" @tap="tapOption(index)" >
						<text class="word-pos base-text-thin base-color-sub">{{item.pos}}</text>
						<text class="word-par base-text-sub base-color-primary">{{item.meaning}}</text>
					</view>
				</template>
			</par-btn>			
		</view>
		
		<view class="par-hidden" v-if="isShow? (options.step === 1 || options.step === 3) : false">
			<loading @showAnswer="showAnswer"></loading>
		</view>
		
	</view>
</template>

<script>
	import ParBtn from '../../../components/bottom/ParBtn.vue'
	import Loading from './Loading.vue'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	
	
	export default {
		name: 'Paraphrase',
		components: {
			ParBtn,
			Loading
		},
		computed: {
			...mapGetters({options:'paraphrase'}),			
		},
		data(){
			return {
					isTrue: -1,
					isFalse: -1,
					isShow: true,
			}			
		},
		methods:{
			...mapActions(['changePage','isCorrect','getCurrentWord']),
			tapOption(index){
				console.log(index)
				if(index !== this.options.rand){//如果选错了
					this.isFalse = index
					this.changePage(0) //跳转到答案页
				}else{
					this.isCorrect().then(() => {
						
					if(this.options.step === 1){
						this.changePage(0)
					}else{
						this.getCurrentWord()
					}
					
				})
					
				}
				//不管选对还是选错，true都会亮起
				this.isTrue = this.options.rand
				
				
			},
			showAnswer(){
				this.isShow = false
				
				// this.$store.dispatch('changePage', 0).then(()=>{
				// 	console.log(this.$store.state)
				// 	console.log(this.$store.getters.paraphrase.page)
				// 	console.log(this.curComp)
				// })
			}

		}
	}
</script>

<style>
	.trueColor{
		background-color: rgba(85, 255, 127, 0.2);
	}
	.falseColor{
		background-color: rgba(255, 85, 0, 0.2);
	}
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
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
	}

	.par-content {
	height: 480rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	}
</style>
