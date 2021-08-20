<template>
	<view class="evaluate">
		<view class="nav-fd-box">
			<!-- 导航栏 -->
			<navTab ref="navTab" :isBorder='isBorder' :borderW='borderW' :tabTitle="tabTitle" :paddingB="paddingB" :paddingT="paddingT"
			 @changeTab='changeTab' :isLeftBorder='true' :fontSize='fontSize' :activeColor='activeColor' :textColor='textColor'></navTab>
		</view>
		<view class="h-76"></view>
	<!-- 	<view class="w-750 h-106" style="border-bottom: 1px solid #EAEAEA;border-top: 1px solid #EAEAEA;">
			<view class="c-15 fs-24 pt-20 ml-30">2020-01-30</view>
			<view class="c-999 fs-24 ml-30">订单号：123456789034567</view>
		</view> -->
		<view class="goods-box" v-for='item in 5'>
			<image src="https://source.unsplash.com/random" class="w-260 h-260"></image>
			<view class="h100 f-1 pl-20">
				<view class="h-80 t-ohs fs-28 color-15 " style="padding-top: 55rpx;">
					38女神节GUCCI 古驰 花之舞淡
					香 等等等等等等等等等等等等等等等等等等等等
				</view>
				<view class="dp-f w100 jc-fe mt-60">
					<view class="w-160 h-70 lh-70 ta-c c-fff fs-28 bg-000" >
						去评价
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="dp-f fd-c ai-c">
			<image src="https://source.unsplash.com/random" class="w-319 h-319 mt-260"></image>
			<view class="fs-32 c-15 mt-70">
				暂无评价
			</view>
			<view class="fs-28 c-999 mt-20">
				快去添加评价吧~
			</view>
			<view class="w-355 h-82 lh-82 ta-c c-fff fs-28 bg-000 mt-124" >
				去评价
			</view>
		</view> -->
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
				tabTitle: ['待评价', '已评价'],
				currentTab: 1,
				activeColor: '#080808',
				textColor: "#666666",
				fontSize: '30',
				paddingT: 20,
				paddingB: 10,
				borderW: 90,
				isBorder: true,
			}
		},
		onLoad(){},
		onShow() {},
		watch:{},
		computed:{},
		methods:{
			changeTab(index) {
				this.currentTab = index;
			},
		},
	}
</script>

<style lang="scss" scoped>
	.evaluate{
		padding-bottom: 162rpx;
		.nav-fd-box{
			position: fixed;
			top: 0;
			width: 100%;
			left: 0;
		}
		.goods-box{
			height: 306rpx;
			border-bottom: 1px solid #EAEAEA;
			box-sizing: border-box;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
		}
	}
	
</style>
