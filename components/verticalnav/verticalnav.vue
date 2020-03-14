<template>
	<view>
		<view class="VerticalBox">

			<scroll-view class="VerticalNav nav padding-left" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375rpx)">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in booksList" :key="index"
				 @tap="TabSelect" :data-id="index">
					{{item.type}}
				</view>
			</scroll-view>

			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375rpx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="onScroll" id="scroll-r">
				<view class="padding-bottom padding-lr" v-for="(category,index) in booksList" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text>{{category.type}}
						</view>
					</view>
					<view class="cu-list menu-avatar" v-for="(item,index) in category.list" :key="index">
						<view class="cu-item">
							<view class="cu-avatar square lg" >
								<!-- <image :src="'http://192.168.0.105:5230'+ item.cover_img"></image> -->
							</view>
							<view class="content">
								<view class="text-grey">{{item.book_name}}</view>
							</view>
							<view class="action">
								
								<view class="cu-btn bg-olive round shadow btn-text">学习</view>
							</view>
						</view>
					</view>
				</view>
				<view class="bg-white nav-foot">

				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "verticalnav",

		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				booksList: []
			};
		},
		created() {
			this.booksList = uni.getStorageSync('ServerBookList')

			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
				list[i].id = i;
			}
			this.list = list;
			this.listCur = list[0];
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			onScroll(e) {
				// #ifdef MP-ALIPAY,MP-WEIXIN
				return false //支付宝，微信小程序暂时不支持，双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);

						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	.nav-top {
		height: 30rpx;
	}

	.nav-foot {
		height: 30rpx;
		width: 100%;
	}

	.btn-text {
		font-size: 24rpx;
	}

	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200rpx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8rpx;
		height: 30rpx;
		border-radius: 10rpx 0 0 10rpx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0rpx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
		width: 100%;
		padding-top: 20rpx;
	}

	.VerticalMain {
		flex: 1;
	}
</style>
