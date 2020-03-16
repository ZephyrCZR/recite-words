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
	import {addbook, renderSBInfo} from './books.js'
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
				addbook(this, book_name)
			}

		},
		created() {
			//渲染书库信息
			
				renderSBInfo(this)
		},
		mounted(){
			console.log(this.booksList)
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
