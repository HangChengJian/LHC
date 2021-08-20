<template>
	<view class="pop-box dp-f dp-fc">
		<slot></slot>
	</view>
</template>

<script>
	// import  from '@/components/'
	export default {
		components: {},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad(){},
		onShow() {},
		watch:{},
		computed:{},
		methods:{},
	}
</script>

<style lang="scss" scoped>
	.pop-box{
		width: 100vw;
		height: 100vh;
		position: fixed;		
		background: rgba(0, 0, 0, 0.7);
		z-index: 999;
		top: 0;
		left: 0;
	}
</style>
