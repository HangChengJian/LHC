<!--支付-->
<template>
	<view class="con">
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<view class="w-160 h-160 m-0-a " style="padding-top:100rpx;">
			<image src="../../static/icon/wxpay.png" class="w-160 h-160"></image>
		</view>
		<view class="fs-40 mt-20 ta-c">需支付</view>
		<view class="fs-43 ta-c mt-60 mb-60" style="color: red;">￥{{payNum}}</view>
		<button type="primary" class="payBtn" @click="weixinPay">微信支付</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:'',//订单id
				payNum:'',//支付价格
			}
		},
		onLoad(e) {
			console.log('订单id',e)
			this.orderId = e.id
			this.payNum = e.payNum
		},
		methods: {
			// 微信支付
			weixinPay(){
				this.$refs.loading.open();
				const paymentData = {
					timeStamp: '',
					nonceStr: '',
					package: '',
					signType: 'MD5',
					paySign: ''
				}
				this.$http.wechatPay({id:this.orderId}).then(res=>{
					const paymentData = res.data.data
					console.log('res',paymentData)
					// paymentData.nonceStr = Data.nonceStr
					// paymentData.timeStamp = Data.timeStamp
					// paymentData.package = Data.package
					// paymentData.paySign = Data.paySign
					// .toString()
					uni.requestPayment({
						timeStamp: paymentData.timeStamp,
						nonceStr: paymentData.nonceStr,
						package: paymentData.packageValue,
						signType: 'MD5',
						paySign: paymentData.paySign,
						success: (e) => {
							this.$refs.loading.close();
							// uni.showLoading({
							//     title: '支付成功!',
							// 	mask:true
							// });
							this.$http.paySuccess({orderId:this.orderId,payType:2}).then(ret=>{
								uni.redirectTo({
									url: '/pagesA/userOrder/userOrder'
								});
								console.log('ret',ret)
							})

						},
						fail: (e) => {
							this.$refs.loading.close();
							console.log(JSON.stringify(e))
						}
					});
				})
				return
				console.log(paymentData)
				
			}
		}
	}
</script>

<style scoped>
.payBtn{
	width: 660rpx;
	text-align: center;
	font-size: 33rpx !important;
	line-height: 80rpx;
	height: 80rpx;
	/* background: #95ec69; */
	color: #fff;
	margin: 0 auto;
	border-radius: 50rpx;
}
</style>
