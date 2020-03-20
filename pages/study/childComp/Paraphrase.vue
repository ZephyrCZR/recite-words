<template>
	<view class="par-content">
		<view class="par-hidden" v-show="isShow? (options.step === 1 || options.step === 3) : false">
			<loading @tap="showAnswer"></loading>
		</view>
		
		<view class="par-hint" v-show="options.page === 0 || !isShow && (options.step === 1 || options.step === 3) ">
			<view class="par-hint-item" v-for="(item, index) in options.right" :key="index">
				<text class="word-hint-pos base-text-thin base-color-sub">{{item.pos}}</text>
				<text class="word-hint-par base-text-sub base-color-primary">{{item.meaning}}</text>
			</view>
		</view>

		<view class="par-btn" v-show="options.page? (options.step === 0 || options.step === 2) : false"> 
			<par-btn class="par-btn-item" v-for="(item, index) in options.choices" :key="index" :class="[isTrue === index? 'trueColor':'',isFalse === index? 'falseColor':'']">
				<template>
					<view class="par-btn-content" @tap="tapOption(index)">
						<text class="word-pos base-text-thin base-color-sub">{{item.pos}}</text>
						<text class="word-par base-text-sub base-color-primary">{{item.meaning}}</text>
					</view>
				</template>
			</par-btn>
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
			...mapGetters(['isLock']),
			
			options() {
				let	_this = this
				if(this.isLock){ //如果lock为true，返回变化之前的值
					return _this.hold
				}else{
					//当lock为false，保存变化之前的值
					_this.hold = this.$store.getters.paraphrase
					return this.$store.getters.paraphrase
				}
	
			}
			
		},
		data() {
			return {
				isTrue: -1,
				isFalse: -1,
				isShow: true,
				timer: null,
				sortTimer: null,
				hold: null,
				lock_s: false
			}
		},
		
		methods: {
			...mapActions(['changePage', 'isCorrect', 'isMistake', 'getCurrentWord','lock']),
			tapOption(index) {
				let _this = this
					console.log(index)
				//不管选对还是选错，true都会亮起
				_this.isTrue = _this.options.rand
				clearTimeout(_this.sortTimer)
				
				if(index !== this.options.rand){
					//如果选择错误
					_this.isFalse = index
					_this.sortTimer = setTimeout(() => {
							_this.isMistake().then(() => {
							_this.updateData()
							_this.changePage(0)							
						})							
					},600)

				}else{
					let preStep = this.options.step
					//如果选择正确
					_this.sortTimer = setTimeout(() => {
						
							_this.lock(true) //加锁
							
							_this.isCorrect().then(() => {
							
								if(preStep === 0){										
									_this.changePage(0)
								  _this.updateData()
									_this.lock(false) //解锁
								}else{
									_this.changePage(1)
									_this.getCurrentWord().then(() => {
											
									_this.lock(false) //解锁
					
									})
									_this.updateData()
									_this.setTimer()
								}								
						})							
					},600)
				}
						

			},
			showAnswer() {//取消遮挡
				this.isShow = false//取消遮挡	
				clearTimeout(this.timer)//清除定时器
				
			},				
			updateData(){//跳转到答案页，调用updateData，跳转到问题页，先调用updateData再调用setTimer
				this.isTrue = -1
				this.isFalse = -1
				this.isShow = false				
			},
			setTimer(){
				let _this = this
				clearTimeout(_this.timer)
				_this.isShow = true
				_this.timer = setTimeout(() => {
					console.log("haha")
					_this.isShow = false
				},3000)
			}

		},
		created() {
			// this.updateData()
		},
	}
</script>

<style>
	.trueColor {
		background-color: rgba(85, 255, 127, 0.2);
	}

	.falseColor {
		background-color: rgba(255, 85, 0, 0.2);
	}

	.par-hint {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		padding: 0 60rpx;
		box-sizing: border-box;
	}

	.par-hint-item {
		width: 100%;
		display: flex;
		justify-content: center;
		/* align-items: center; */
		flex-direction: column;
		margin-bottom: 15rpx;
	}

	.word-par {
		line-height: 46rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
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

		padding: 0 30rpx;
	}

	.par-btn-item{
		margin-bottom: 20rpx;
	}

	.par-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 480rpx;
    box-sizing: border-box; 
		/* background-color: #007AFF; */
	}

	.par-content {
		height: 480rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
</style>
