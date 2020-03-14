<template>
	<view class="base-bg-image">
		<avatar></avatar>
		<view class="home-middle">
			<clock-in @tap="clockIn" v-if="!isClock"></clock-in>
			<background-desc v-else :bg_decs="bg_decs"></background-desc>
		</view>
		<home-botton class="home-btn"></home-botton>
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
		dateFormat
	} from 'common/utils.js'
	import {
		dailyInit,
		getBookInfo,
		clockIn
	} from 'network/home.js'

	export default {
		name: "home",
		data() {
			return {
				title: 'Hello',
				isClock: true,
				bg_decs: {},
				noBook: false,
				avatar: '',
				book_id: ''
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
			//判断词书信息
			this.checkBook()
			//判断学习记录表信息
			this.isInitTodayYet()
			
		},
		methods: {
			//判断用户信息中，有没有选定的词书，如果没有，要求添加词书；如果有，判断该词书状态信息表是否存在，如果没有，发送请求获取。 
			checkBook() {
				console.log("调用了checkBook")
				
				const UserInfo = uni.getStorageSync('UserInfo')
				
				if (!UserInfo) {
					//第二重判断登录状态
					return this.checkToken()
				}

				if (UserInfo.book_id) {					
					//判断该词书状态信息表是否存在
					const BookInfo = uni.getStorageSync('BookInfo')
					if (BookInfo) {
						return true
					} else {
						//发送获取词书状态信息请求
						 getBookInfo(book_id).then((res) => {
							 console.log(res)
						 })
					}
				} else {
					this.noBook = true
				}
			},

			//判断今日学习记录表是否已经初始化，若未初始化则初始化，返回一个新的用户信息表
			isInitTodayYet() {
				// 获取今天日期 yyyy-mm-dd
				const today = dateFormat(Date.now())
				const UserInfo = uni.getStorageSync('UserInfo')

				if (UserInfo.calendar &&
					UserInfo.calendar.length != 0 &&
					UserInfo.calendar[0].date === today) {
					this.isClock = UserInfo.calendar[0].clock
					return
				} else {
					// 发送初始化请求（是一个promise实例）
					dailyInit().then((suc) => {

						if (suc.data.err_code === 0) {
							this.isClock = suc.data.uInfo.isClock

							if (suc.data.uInfo) { //执行存入操作前必须判断是否取到该值
								console.log("今日初始化完成")
								uni.setStorageSync('UserInfo', suc.data.uInfo)
							}
						} else {
							console.log("今日已完成过初始化了")
						}
					})
					return
				}
			},

			//发送签到请求
			clockIn() {
				clockIn().then((suc) => {
					if (suc.data.err_code === 0) {

						// 更新本地用户信息表						
						if (suc.data.uInfo) { //执行存入操作前必须判断是否取到该值
							console.log("签到成功")
							uni.setStorageSync('UserInfo', suc.data.uInfo)
						}

						this.isClock = true
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: '签到成功: 星币+10'
						});
						// console.log(uni.getStorageSync('UserInfo'))
					}
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
