<template>
	<view class="w-240 h-250 brand-box">
		<image :src="item.logoUrl" mode="" class="w-200 h-160 fs-0"></image>
		<view class="color-333 fs-30  ta-c pt-22 pb-20 brand-name fw-b">
			{{item.title}}
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
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
	.brand-name{
		// font-family: "kt";
	}
	.brand-box{
		box-sizing: border-box;
		padding: 10rpx 20rpx 20rpx 20rpx;
		font-size: 0;
		background-color: #fff;
	}
</style>
