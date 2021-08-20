<template>
	<view class="bs-bb ">
		<view class="p-0-30">
			<view class="dp-f ai-c pt-30">
				<!-- <image src="../../static/icon/icon-02.png" class="w-88 h-88 br50"></image> -->
				<view class="fs-40 fw-b pl-20">
					用户妹妹没
				</view>
			</view>
			<view class="w100 h-280  mt-30 pt-r bg-lg">
				<image src="../../static/user/yz.png" class="w-258 h-280 bg-yz"></image>
				<view class="w-170 h-60 lh-60 fs-32 color-d0 bd-d0 ta-c jf-btn" @click="$outerHref('/pagesB/porecord/porecord')">
					积分记录
				</view>
				<view class="user-num-box">
					<view class="fs-40 lh-40 color-d0">可用积分</view>
					<view class="fs-50 color-d0">200</view>
					<view class="dp-f jc-sb ">
						<view class="dp-f ai-c" @click="$outerHref('/pagesB/checkrule/checkrule')">
							<text class="fs-26 lh-26 color-fff iconfont ">&#xe62a;</text>
							<view class="fs-26 color-fff ml-10">
								积分规则
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 导航栏 -->
		<navTab ref="navTab" :isBorder='isBorder' :borderW='borderW' :tabTitle="tabTitle" :paddingB="paddingB" :paddingT="paddingT"
		 @changeTab='changeTab' :fontSize='fontSize' :activeColor='activeColor' :textColor='textColor'></navTab>
		<!-- 花积分 -->
		<view class="bs-bb p-0-30" v-show='!currentTab'>
			<view class="fs-40 fw-b pt-40">
				积分兑换优惠券
			</view>
			<view class="dp-f fw-w jc-sb">
				<view class="ticket-box" v-for='item in 4'>
					<view class="min-box">
						<view class="h100 dp-f dp-fc w-142">
							<view class="dp-f ai-bl">
								<view class="fs-30 fw-b lh-30">
									￥
								</view>
								<view class="fs-88 fw-b lh-88">
									99
								</view>
							</view>
						</view>
						<view class="dp-f fd-c jc-sb h100 p-20-0 bs-bb">
							<view class="lh-26">
								<text class="fs-26 color-d0 lh-26">1000</text>
								<text class="fs-26 c-15 lh-26">积分</text>
							</view>
							<view class="fs-26 c-15 lh-26">
								无门槛优惠券
							</view>
							<view class="w-146 h-30 lh-30 color-d0 fs-22 bg-000 ta-c">
								立即兑换
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fs-40 fw-b pt-30">
				积分兑换商品
			</view>
			<view class="dp-f fw-w jc-sb ">
				<view v-for="item in 9" style="margin: 20rpx 0;">
					<goods-module :type='2'></goods-module>
				</view>
			</view>
		</view>
		<!-- 领积分 -->
		<view class="bs-bb " v-show='currentTab'>
			<view class="fs-40 fw-b pt-40 pt-10 p-0-30" >
				积分任务
			</view>
			<view class="mission-list dp-f ai-c jc-sb h-140 p-0-30" v-for='(item,index) in missionList' :key='index' :class="{bdNone:index==missionList.length-1}">
				<view class="dp-f ai-c">
					<view class="w-80 h-80 br50 bg-f6 dp-f jc-c ai-c">
						<image :src="item.icon" class="w-36 h-36"></image>
					</view>
					<view class="dp-f fd-c jc-sb pl-30">
						<view class="fs-30 fw-b">
							{{item.title}}
						</view>
						<view class="fs-26 color-15">
							{{item.desc}}
						</view>
					</view>
				</view>
				<view class="w-142 h-60 lh-60 ta-c fs-26 c-fff bg-000" @click="$outerHref('/pagesB/report/report')">
					{{item.btnText}}
				</view>
			</view>
			<view class="h-108"></view>
		</view>
		<shade v-show='shwoPop'>
			<view class="dp-f fd-c ai-c">
				<view class="w-580 h-730 bg-fff dp-f fd-c ai-c">
					<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/images/newWx/bi.png" class="w-240 h-240 mt-90 mb-60"></image>
					<view class="fs-26 c-15">
						抱歉，您的积分不足
					</view>
					<view class="fs-26 c-999 mt-29">
						现有积分：100
					</view>
					<view class="fs-26 c-999 mt-10">
						所需积分：600
					</view>
					<view class="w-440 h-80 lh-80 ta-c c-fff bg-000 mt-30">
						赚取积分
					</view>
				</view>
				<view class="fs-50 c-fff iconfont" style="margin-top: 80rpx;" @click="shwoPop = false">
					&#xe602;
				</view>
			</view>
		</shade>
	<!-- 	<view class="pop-box dp-f dp-fc" >
			<view class="dp-f fd-c ai-c">
				<view class="w-580 h-730 bg-fff dp-f fd-c ai-c">
					<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/images/newWx/bi.png" class="w-240 h-240 mt-90 mb-60"></image>
					<view class="fs-26 c-15">
						抱歉，您的积分不足
					</view>
					<view class="fs-26 c-999 mt-29">
						现有积分：100
					</view>
					<view class="fs-26 c-999 mt-10">
						所需积分：600
					</view>
					<view class="w-440 h-80 lh-80 ta-c c-fff bg-000 mt-30">
						赚取积分
					</view>
				</view>
				<view class="fs-50 c-fff iconfont" style="margin-top: 80rpx;" @click="shwoPop = false">
					&#xe602;
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import navTab from '@/components/navTab/navTab'
	import goodsModule from '@/components/goodsModule/goodsModule'
	import shade from '@/components/shadeBox/shade.vue'
	export default {
		components: {
			navTab,
			goodsModule,
			shade
		},
		data() {
			return {
				missionList: [{
						icon: require("../../static/point/point5.png"),
						title: '签到',
						desc: '签到一次可获得4积分',
						btnText: '去签到'
					},
					{
						icon: require('../../static/point/point4.png'),
						title: '消费',
						desc: '消费1.00元可获得1积分',
						btnText: '去下单'
					},
					{
						icon: require('../../static/point/point1.png'),
						title: '关注公众号',
						desc: '关注公众号可获得60积分',
						btnText: '去关注'
					},
					{
						icon: require('../../static/point/point3.png'),
						title: '每日分享页面',
						desc: '分享页面得10积分',
						btnText: '去分享'
					},
					{
						icon: require('../../static/point/point2.png'),
						title: 'Beautinow主站购物',
						desc: '主站消费1.00元可获得1积分',
						btnText: '去主站'
					},
				],
				tabTitle: ['花积分', '领积分'],
				currentTab: 0,
				activeColor: '#D0BC85',
				textColor: "#151515",
				fontSize: '40',
				paddingT: 50,
				paddingB: 12,
				borderW: 120,
				isBorder: true,
				shwoPop:true
			}
		},
		onLoad() {},
		onShow() {},
		watch: {},
		computed: {},
		methods: {
			changeTab(index) {
				this.currentTab = index;
			},
			xx(){
				uni.chooseAddress({
				  success(res) {
				    console.log(res.userName)
				    console.log(res.postalCode)
				    console.log(res.provinceName)
				    console.log(res.cityName)
				    console.log(res.countyName)
				    console.log(res.detailInfo)
				    console.log(res.nationalCode)
				    console.log(res.telNumber)
				  }
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.bg-lg{
		background: linear-gradient(to bottom,#292929,#090909);
	}
	.pop-box{
		width: 100vw;
		height: 100vh;
		position: fixed;		
		background: rgba(0, 0, 0, 0.7);
		z-index: 999;
		top: 0;
		left: 0;
		
	}
	.mission-list {
		border-bottom: 1px solid #EAEAEA;
	}

	.bdNone {
		border: none !important;
	}

	.ticket-box {
		width: 330rpx;
		height: 185rpx;
		box-sizing: border-box;
		border: 6rpx solid #222222;
		padding: 4rpx;
		margin: 20rpx 0;

		.mission-list {
			height: 140rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
		}

		.min-box {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			border: 2rpx solid #222222;
			display: flex;
			align-items: center;

		}
	}

	.user-num-box {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 100;
		box-sizing: border-box;
		padding: 40rpx 36rpx 50rpx 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.jf-btn {
		position: absolute;
		right: 50rpx;
		bottom: 48rpx;
		z-index: 900;
	}

	.bg-yz {
		position: absolute;
		right: 72rpx;
	}
</style>
