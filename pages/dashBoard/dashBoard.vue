<template>
	<view class="base-bg-image" >
		<popup @onTap="onTap" :params="popup_params"></popup>
	</view>
</template>

<script>
	import Popup from 'components/popup.vue/Popup.vue';
	export default {		
		data() {
			return {
				popup_params:{
					text: "haha",
					btn:['案件1','按键2']
				}
			}
		},
		components: {
			Popup
		},
		methods:{
			onTap(index){
				console.log(index)
			}
		}
	}
</script>

<style>

</style>
