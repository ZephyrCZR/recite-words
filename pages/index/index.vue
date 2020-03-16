<template>
	<view class="base-bg-image">
		<avatar></avatar>
		<view class="home-middle">
			<clock-in @tap="clockIn" v-if="!isClock"></clock-in>
			<background-desc v-else :bg_decs="bg_decs"></background-desc>
		</view>
		<home-botton class="home-btn" :book_state="book_state" @tapLearn="tapLearn" @tapReview="tapReview"></home-botton>
		<tab-bar></tab-bar>
		<popup v-if="noBook"></popup>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import Avatar from './childComp/Avatar.vue';
	import ClockIn from './childComp/ClockIn.vue';
	import BackgroundDesc from './childComp/BackgroundDesc.vue';
	import HomeBotton from './childComp/HomeBotton.vue';
	import Popup from './childComp/Popup.vue';
	import Panel from 'components/panel/panel.vue';
	import TabBar from './childComp/TabBar.vue'

	import {
		init,
		clock
	} from './index.js'

	export default {
		data() {
			return {
				isClock: true,
				bg_decs: {},
				noBook: false,
				avatar: '',
				book_state: {
					learn: 0,
					review: 0
				},
			}
		},
		components: {
			Avatar,
			ClockIn,
			BackgroundDesc,
			HomeBotton,
			Popup,
			Panel,
			TabBar
		},
		created() {
			init(this)
		},
		methods: {
			tapLearn() {
				uni.redirectTo({
					url: '/pages/study/study'
				})

			},
			tapReview() {

			},
			//签到
			clockIn() {
				clock().then(() => {
					this.isClock = true
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '签到成功: M币+10'
					});
				})
			}

		}
	}
</script>

<style>
	.home-middle {
		position: absolute;
		top: 20%;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.home-btn {
		position: absolute;
		top: 70%;
		width: 100%;
	}
</style>
