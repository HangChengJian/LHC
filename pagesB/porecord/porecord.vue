<!--积分记录-->
<template>
	<view class="">
		<!--我的积分-->
		<view class="w-750 h-320" style="background: #f4f4f4;">
			<view class="dp-f jc-c">
				<view class="fw-b fs-90 " style="position: absolute;color: #D0BC85;top: 60rpx;">200</view>
				<view class="c-666 fs-26" style="position: absolute; top: 190rpx;">我的积分</view>
			</view>
			<view class="dp-f jc-c"><image src="../../static/test/pointbg.png" class="w-497 h-320"></image></view>
		</view>
		<!-- 导航栏 -->
		<navTab ref="navTab" :isBorder='isBorder' :borderW='borderW' :tabTitle="tabTitle" :paddingB="paddingB" :paddingT="paddingT"
		 @changeTab='changeTab' :fontSize='fontSize' :activeColor='activeColor' :textColor='textColor'></navTab>
		<!--全部-->
		<view class="w-750" v-show='currentTab'>
			<view class="w-750 h-126 dp-f ai-c jc-sb" style="border-bottom: 1px solid #EAEAEA;" v-for="item in 7">
				<view>
					<view class="color-15 fs-32 fw-b  ml-30">每日签到获取</view>
					<view class="c-999 fs-26 mt-4 ml-30">2021-03-01 01：30：59</view>
				</view>
				<view class="fs-32 mr-30 fw-b" style="color: #d0bc85;">+4积分</view>
			</view>
		</view>
		<!--获取-->
		<view class="w-750"  v-show='currentTaba'>
			<view class="w-750 h-126 dp-f ai-c jc-sb" style="border-bottom: 1px solid #EAEAEA;" v-for="item in 7">
				<view>
					<view class="color-15 fs-32 fw-b  ml-30">签到获取</view>
					<view class="c-999 fs-26 mt-4 ml-30">2021-03-01 01：30：59</view>
				</view>
				<view class="fs-32 mr-30 fw-b" style="color: #d0bc85;">+34积分</view>
			</view>
		</view>
		<!--消耗-->
		<view class="w-750"  v-show='currentTabb'>
			<view class="w-750 h-126 dp-f ai-c jc-sb" style="border-bottom: 1px solid #EAEAEA;" v-for="item in 7">
				<view>
					<view class="color-15 fs-32 fw-b  ml-30">消耗</view>
					<view class="c-999 fs-26 mt-4 ml-30">2021-03-01 01：30：59</view>
				</view>
				<view class="fs-32 mr-30 fw-b" style="color: #d0bc85;">+14积分</view>
			</view>
		</view>
		<!--foot-->
		<view class="c-999 fs-24 ta-c" style="margin-top: 119rpx;">没有更多了</view>
	</view>
</template>

<script>
	import navTab from '@/components/navTab/navTab'
	export default {
		components: {
			navTab
		},
		data() {
			return {
				tabTitle:['全部','获取','消耗'],
				currentTab: 1,
				currentTaba:0,
				currentTabb:0,
				activeColor: '#151515',
				textColor: "#151515",
				fontSize: '30',
				paddingT: 20,
				paddingB: 20,
				borderW: 60,
				isBorder: true,
				shwoPop:true,
			}
		},
		methods: {
			changeTab(index) {
				if(index == 0) {
					this.currentTab = 1,
					this.currentTaba = 0,
					this.currentTabb = 0
				} else if(index == 1){
					this.currentTaba = index,
					this.currentTabb = 0,
					this.currentTab = 0
				} else if(index == 2){
					this.currentTabb = index,
					this.currentTaba = 0,
					this.currentTab = 0
				}
			},
		}
	}
</script>

<style>

</style>
