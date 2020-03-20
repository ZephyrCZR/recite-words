<template>
	<view class="base-bg-image">
		<view class="study-mask study-content">
			<top-bar></top-bar>
			<word class="study-word"></word>
			<Paraphrase ref="Paraphrase" ></Paraphrase>
			<control-bar @tapYes="tapYes" @tapNo="tapNo" @tapNext="tapNext"></control-bar>
			<tab-bar></tab-bar>
		</view>
	</view>
</template>

<script>
	import TopBar from './childComp/TopBar.vue';
	import Word from './childComp/Word.vue';
	import Paraphrase from './childComp/Paraphrase.vue';
	import ControlBar from './childComp/ControlBar.vue';
	import TabBar from './childComp/TabBar.vue'

	import {
		mapActions,
		mapGetters
	} from 'vuex'

	export default {
		components: {
			TopBar,
			Word,
			Paraphrase,
			ControlBar,
			TabBar
		},

		methods: {
			...mapActions(['initQueues','getCurrentWord','changePage','isCorrect', 'isMistake','lock']),
			tapYes() {
				this.lock(true)
				this.isCorrect().then(() => {						
					this.getCurrentWord().then(() => {						
						this.changePage(1)
						this.lock(false)
					})
					this.$refs.Paraphrase.updateData()	
									
					this.$refs.Paraphrase.setTimer()
				})
				
			},
			tapNo() {
				this.lock(true)
				this.isMistake().then(() => {					
					this.changePage(0).then(() => {
						this.lock(false)
						this.$refs.Paraphrase.updateData()
					})
					
				})
				
			},
			tapNext() {				
				this.getCurrentWord()
				this.$refs.Paraphrase.updateData()
				this.changePage(1).then(() => {
					this.$refs.Paraphrase.setTimer()
				})
				
				
			}
		},
		created() {
			this.initQueues()
			this.getCurrentWord()			
			
		},
		onLoad(options) {
			console.log(options)
		}
	}
</script>

<style>
	.study-word {
		/* flex: 1; */
		height: 50%;
/* 		background-color: #1CBBB4; */
	}

	.study-content {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.study-mask {
		backdrop-filter: blur(50rpx);
		background-color: rgba(255, 255, 255, 0.3);
	}
</style>
