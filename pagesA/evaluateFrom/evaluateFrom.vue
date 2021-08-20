<template>
	<view class="bs-bb ">
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
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
			<view class="bg-f7 bs-bb mt-20 mb-10 " style="padding: 30rpx;">
				<textarea class="c-999 fs-26  h-280 w100 " maxlength='400' placeholder-style="#999999"
					placeholder="请输入要评价的内容，不要超过400字。" />

			</view>
			<view class="dp-f ai-c mt-20 jc-sb fw-w">
				<view class="mt-20 pt-r" v-for='item in 4' @click="previewImg">
					<image src="https://source.unsplash.com/random" class="w-196 h-196"></image>
					<image src="../../static/icon/clear.png" class="w-30 h-30 img-clear" @click.stop="clearImg"></image>
				</view>

				<view class="uploading-box  dp-f fd-c ai-c">
					<image src="../../static/icon/xiangji.png" class="w-60 h-60" style="margin-top: 62rpx;"></image>
					<text class="color-9 fs-24 mt-16">上传照片</text>
				</view>
				<view class="w-196 h-196">

				</view>
			</view>
			<view class="color-9 fs-24 pt-20">
				共<text class="fw-b color-15">0</text>张，还能上传<text class="fw-b color-15">6</text>张
			</view>
		</view>
	</view>
</template>

<script>
	// import  from '@/components/'
	import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
	export default {
		components: {
			cusPreviewImg
		},
		data() {
			return {
				ImgList: ['../../static/icon/xiangji.png', 'https://source.unsplash.com/random'] // 图片列表
			}
		},
		onLoad() {},
		onShow() {},
		watch: {},
		computed: {},
		methods: {
			previewImg(url) { // 点击预览图片
				this.$refs.cusPreviewImg.open('../../static/icon/xiangji.png') // 传入当前选中的图片地址
			},
			clearImg(){
				console.log('xxx')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.uploading-box {
		width: 196rpx;
		height: 196rpx;
		border: 1px dashed #b9b9b9;
		background: #F7F7F7;
	}

	.img-clear {
		position: absolute;
		top: -12rpx;
		left: -13rpx;
	}
</style>
