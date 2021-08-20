<!--积分签到-->
<template>
	<view class="con">
		<!--用户栏-->
		<view class="w-750 h-360 dp-f">
			<view class="c-fff fs-26" style="position: absolute;left: 73rpx;top: 107rpx;">查看签到记录</view>
			<view class="c-fff fs-26 m-0-a" style="position: absolute;left:310rpx;top: 60rpx;">
				<image src="https://source.unsplash.com/random" class="w-130 h-130 br-80"></image>
			</view>
			<view class="c-fff fs-26" style="position: absolute;left: 519rpx;top: 107rpx;">积分签到规则</view>
			<view class="c-fff fs-26" style="position: absolute;top: 220rpx;left:274rpx;">我的总积分：100</view>
			<!-- <image src="../../static/user/pointbg.png " class="w-750 h-360"></image> -->
		</view>
		<!--日历-->
		<view class="w-630 h-482" style="position: absolute;top: 320rpx;left: 60rpx;">
			<!--月份-->
			<view class="w100 h-80 datebox dp-f ai-c jc-c color-fff fs-32">2021年3月</view>
			<!--日期-->
			<view class="w100 h-402 bg-fff dtcont fs-26 c-15 dp-f lh-31">
				<view class="w-610 h-77 m-0-a dp-f fw-w mt-20">
					<view class="w-99"></view><view v-for="item in 31" style="margin-left:80rpx;line-height: 60rpx;">1</view>
				</view>
			</view>
		</view>
		<view class="w-749 h-659 bg-fff">
			<view class="m-0-a ta-c c-666 fs-26" style="padding-top: 482rpx;">您已连续签到xx天</view>
			<view class="w-480 h-70 m-0-a c-fff dp-f jc-c ai-c fs-30 mt-20 br-2" style="background: linear-gradient(180deg, #F3D9A4 0%, #CDAE62 100%);" @click="signin">
				立即签到
			</view>
		</view>
		<!--优惠券-->
		<view class="w100 mt-14 bg-fff">
			<view class="fs-30 c-15 ta-c pt-40">2021.01.30-2021.05.30连续签到有奖励</view>
			<view class="w100 dp-f fw-w" style="justify-content: space-evenly;">
				<view class="w-330 h-160 datebox dp-f mt-30" v-for="item in 4">
					<view class="ml-28">
						<view class="fs-26 pt-20" style="color: #ab8324;">连续签到7天</view>
						<view class="fs-26 mt-6" style="color: #ab8324;">积分X2</view>
						<view class="w-110 h-30 fs-22 dp-f ai-c jc-c mt-10" style="color: #f3ddae; background:#ab8324;">立即领取</view>
					</view>
					<view class="mt-28"><image src="../../static/user/pointpou.png" class="w-150 h-140"></image></view>
				</view>
			</view>
		</view>
		<!--弹框-->
		<shade v-show='shwoPop'>
			<view class="dp-f fd-c ai-c">
				<view class="w-580 h-730 bg-fff dp-f fd-c ai-c">
					<view class="w-580 h-680 bg-fff dp-f fd-c ai-c">
						<view class="w-580 h-257">
							<view class="c-fff fs-40 w-580 ta-c" style="position: absolute;margin-top: 79rpx;">签到成功</view>
							<view class="c-fff fs-26 w-580 ta-c" style="position: absolute; margin-top: 180rpx;">已领取的奖励可前往个人中心查看</view>
							<image src="../../static/user/pointbg.png" class="w-580 h-257"></image>
						</view>
						<view class="w-440 h-80 m-0-a c-fff fs-32 dp-f jc-c ai-c " style="background: linear-gradient(180deg, #F1D6A0 0%, #CDAF63 100%);margin-top:262rpx;">前往查看</view>
					</view>
				</view>
				<view class="fs-50 c-fff iconfont" style="margin-top: 80rpx;" @click="shwoPop = false">
					&#xe602;
				</view>
			</view>
		</shade>
		<view class="mt-50 mb-20 c-999 fs-24 ta-c">没有更多了</view>
	</view>
</template>

<script>
	// import  from '@/components/'
	import shade from '@/components/shadeBox/shade.vue'
	export default {
		components: {
			shade
		},
		data() {
			return {
				title: 'Hello',
				shwoPop: true
			}
		},
		onLoad(){},
		onShow() {},
		watch:{},
		computed:{},
		methods:{
			// 立即签到
			signin(){
				console.log('xx')
				this.shwoPop = true
			}
		},
	}
</script>

<style lang="scss" >
	page{
		background: #f6f6f6;
	}
	.datebox{
		background: linear-gradient(180deg, #F3D9A4 0%, #CDAE62 100%);
		box-shadow: 0px 3px 6px rgba(182, 182, 182, 0.16);
		border-radius: 2px 2px 0px 0px;
	}
	.dtcont{
		box-shadow: 0px 3px 6px rgba(182, 182, 182, 0.16);
		border-radius: 0px 0px 2px 2px;
	}
</style>
