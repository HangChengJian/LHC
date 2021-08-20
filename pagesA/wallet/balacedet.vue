<!--余额明细-->
<template>
	<view class="con">
		<view class="w-750 h-180" style="background: #F8F8F8;">
			<view class="fw-b fs-48 c-15 pt-32 ta-c m-0-a">￥9.99</view>
			<view class="fs-28 mt-10 ta-c m-0-a" style="color: #707070;">人民币账户余额</view>
		</view>
		<!--导航-->
		<navTab ref="navTab" :isBorder='isBorder' :borderW='borderW' :tabTitle="tabTitle" :paddingB="paddingB" :paddingT="paddingT"
		 @changeTab='changeTab' :fontSize='fontSize' :activeColor='activeColor' :textColor='textColor'></navTab>
		 <!--全部-->
		 <view class="w-750" v-show='currentTab'>
		 	<view class="w-750 h-147 dp-f ai-c jc-sb" style="border-bottom: 1px solid #EAEAEA;" v-for="item in 7">
		 		<view class="ml-30">
		 			<view class="c-15 fs-28 ">充值</view>
		 			<view class="c-999 fs-26 mt-10">2021-01-03</view>
		 		</view>
		 		<view class="fs-30 mr-30 fw-b c-15">+100</view>
		 	</view>
		 </view>
		 <!--获取-->
		<view class="w-750" v-show='currentTaba'>
			<view class="w-750 h-147 dp-f ai-c jc-sb" style="border-bottom: 1px solid #EAEAEA;" v-for="item in 7">
				<view class="ml-30">
					<view class="c-15 fs-28 ">支出</view>
					<view class="c-999 fs-26 mt-10">2021-01-03</view>
				</view>
				<view class="fs-30 mr-30 fw-b c-15">+100</view>
			</view>
		</view>
		 <!--消耗-->
		 <view class="w-750" v-show='currentTabb'>
		 	<view class="w-750 h-147 dp-f ai-c jc-sb" style="border-bottom: 1px solid #EAEAEA;" v-for="item in 7">
		 		<view class="ml-30">
		 			<view class="c-15 fs-28 ">消费</view>
		 			<view class="c-999 fs-26 mt-10">2021-01-03</view>
		 		</view>
		 		<view class="fs-30 mr-30 fw-b c-15">+100</view>
		 	</view>
		 </view>
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
				tabTitle:['全部','充值','消费'],
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
