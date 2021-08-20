<!--全部评价-->
<template>
	<view class="con">
		<cus-previewImg ref="cusPreviewImg" :list="ImgList" />
		<!--tag-->
		<view class="h-106 dp-f ai-c bs-bb pl-30 tag-box" style="border-bottom: 1px solid #F1F1F1;">
			<view class="tag" :class="{'active-tag':index == activeIndex}" v-for='(item,index) in tagList' :key='index' @click="onTag(index)">{{item.title}}</view>
		</view>
		<view class="h-106"></view>
		<!--评论列表-->
		<view v-for="i in 4">
			<view class="dp-f">
				<view class="w-64 h-64 ml-30 mt-45">
					<image src="https://source.unsplash.com/random" class="w-64 h-64 br-100"></image>
				</view>
				<view class="ml-20 mt-30">
					<view class="fs-24 c-333">名字名字</view>
					<view class="fs-22" style="color:#CBCBCB ;">0.2ml</view>
					<view class="fs-22" style="color:#CBCBCB ;">2021-3-1</view>
				</view>
			</view>
			<!--文字评论-->
			<view class="w-672 h-132 m-0-a c-333 fs-24 mt-30">
				文案文案文案文案文案文案文案文案文案文案文案文案文案文案
				文案文案文案文案文案文案文案文案文案文案文案文案文案文案
				文案文案文案文案文案文案文案文案文案文案文案文案文案文案
				文案文案文案文案文案文案文案文案
			</view>
			<!--图片-->
			<view class="w-672 m-0-a mt-30">
				<image src="https://source.unsplash.com/random" class="w-140 h-140 mr-14" v-for='(item,index) in 3'
					@click="previewImg(index)"></image>
			</view>
			<view class="w-750 h-68 mt-30 dp-f jc-fe ai-c" style="border-top: 1px solid #f1f1f1;">
				<view class="fs-20 c-15 mr-40 dp-f ai-c" @click="likes">
					<!-- <image src="../../static/icon/dz.png" class="w-24 h-22 mr-10"></image> -->
					<image src="../../static/icon/likeIcon.png" class="w-24 h-22 mr-10"></image>
					<text>99</text>

				</view>
				<view class="fs-20 c-15 mr-30 dp-f ai-c" @click="comment">
					<image src="../../static/icon/pl.png" class="w-24 h-22 mr-10"></image>
					<text>99</text>
				</view>
			</view>
			<!--二级评论-->
			<view class="mt-30 w-690 h-280 bg-f7 m-0-a pb-20" v-if="comm">
				<view class="w-630 h-139 dp-f ai-c jc-sb m-0-a" style="border-bottom: 1px solid #EDEDED;">
					<view>
						<view class="dp-f ai-c">
							<view class="w-64 h-64 ">
								<image src="https://source.unsplash.com/random" class="w-64 h-64 br-100"></image>
							</view>
							<view class="ml-20 ">
								<view class="fs-24 c-333">名字名字</view>
								<view class="fs-22" style="color:#CBCBCB ;">2021-3-1</view>
							</view>
						</view>
					</view>
					<view>
						<view class="fs-20 c-15  dp-f ai-c" @click="likes">
							<image src="../../static/icon/dz.png" class="w-24 h-22 mr-10"></image>99
						</view>
					</view>
				</view>
				<view class="w-528 h-99 fs-24 c-333 m-0-a mt-20 mb-22">
					文案文案文案文案文案文案文案文案文案文案文案
					文案文案文案文案文案文案文案文案文案文案文案
					文案文案文案文案文案文案
				</view>
				<view class="w100 h-30 bg-fff"></view>
			</view>
			<view class="w-750 h-14" style="background: #F8F8F8;"></view>
		</view>
		<view class="fs-24 c-999 m-0-a ta-c mt-129">没有更多了</view>
	</view>
</template>

<script>
	import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue'
	export default {
		components: {
			cusPreviewImg
		},
		data() {
			return {
				comm: false,
				activeIndex:0,
				tagList:[{title:'全部'},{title:'赞多'},{title:'评论多'},{title:'有图'}],
				ImgListT: ['https://source.unsplash.com/random', 'https://source.unsplash.com/random',
					'https://source.unsplash.com/random'
				],
				ImgList: []
			}
		},
		methods: {
			onTag(index){
				this.activeIndex = index
			},
			comment() {
				this.comm = !this.comm
			},
			previewImg(index) { // 点击预览图片
				this.ImgList = this.ImgListT
				setTimeout(() => {
					this.$refs.cusPreviewImg.open(index) // 传入当前选中的图片地址
				}, 100)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bsbb {}
	.con{
		.tag-box{
			width: 100%;
			position: fixed;
			top: 0;
			background: #fff;
		}
		.active-tag{
			width: 88rpx;
			height: 46rpx;
			line-height: 46rpx;
			text-align: center;
			color: #FFFFFF;
			font-size: 24rpx;
			background: #222222;
			border: 1px solid #222;
		}
	}
	
	.tag{
		width: 88rpx;
		height: 46rpx;
		line-height: 46rpx;
		text-align: center;
		color: #222;
		font-size: 24rpx;
		background: #fff;
		border: 1px solid #222;
		margin-right: 50rpx;
		
	}
</style>
