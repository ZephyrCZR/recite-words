<template>
	<view class="">
		<nav-bar></nav-bar>
		<book-swiper @selectBook="selectBook" @removeBook="removeBook" class="book-swiper" :booksList="sysLib"></book-swiper>
		<bottom-modal v-if="showModal" @confirm="tapConfirm" @cancel="tapCancel"></bottom-modal>

	</view>

</template>

<script>
	import NavBar from '../../components/navbar/NavBar.vue'
	import BookSwiper from './childComp/BookSwiper.vue'
	import BottomModal from './childComp/BottomModal.vue'
	// import {addbook, renderSBInfo} from './books.js'
	
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	
	export default {
		name: "books",
		components: {
			NavBar,
			BookSwiper,
			BottomModal
		},
		data() {
			return {
				showModal: false
			}
		},
		computed: {
			...mapGetters(['sysLib'])
		},
		methods: {
			...mapActions(['initLibInfo','addBook']),
			
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
				uni.showLoading({
						title: '添加中……',
						mask: true
					});
				this.addBook(book_name).then(() => {
					uni.hideLoading();
					uni.showToast({
						title: '添加成功'
					});					
				})				
			}

		},
		created() {
			//获取书库信息
			this.initLibInfo()
		},
		mounted(){
			console.log(this.sysLib)
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
