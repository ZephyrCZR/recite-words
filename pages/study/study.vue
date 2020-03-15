<template>
	<view class="base-bg-image">
		<view class="study-mask study-content">
			<top-bar :progress="progress"></top-bar>
			<word class="study-word" :word="wordInfo.word" :soundmark="wordInfo.soundmark" :state="1" :config="{}"></word>
			<Paraphrase :options="wordInfo.paraphrase"></Paraphrase>
			<control-bar :btnType="btnType" @tapYes="tapYes" @tapNo="tapNo"></control-bar>
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
				progress: {//已背单词数achieve/每组单词数count
					achieve: 0,
					count: 20
				}, 
				btnType: 0, //控制键类型0，1，2
				
				wordInfo: {  "word": "aw",
  "soundmark": [
    {
      "soundtype": "美",
      "symbol": "ɔ",
      "audio": "https://dictionary.blob.core.chinacloudapi.cn/media/audio/tom/cd/77/CD77341EC8795580756C2743D93BE0BE.mp3"
    },
    {
      "soundtype": "英",
      "symbol": "ɔː",
      "audio": "https://dictionary.blob.core.chinacloudapi.cn/media/audio/george/cd/77/CD77341EC8795580756C2743D93BE0BE.mp3"
    }
  ],
  "paraphrase": [
    {
      "pos": "abbr.",
      "meaning": "(="
    },
    {
      "pos": "int.",
      "meaning": "（表示不满、抗议或同情等）呀"
    },
    {
      "pos": "网络",
      "meaning": "水分活度；水活性；水活度"
    }
  ],

}
			}
		},
		methods: {
			tapYes() {

			},
			tapNo() {

			}
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
