<template>
	<view class="bg_image">
		<avatar></avatar>
		<view class="home_middle">
			<sign-in v-if="!isSign"></sign-in>
			<background-desc v-else :bg_decs="bg_decs"></background-desc>
		</view>
		<home-botton class="home_btn"></home-botton>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import Avatar from './childComp/Avatar.vue';
	import SignIn from './childComp/SignIn.vue';
	import BackgroundDesc from './childComp/BackgroundDesc.vue';
	import HomeBotton from './childComp/HomeBotton.vue';
	import TabBar from './childComp/TabBar.vue';
	
	export default {
		data() {
			return {
				title: 'Hello',
				isSign: false,
				bg_decs: {}
			}
		},
		components: {
			Avatar,
			SignIn,
			BackgroundDesc,
			HomeBotton,
			TabBar
		},
		onLoad() {
			// console.log("首页加载完毕")
			// this.checkLogin()
		},
		methods: {

		}
	}
</script>

<style>
	.home_middle {
		position: absolute;
		top: 20%;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.home_btn {
		position: absolute;
		top: 70%;

	}
</style>
