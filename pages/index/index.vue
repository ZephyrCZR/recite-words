<template>
	<view class="base-bg-image">
		<avatar class="home-avatar" @tapAvatar="tapAvatar"></avatar>
		<view class="home-middle">
			<clock-in @onTap="clockIn" v-if="!isClock"></clock-in>
			<background-desc v-else :bg_decs="bg_decs"></background-desc>
		</view>
		<home-botton class="home-btn" :book_state="bookState" @tapLearn="tapLearn" @tapReview="tapReview"></home-botton>
		<popup v-if="showPopup" @onTap="tapPopup" :params="popup_params"></popup>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	
	import ClockIn from './childComp/ClockIn.vue';
	import BackgroundDesc from './childComp/BackgroundDesc.vue';
	import HomeBotton from './childComp/HomeBotton.vue';
	import TabBar from './childComp/TabBar.vue';
	
	import Avatar from '../../components/avatar/avatar.vue';
	import Panel from 'components/panel/panel.vue';
	import Popup from 'components/popup.vue/Popup.vue';

	import {
		mapActions,
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				bg_decs: {},
				showPopup: false,
				popup_params: {}
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
			...mapGetters(['avatar', 'bookState', 'isClock'])
		},
		methods: {
			...mapActions(['initUserInfo', 'initBookInfo', 'initQueues', 'initReview', 'clock']),

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
				//判断是否有需要复习的单词
				if (this.bookState.review > 0) {
					//提示是否先完成复习
					this.showPopup = true,
						this.popup_params = {
							text: '尚未完成复习，是否先复习',
							btn: ['仍要学习', '开始复习']
						}
				} else {
					uni.redirectTo({
						url: '/pages/study/study?type=learn&num=' + JSON.stringify(this.bookState)
					})
				}

			},
			//点击“Review”
			tapReview() {
				//判断是否有需要复习的单词
				if (this.bookState.review > 0) {
					uni.redirectTo({
						url: '/pages/study/study?type=review&num=' + JSON.stringify(this.bookState)
					})
				} else {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: '您没有需要复习的单词哦'
					});
				}


			},
			tapPopup(index) {
				if (index === 1) {
					uni.redirectTo({
						url: '/pages/study/study?type=review&num=' + JSON.stringify(this.bookState)
					})
				} else {
					if (!this.$store.state.book_id) {
						uni.redirectTo({
							url: '/pages/study/study?type=learn&num=' + JSON.stringify(this.bookState)
						})
					} else {
						uni.navigateTo({
							url: '/pages/books/books'
						})
					}

				}

			},
			//点击头像
			tapAvatar(){
				uni.navigateTo({
					url: '/pages/profile/profile'
				})
			}
		},
		created() {
			this.showPopup = false

			if (uni.getStorageSync('TOKEN')) {
				this.initUserInfo().then(() => {
					this.showPopup = !this.$store.state.book_id
					if (this.showPopup) {
						this.popup_params = {
							text: '前往添加词书',
							btn: ['GO']
						}
					}
				})
				this.initBookInfo().then(() => {
					this.initQueues().then((error) => {
						if (error) {
							uni.showToast({
								title: error,
								icon: 'none'
							})
						}
					})
					this.initReview()
					console.log(this.$store.state)
				})
			}
		},
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
	
	.home-avatar {
		height: 100rpx;
		width: 100rpx;
		position: absolute;
		top: 62rpx;
		left: 30rpx;
	}
</style>
