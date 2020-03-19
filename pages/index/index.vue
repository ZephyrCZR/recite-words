<template>
	<view class="base-bg-image">
		<avatar></avatar>
		<view class="home-middle">
			<clock-in @tap="clockIn" v-if="!isClock"></clock-in>
			<background-desc v-else :bg_decs="bg_decs"></background-desc>
		</view>
		<home-botton class="home-btn" :book_state="bookState" @tapLearn="tapLearn" @tapReview="tapReview"></home-botton>
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
		mapActions,
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				bg_decs: {},
				noBook: false
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
		computed: {
			...mapGetters(['avatar','bookState', 'isClock'])
		},
		methods: {
			...mapActions(['initUserInfo', 'initBookInfo','initQueues','clock']),

			//签到
			clockIn() {
				this.clock().then(() => {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '签到成功: M币+10'
					});
				})
			},
			//点击“Learn”
			tapLearn() {
				uni.redirectTo({
					url: '/pages/study/study'
				})
			
			},
			//点击“Review”
			tapReview() {
			
			},

		},
		created() {
			console.log(this.$store.state)
			if(uni.getStorageSync('TOKEN')){
				this.initUserInfo().then(() => {
					this.noBook = !this.$store.state.book_id
				})
				this.initBookInfo().then(() => {
					this.initQueues()
				})
			}
	
		},
		mounted() {
		

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
