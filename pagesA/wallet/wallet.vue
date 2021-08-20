<!--钱包-->
<template>
	<view class="con">
		<view class="w-750 h-217 btss dp-f ai-c">
			<view class="ml-30">
				<view class="fw-b fs-48 c-15">￥0.00</view>
				<view class="fs-28 mt-10" style="color: #707070;">人民币账户余额</view>
			</view>
		</view>
		<view class="w-750 h-106 dp-f ai-c jc-sb" style="background: #F8F8F8;">
			<view class="c-15 fs-28 ml-30">可提现余额（元）</view>
			<view class="fw-b fs-36 mr-30">￥0.00</view>
		</view>
		<view class="w-750 h-120 bbss dp-f ai-c jc-sb" @click="balacheck">
			<view class="fs-28 c-15  ml-30">账户余额明细</view>
			<view class="iconfont mr-30">&#xe62b;</view>
		</view>
		<view class="w-750 h-120 bbss dp-f ai-c jc-sb" @click="addcheck">
			<view class="fs-28 c-15  ml-30">添加提现银行卡</view>
			<view class="iconfont mr-30">&#xe62b;</view>
		</view>
		<!--按钮-->
		<view class="w-690 h-100 bg-222 m-0-a dp-f ai-c jc-c" style="margin-top:721rpx; margin-bottom:80rpx;">
			<view class="w-26 h-28 mb-6"><image src="../../static/user/wallet.png" class="w-26 h-28"></image></view>
			<view class="c-fff fs-32 ml-6">提现</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//账户余额明细
			balacheck () {
				uni.navigateTo({
					url: '/pagesA/wallet/balacedet',
				});
			},
			// 银行卡
			addcheck () {
				uni.navigateTo({
					url: '/pagesA/wallet/addbkcd',
				});
			},
		}
	}
</script>

<style lang="scss">
.btss{
	 border-top: 1px solid #EAEAEA;
}
.bbss{
	 border-bottom: 1px solid #EAEAEA;
}
</style>
