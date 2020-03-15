<template>
	<view class="">
		<nav-bar></nav-bar>
		<book-swiper @selectBook="selectBook" @removeBook="removeBook" class="book-swiper" :booksList="booksList"></book-swiper>
		<bottom-modal v-if="showModal" @confirm="tapConfirm" @cancel="tapCancel"></bottom-modal>

	</view>

</template>

<script>
	import NavBar from '../../components/navbar/NavBar.vue'
	import BookSwiper from './childComp/BookSwiper.vue'
	import BottomModal from './childComp/BottomModal.vue'
	import {
		getServerBookList,
		addUserBook
	} from '../../network/books.js'

	export default {
		name: "books",
		components: {
			NavBar,
			BookSwiper,
			BottomModal
		},
		data() {
			return {
				booksList: [],
				showModal: false
			}
		},
		methods: {
			removeBook() {
				this.showModal = true
			},
			tapCancel() {
				this.showModal = false
			},
			tapConfirm() {
				this.showModal = false
				uni.showToast({
					icon: 'none',
					title: '删除的功能还未添加'
				});
			},

			selectBook(book_name) {
				const that = this
				uni.showLoading({
					title: '添加中……',
					mask: true
				});
				addUserBook(book_name).then((success) => {
					console.log(success.data)
					if (success.data && success.data.err_code === 0) {
						//更新用户信息
						if(success.data.uInfo){
							uni.setStorageSync('UserInfo', success.data.uInfo)
						}else{
							console.log("获取不到用户信息")
						}						
						
						console.log(that.booksList)
						// 查找书库中,对应的书并删除
						that.booksList.forEach(cate => {
							for(let i=0; i<cate.list.length;i++ ){
								const book = cate.list[i]
									if (book.book_name === book_name){
										cate.list.splice(i,1)
									}									
							}				
						})

						//重置用户词书列表						
						that.booksList[0].list = success.data.uInfo.book_list
						console.log(that.booksList)
						//更新保存书库信息到本地	
						if(that.booksList){
								uni.setStorageSync('ServerBookList', that.booksList)
						}else{
							console.log("列表信息丢失")
						}

						uni.showToast({
							title: '添加成功'
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '添加失败'
						});
					}
					uni.hideLoading();
				})
			}

		},
		created() {
			//获取书库信息
			getServerBookList().then(() => {
				this.booksList = uni.getStorageSync('ServerBookList')
			})

		},
		mounted() {
			this.booksList = uni.getStorageSync('ServerBookList')
		}
	}
</script>

<style>
	.book-swiper {
		margin-top: 20rpx;

	}

	.books-content {
		width: 100%;
		height: 100%;
		background-color: #007AFF
	}
</style>
