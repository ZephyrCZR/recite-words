<template>
	<view class="top-bar-content">
		<text>{{count}}/{{numbers}}</text>
	</view>
</template>

<script>
	export default {
		name: 'TopBar',
		props: {
			view: {
				type: Object,
				default(){
					return {counter: {learn: 0, review: 0}}
				}
			}
		},
		computed: {
			count() {			
				return this.$store.getters.count(this.view.type==='learn')
			},
			numbers() {
				if(!this.view.counter)return
				
				let num = 100
				console.log(this.view)
				if(this.view.type==='learn') {
					num = this.view.counter.learn
				}else{
					num = this.view.counter.review
				}				
				return this.$store.getters.numbers(num)
			}

		},
	}
</script>

<style>
	.top-bar-content {
		position: absolute;
		top: 6%;
		left: 0;
		padding-left: 30rpx;
	}
</style>
