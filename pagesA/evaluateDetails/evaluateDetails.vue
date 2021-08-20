<template>
	<view class="bs-bb ">
		<view class="pt-30 pb-30 pl-30 pr-30 bb-ea ">
			<view class="dp-f">
				<image src="https://source.unsplash.com/random" class="w-260 h-260"></image>
				<view class="h-80 t-ohs fs-28 color-15 f-1 pl-20" style="padding-top: 25rpx;">
					38女神节GUCCI 古驰 花之舞淡
					香 等等等等等等等等等等等等等等等等等等等等
				</view>
			</view>
			<view class="dp-f pt-30 ai-c">
				<text class="fs-28 c-15 fw-b pr-10">商品评价</text>
				<text class="iconfont color-6 ml-20">&#xe622;</text>
				<text class="iconfont color-b2 ml-20">&#xe622;</text>
				<text class="iconfont color-b2 ml-20">&#xe622;</text>
				<text class="iconfont color-b2 ml-20">&#xe622;</text>
				<text class="iconfont color-b2 ml-20">&#xe622;</text>
			</view>
			<view class="c-999 fs-26 mt-20" >
				哒哒哒哒哒哒多多多多多多多多多多多多多多多多多多多多多多
			</view>
			<view class="dp-f ai-c jc-sb fw-w">
				<view class="mt-20 pt-r" v-for='item in 4' @click="previewImg">
					<image src="https://source.unsplash.com/random" class="w-200 h-200"></image>
				</view>
				<view class="w-196 h-196">

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import  from '@/components/'
	export default {
		components: {
		},
		data() {
			return {
			}
		},
		onLoad() {},
		onShow() {},
		watch: {},
		computed: {},
		methods: {
		},
	}
</script>

<style lang="scss" scoped>
	
</style>
