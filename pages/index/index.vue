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
		dateFormat
	} from 'common/utils.js'
	import {
		dailyInit,
		getBookInfo,
		clockIn
	} from 'network/home.js'

	export default {
		data() {
			return {
				title: 'Hello',
				isClock: true,
				bg_decs: {},
				noBook: false,
				avatar: '',
				book_id: '',
				book_state: {},
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
			this.classify()
		},
		methods: {
			tapLearn(){
				uni.redirectTo({
					url:'/pages/study/study'
				})
				
			},
			tapReview(){
				
			},
	
			
			classify() {
				//获取本地词书信息
				const book = uni.getStorageSync('BOOKINFO').book
				// 获取今天日期 yyyy-mm-dd
				const today = dateFormat(Date.now())

				//识别分类单词的状态
				let learn = [] //未背诵的
				let doing = [] //背过但是未达到掌握的，等待复习
				let review = [] //需要复习的
				let done = [] //已掌握的
				
				for (let i = 0; i < book.length; i++) {
					const word = book[i]
					if (word.state === 0) {
						learn.push(word)
						continue;
					}
					if (word.state === 1) {
						doing.push(word)
						if (word.next_date <= today) { //如果达到复习的日期
							review.push(word)
						}
						continue;
					}
					if (word.state === 2) {
						done.push(word)
						continue
					}
				}
				// console.log(learn)
				// console.log(doing)
				// console.log(review)
				// console.log(done)
				this.book_state.learn = learn.length
				this.book_state.review = review.length
			},

			//判断用户信息中，有没有选定的词书，如果没有，要求添加词书；如果有，判断该词书状态信息表是否存在，如果没有，发送请求获取。 
			checkBook() {
				console.log("调用了checkBook")
				const UserInfo = uni.getStorageSync('UserInfo')

				if (!UserInfo) {
					//第二重判断登录状态
					return
				}

				if (UserInfo.book_id) { //判断是否已有选中的词书
					//判断该词书状态信息表是否存在
					const BookInfo = uni.getStorageSync('BookInfo')
					if (BookInfo) {
						return true
					} else {
						//发送获取词书状态信息请求
						getBookInfo(UserInfo.book_id).then((res) => {
							const book = res.data.book
							//保存词书信息到本地
							if (res && res.data) {
								uni.setStorageSync('BOOKINFO', res.data)
							} else {
								console.log('获取词书信息的时候出错了')
							}
						})
					}
				} else {//如果没有已选中的词书，设置this.noBook为true，弹出要求添加词书
					this.noBook = true
				}
			},

			//判断今日学习记录表是否已经初始化，若未初始化则初始化，返回一个新的用户信息表
			isInitTodayYet() {
				//如果没有token，直接跳过
				if (!uni.getStorageSync('TOKEN')) {
					return
				}
				console.log("调用了isInitTodayYet")
				
				const UserInfo = uni.getStorageSync('UserInfo')
				
				// 获取今天日期 yyyy-mm-dd
				const today = dateFormat(Date.now())
				
				//防止UserInfo.calendar为null而报错
			  let length = UserInfo.calendar ? UserInfo.calendar.length : 0
				if (length !== 0 && UserInfo.calendar[length - 1].date === today) {
					this.isClock = UserInfo.calendar[length - 1].clock
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
							if (suc.data.uInfo) { //执行存入操作前必须判断是否取到该值
								console.log("今日已完成过初始化了")
								uni.setStorageSync('UserInfo', suc.data.uInfo)
							}							
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
							title: '签到成功: M币+10'
						});

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
