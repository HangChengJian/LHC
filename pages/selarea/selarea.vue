<!--精选专区-->
<template>
	<view class="con">
		<!--搜索-->
		<view class="w-690 h-60  mt-12  m-0-a dp-f ai-c  searchbox">
			<image src="../../static/icon/search.png" class="w-26 h-26 pl-30"></image>
			<view class="pl-30 fs-26 color-9e">
				搜索品牌内商品
			</view>
		</view>
		<!--香水列表-->
		<view class="mt-40 ml-30 mb-40">
			<scroll-view :scroll-x="true">
				<view  class="dp-f" >
					<view class="w-120 dp-f jc-c mr-40" style="flex-flow: column;" v-for="(i,index) in xslist">
						<view class="w-120 h-120"><image src="../../static/test/xs.png" class="w-120 h-120"></image></view>
						<view class="fs-26 mt-20 m-0-a" style="color: #151515;">{{i.title}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!--商品-->
		<view>
			<classtit></classtit>
		</view>
	</view>
</template>

<script>
	import classtit from '@/components/classtit/classtit.vue'
	export default {
		components: {
			classtit
		},
		data() {
			return {
				xslist:[
					{
						id:1,
						title:'商业香'
					},
					{
						id:2,
						title:'沙龙香'
					},
					{
						id:3,
						title:'小众香'
					},
					{
						id:4,
						title:'香水合集'
					},
					{
						id:5,
						title:'试管套盒'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style  lang="scss">
// scroll-view 下拉条隐藏
::-webkit-scrollbar{
	width: 0;
	height: 0;
	color: transparent;
	display:none;
}
.searchbox {
	background-color: #F8F8F8;
}
</style>
