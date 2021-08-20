<template>
	<view class="content">
		<w-loading text="加载中.." mask="false" click="false" ref="loading"></w-loading>
		<!--付款状态-->
		<view class=" h-170 bg-222 pt-r" v-if="orderInfo.status == 0">
			<view class="iconfont w-26 h-26 c-fff fs-36 pt-a" style="top: 20rpx; left:22rpx">&#xe60f;</view>
			<view class="pt-20 dp-f ml-50 h-40 ai-c"><view class="fs-28 c-fff ml-20">待付款</view></view>
			<view class="mt-10 w-599 c-fff fs-28 dp-f" style="margin-left: 74rpx;">您的订单已提交，请在 {{ xx }} 内完成支付，超时订单自动取消</view>
		</view>

		<view v-if="orderInfo.receiverName">
			<!--地址-->
			<view class=" h-180 bg-fff mt-14">
				<view class="pt-20 dp-f ml-30 h-40 ai-c">
					<view class="iconfont w-20 h-28 ">&#xe603;</view>
					<view class="fs-28 color-15 ml-30 fw-b" style="">{{ orderInfo.receiverName }}</view>
					<view class="fs-28 color-15 ml-8 fw-b">{{ orderInfo.receiverPhone }}</view>
					<view class="fs-28 color-15 ml-8 fw-b">{{ orderInfo.receiverProvince }}</view>
					<view class="fs-28 color-15 ml-8 fw-b">{{ orderInfo.receiverCity }}</view>
					<view class="fs-28 color-15 ml-8 fw-b">{{ orderInfo.receiverRegion }}</view>
				</view>
				<view class="mt-10 w-613 color-15 fs-28" style="margin-left: 80rpx;">{{ orderInfo.receiverDetailAddress }}</view>
			</view>
			<!--订单-->
			<view class="mt-14  bg-fff">
				<!--订单信息-->
				<view class=" h-104 dp-f jc-sb ai-c" style="border: 1px solid #EAEAEA;">
					<view class="ml-35">
						<view class="fs-22 color-15">{{ orderInfo.createTime }}</view>
						<view class="c-999 fs-22 mt-4">订单号: {{ orderInfo.orderSn }}</view>
					</view>
					<!-- 未完成功能 -->
					<!-- <view class="fs-22 color-15 mr-30">联系客服</view> -->
				</view>
				<!--商品列表-->
				<view><order-item v-for="(item, index) in orderInfo.orderItemList" :key="index" :item="item" :islock="true"></order-item></view>
				<!--价格-->
				<view>
					<view class="dp-f jc-sb mt-20">
						<view class="fs-26 c-666 ml-30">商品总价</view>
						<view class="fs-26 c-666 mr-30">￥{{ orderInfo.totalAmount }}</view>
					</view>
					<view class="dp-f jc-sb mt-20">
						<view class="fs-26 c-666 ml-30">运费</view>
						<view class="fs-26 c-666 mr-30">￥{{ orderInfo.shippingAmount }}</view>
					</view>
					<view class="dp-f jc-sb mt-20">
						<view class="fs-26 color-15 fw-b ml-30">实付款</view>
						<view class="fs-26 color-15 fw-b mr-30">￥{{ orderInfo.payAmount}}</view>
					</view>
					<view class="h-20"></view>
				</view>
			</view>

			<!--底部悬浮-->
			<view class=" h-150 bg-fff dp-f ai-c w100" style="position:fixed; bottom:0;" v-if="orderInfo.status == 0">
				<view class="w-172 h-70 bg-fff dp-f jc-c ai-c color-15 " style="border: 2rpx solid #999999;margin-left: 340rpx;box-sizing:border-box;" @click="cancelUserOrder">
					取消订单
				</view>
				<view class="w-172 h-70 c-fff dp-f jc-c ai-c bg-222 ml-30" @click="payOrder">立即付款</view>
			</view>
			<view class=" h-150 bg-fff dp-f ai-c w100" style="position:fixed; bottom:0;" v-if="orderInfo.status == 2">
				<view class="w-172 h-70 bg-fff dp-f jc-c ai-c color-15 " style="border: 2rpx solid #999999;margin-left: 340rpx;box-sizing:border-box;" @click="lockWl">
					查看物流
				</view>
				<view class="w-172 h-70 c-fff dp-f jc-c ai-c bg-222 ml-30" @click="confirmOrder">确认收货</view>
			</view>
			<!--精选商品-->
			<view class=" mt-14 bg-fff">
				<view class="fw-b color-15 fs-38 ta-c" style="padding-top: 60rpx;">更多精选商品</view>
				<view class="mt-20 w-690 m-0-a dp-f fw-w jc-sb">
					<view v-for="(item, i) in gosshop" :key="i" class="mb-60"><goods-module :item="item"></goods-module></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import goodsModule from '@/components/goodsModule/goodsModule.vue';
import orderItem from '@/components/orderItem/orderItem';

var _ordertimer = null;
var data = new Date();
export default {
	components: {
		goodsModule,
		orderItem
	},
	data() {
		return {
			Timer: '',
			xx: '',
			orderInfo: {}, //订单详情
			gosshop: [], //更多精选
			guessParameter: { pageIndex: 1, pageSize: 10 ,type:5},
			isReach: false //更多精选是否无内容
		};
	},
	onLoad(e) {
		console.log(e.orderId);
		this.$http.orderInfo(e.orderId).then(res => {
			this.orderInfo = res.data.data;
			// var time = new Date(this.orderInfo.createTime)
			// console.log(time)
			// console.log(time.getTime())
			this.go(this.orderInfo.endTime);
		});
		this.getguess();
	},
	// 上拉加载
	onReachBottom() {
		//一定时间内禁止重复调用模式
		this.$jiuaiDebounce.canDoFunction({
			key: 'click', //基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
			time: 1000, //如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
			success: () => {
				//成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
				this.getguess();
			}
		});
	},
	methods: {
		//查看物流
		lockWl() {
			uni.navigateTo({
				url: '/pages/logistics/logistics?orderId=' + this.orderInfo.id
			});
		},
		//确认收货
		confirmOrder() {
			uni.showModal({
				title: '提示',
				content: '请确定收货完成',
				success: function(res) {
					if (res.confirm) {
						this.$http.confirmOrder({ orderId: this.orderInfo.id }).then(res => {
							console.log(res.data);
							uni.showToast({
								title: '确认成功'
							});
							this.orderInfo.status = 3;
						});
					}
				}
			});
		},
		// 精选商品
		getguess() {
			if (this.isReach) {
				uni.showToast({
					title: '没有更多内容了',
					icon: 'none'
				});
				return;
			}
			this.$refs.loading.open();
			this.$http.getRecommend(this.guessParameter).then(res => {
				console.log('like', res.data.data.records);
				this.$refs.loading.close();
				if (res.data.data.records.length == 0) {
					this.isReach = true;
					return;
				}
				this.guessParameter.pageIndex++;
				this.gosshop = this.gosshop.concat(res.data.data.records);
			});
		},
		// 立即支付
		payOrder() {
			uni.navigateTo({
				url: '/pages/wxpay/wxpay?id=' + this.orderInfo.id + '&payNum=' + this.orderInfo.totalAmount
			});
		},
		// 取消订单
		cancelUserOrder() {
			this.$http.cancelUserOrder({ orderId: this.orderInfo.id }).then(res => {
				console.log(res.data);
				uni.showToast({
					title: '取消成功'
				});
				this.orderInfo.status = 5;
			});
		},
		leftTimer(enddate) {
			this.Timer = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate() + ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds(); //当前时间
			var leftTime = new Date(enddate) - new Date(); //计算剩余的毫秒数
			var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
			var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10); //计算剩余的小时
			var minutes = parseInt((leftTime / 1000 / 60) % 60, 10); //计算剩余的分钟
			var seconds = parseInt((leftTime / 1000) % 60, 10); //计算剩余的秒数
			days = this.checkTime(days);
			hours = this.checkTime(hours);
			minutes = this.checkTime(minutes);
			seconds = this.checkTime(seconds);
			if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) this.xx = minutes + '分' + seconds + '秒';
			if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
				console.log('关闭订单');
				this.orderInfo.status = 5;
				clearInterval(_ordertimer);
				_ordertimer = null;
			}
		},
		go(v) {
			var date1 = new Date(),
				data2 = new Date(Number(v));
			console.log(date1);
			console.log(data2);
			if (data2 < date1) return; //设置的时间小于现在时间退出
			_ordertimer = setInterval(() => {
				this.leftTimer(data2);
			}, 1000);
		},
		checkTime(i) {
			//将0-9的数字前面加上0，例1变为01
			if (i < 10) {
				i = '0' + i;
			}
			return i;
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f6f6f6;
}
</style>
