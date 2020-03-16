<template>
	<view class="base-bg-image">
<!-- 		<view class="study-mask study-content">
			<top-bar :options="topbar"></top-bar>
			<word :options="word" class="study-word"></word>
			<Paraphrase :options="paraphrase"></Paraphrase>
			<control-bar :btnType="btnType" @tapYes="tapYes" @tapNo="tapNo"></control-bar>
			<tab-bar></tab-bar>
		</view> -->
	</view>
</template>

<script>
	import TopBar from './childComp/TopBar.vue';
	import Word from './childComp/Word.vue';
	import Paraphrase from './childComp/Paraphrase.vue';
	import ControlBar from './childComp/ControlBar.vue';
	import TabBar from './childComp/TabBar.vue'

	import {test} from'./study.js'

	export default {
		components: {
			TopBar,
			Word,
			Paraphrase,
			ControlBar,
			TabBar
		},
		data() {
			return {
				btnType: 0, //控制键类型0，1，2
				// 子组件props统一传参				
				
				//配置信息
				topbar: {done: 0,count: 20},  //已背单词数achieve/每组单词数count
				word: {},
				paraphrase: []
			}
		},
		methods: {
			tapYes() {

			},
			tapNo() {

			}
		},
		mounted() {
			console.log(this.config)
			
			
		}
	}
</script>

<style>
	.study-word {
		flex: 1;
	}

	.study-content {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.study-mask {
		backdrop-filter: blur(100rpx);
		background-color: rgba(255, 255, 255, 0.6);
	}
</style>
