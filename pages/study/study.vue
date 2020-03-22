<template>
	<view class="base-bg-image">
		<view class="study-mask study-content">
			<top-bar :view="view"></top-bar>
			<word class="study-word"></word>
			<Paraphrase :view="view" ref="Paraphrase"></Paraphrase>
			<control-bar @tapYes="tapYes" @tapNo="tapNo" @tapNoClear="noClear" @tapNext="tapNext"></control-bar>
			<tab-bar></tab-bar>
		</view>
		<popup v-if="popup > 0" @onTap="onTap" :params="popup_params"></popup>
	</view>
</template>

<script>
	import TopBar from './childComp/TopBar.vue';
	import Word from './childComp/Word.vue';
	import Paraphrase from './childComp/Paraphrase.vue';
	import ControlBar from './childComp/ControlBar.vue';
	import TabBar from './childComp/TabBar.vue'

	import Popup from 'components/popup.vue/Popup.vue';
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
			TabBar,
			Popup
		},
		computed: {
			popup() {
				return this.$store.getters.onSync
			}
		},
		data() {
			return {
				view: {},
				popup_params:{
					text: "您完成了一组学习",
					btn:['继续学习','休息一下']
				}
			}
		},
		methods: {
			...mapActions(['initQueues', 'getCurrentWord', 'changePage', 'isCorrect', 'isMistake', 'lock', 'initReview',
				'getNextWord', 'setFinish', 'goOn'
			]),
			tapYes() {
				if (this.view.type === 'learn') {
					this.lock(true)
					this.isCorrect().then(() => {
						this.getCurrentWord().then(() => {
							this.changePage(1)
							this.lock(false)
						})
						this.$refs.Paraphrase.updateData()
						this.$refs.Paraphrase.setTimer()
					})
				} else {
					this.lock(true)
					this.setFinish().then(() => {
						this.changePage(1)
						this.lock(false)
						this.$refs.Paraphrase.updateData()
						this.$refs.Paraphrase.setTimer()
					})
				}
			},
			tapNo() {
				if (this.view.type === 'learn') {
					this.lock(true)
					this.isMistake().then(() => {
						this.changePage(0).then(() => {
							this.lock(false)
							this.$refs.Paraphrase.updateData()
						})
					})
				} else {
					this.lock(true)
					this.goOn(2).then(() => {
						this.changePage(0)
						this.lock(false)
						this.$refs.Paraphrase.updateData()
					})
				}
			},
			tapNext() {
				if (this.view.type === 'learn') {
					this.getCurrentWord()
					this.$refs.Paraphrase.updateData()
					this.changePage(1).then(() => {
						this.$refs.Paraphrase.setTimer()
					})
				} else {
					this.getNextWord()
					this.$refs.Paraphrase.updateData()
					this.changePage(1).then(() => {
						this.$refs.Paraphrase.setTimer()
					})
				}
			},
			noClear() {
				this.lock(true)
				this.goOn(1).then(() => {
					this.changePage(0)
					this.lock(false)
					this.$refs.Paraphrase.updateData()
				})
			},
			onTap(index) {
				if (index === 1) {
					this.$store.dispatch('setSyncSign', 0)
					uni.redirectTo({
						url: '/pages/index/index'
					})
				}else{
					this.$store.dispatch('setSyncSign', 0)
				}

			}
		},
		onLoad(options) { //onLoad钩子只有在页面有用
			console.log("onload执行了")
			this.view = {
				type: options.type,
				counter: JSON.parse(options.num)
			}

			if (options.type === 'learn') {
				this.initQueues().then(() => {
					this.getCurrentWord()
				})
			} else {
				this.initReview().then(() => {
					this.getNextWord()
				})
			}
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
