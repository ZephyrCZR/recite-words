<template>
	<view class="bnav-content base-bg-color">

		<scroll-view scroll-x class="bg-white nav book-nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(category,index) in booksList" :key="index"
			 @tap="changeSwiperCurrent(index)" :data-id="index">
				{{category.type}}
			</view>
		</scroll-view>

		<swiper :current="tabCur"  class="swiper-content" @change="swiperChange" >
			<swiper-item v-for="(category,index) in booksList" :key="index">
				<scroll-view scroll-y class="swiper-item ">

					<view class="book-card  shadow-warp bg-white margin-top" v-if="category.list.length" v-for="(book,index) in category.list"
					 :key="index" >


						<view class="book-cover shadow">
							<view class="book-cover-img">
								<image src="../../../static/imgs/common2000.jpg" mode="widthFix"></image>
							</view>
						</view>
						<view class="book-desc">
							<text class="book-name base-text-primary base-text-primary ">{{book.book_name}}</text>
							<text class="book-desc-text base-text-sub base-color-sub">{{book.describe}}</text>
							<text class="book-wordsamount base-text-sub base-color-sub">单词量：{{book.amount}}</text>
						</view>
						<view class="book-btn">
							<view class="cu-btn bg-olive round shadow btn-text" 
							@tap="onTapAdd" :data-name="book.book_name" v-show="category.type!=='我的'">
								学习
							</view>
							<view v-show="category.type==='我的'"
							@tap="onTapRemove" :data-name="book.book_name">
								<text class="cuIcon-more"></text>
							</view>
						</view>




					</view>

				</scroll-view>

			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'BookSwiper',
		props: {
			booksList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				tabCur: 0,
				onTouch: false,
			}
		},
		methods: {
			changeSwiperCurrent(index) {
				this.tabCur = index
			},
			//当swiper被翻动时
			swiperChange(e){
				this.tabCur = e.detail.current
			},
			touchstart() {
				this.onTouch = true
			},
			touchend() {
				this.onTouch = false
			},
			onTapAdd(e) {
				this.$emit('selectBook', e.currentTarget.dataset.name)
			},				
			onTapRemove(e) {
				console.log(e.currentTarget.dataset.name)
				this.$emit('removeBook', e.currentTarget.dataset.name)
			}
		}
	}
</script>

<style>
	.card-shadow {
		box-shadow: 3rpx 3rpx 20rpx 2rpx rgba(120,120,120,0.1);
	}
	.book-btn {
		flex:1;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		padding-bottom: 30rpx;
	}

	.book-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.book-wordsamount {
		font-weight: bold;
	}

	.book-desc-text {
		padding-bottom: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.book-cover-img {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.book-desc {
		width: 44%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 20rpx;
	}

	.book-cover {
		flex: 1;
		padding: 20rpx;

	}

	.book-card {
		display: flex;
		height: 260rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		margin: 30rpx;
	}



	.bnav-content {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.swiper-item {
		height: 100%;
	}

	.swiper-content {
		height: calc(100vh - 268rpx)
	}

	.book-nav {
		margin-top: 20rpx;
		box-shadow: 0rpx 3rpx 3rpx 0 rgba(90, 90, 90, 0.1);
		z-index: 999;
	}
</style>
