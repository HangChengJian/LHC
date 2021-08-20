<template>
	<view class="">
		<view class="sn-box dp-f ai-c jc-sb">
			<view class="dp-f fd-c jc-sb">
				<view class="fs-22  c-15">{{ item.createTime }}</view>
				<view class="fs-22 color-9">订单号：{{ item.orderSn }}</view>
			</view>
			<view class="dp-f ai-c">
				<view class="fs-22 color-15">{{ $orderStatus(item.status) }}</view>
				<view class="ml-22 iconfont c-333 pl-22 delete-icon" @click="delOrder">&#xe655;</view>
			</view>
		</view>
		<view><order-item v-for="(data, index) in item.orderItemList" :key="index" :item="data" :orderId="item.id"></order-item></view>
		<view class="dp-f ai-c jc-sb h-80 bg-fff bs-bb p-0-30">
			<view class="w-20"></view>
			<view class="dp-f ai-c">
				<text class="fs-26 color-6">实付款：</text>
				<text class="fs-30 fw-b">￥{{ item.payAmount }}</text>
			</view>
		</view>
		<view class="dp-f jc-sb  bg-fff  p-0-30 pt-20 pb-30" style="border-top: 1px solid #EAEAEA;">
			<view class="w-20"></view>
			<view class="dp-f ai-c bs-bb" v-if="item.status == 4">
				<view class="w-120 h-48 lh-48 ta-c bd-9 fs-24 bs-bb color-6" @click="orderDetails">查看订单</view>
				<!-- <view class="w-120 h-48 lh-48 ta-c bd-9 fs-24 mr-20 bs-bb" @click="lockWl">查看物流</view> -->
				<!-- <view class="w-120 h-48 lh-48 ta-c bd-9 fs-24 bs-bb">去评价</view> -->
			</view>
			<view class="dp-f ai-c bs-bb" v-if="item.status == 0">
				<view class="w-120 h-48 lh-48 ta-c bd-9 fs-24 mr-20" @click="cancelUserOrder">取消订单</view>
				<view class="w-120 h-48 lh-48 ta-c  fs-24 bg-000 color-fff" @click="payOrder">立即付款</view>
			</view>
			<view class="dp-f ai-c bs-bb" v-if="item.status == 1 || item.status == 3">
				<!-- <view class="w-120 h-48 lh-48 ta-c bd-9 fs-24 mr-20 color-6">提醒发货</view>
				<view class="w-120 h-48 lh-48 ta-c bd-9 fs-24 bs-bb color-6">修改地址</view> -->
				<view class="w-120 h-48 lh-48 ta-c bd-9 fs-24 bs-bb color-6" @click="orderDetails">查看订单</view>
			</view>
			<view class="dp-f ai-c bs-bb" v-if="item.status == 2">
				<!-- <view class="w-120 h-48 lh-48 ta-c bd-9 fs-24 mr-20 color-6">申请售后</view> -->
				<view class="w-120 h-48 lh-48 ta-c bd-9 fs-24 mr-20 bs-bb" @click="lockWl">查看物流</view>
				<view class="w-120 h-48 lh-48 ta-c  fs-24 bg-000 color-fff" @click="confirmOrder">确认收货</view>
				<!-- <view class="w-120 h-48 lh-48 ta-c bd-9 fs-24 bs-bb color-6" @click="orderDetails">查看订单</view> -->
			</view>
		</view>
	</view>
</template>

<script>
import orderItem from '@/components/orderItem/orderItem';
export default {
	components: { orderItem },
	props: {
		item: {
			type: Object
		},
		orderIndex: {
			type: Number
		},
		swiperIndex: {
			type: Number
		}
	},
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	onShow() {},
	watch: {},
	computed: {},
	methods: {
		//查看物流
		lockWl() {
			uni.navigateTo({
				url: '/pages/logistics/logistics?orderId=' + this.item.id
			});
		},
		//确认收货
		confirmOrder() {
			const parameter = {
				index: this.orderIndex,
				swiperIndex: this.swiperIndex,
				type: 3
			};
			uni.showModal({
				title: '提示',
				content: '请确定收货完成',
				success: (res)=> {
					if (res.confirm) {
						this.$http.confirmOrder({ orderId: this.item.id }).then(res => {
							uni.showToast({
								title: '确认成功'
							});
							this.$emit('changeOrder', parameter);
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 查看订单
		orderDetails() {
			uni.navigateTo({
				url: '/pagesA/orderstatus/orderunpaid?orderId=' + this.item.id
			});
		},
		//删除订单
		delOrder() {
			const parameter = {
				index: this.orderIndex,
				swiperIndex: this.swiperIndex,
				type: 1
			};
			this.$http.deleteOrder({ orderId: this.item.id }).then(res => {
				console.log(res.data);
				if (res.data.code !== 200) {
					uni.showToast({
						title: '无法删除此类型订单',
						icon: 'none'
					});
					return;
				}
				this.$emit('changeOrder', parameter);
			});
		},
		// 立即支付
		payOrder() {
			uni.navigateTo({
				url: '/pages/wxpay/wxpay?id=' + this.item.id + '&payNum=' + this.item.payAmount
			});
		},
		// 取消订单
		cancelUserOrder() {
			const parameter = {
				index: this.orderIndex,
				swiperIndex: this.swiperIndex,
				type: 2
			};
			this.$http.cancelUserOrder({ orderId: this.item.id }).then(res => {
				console.log(res.data);
				this.$emit('changeOrder', parameter);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.sn-box {
	width: 100%;
	height: 104rpx;
	background: #fff;
	margin-top: 14rpx;
	box-sizing: border-box;
	padding: 20rpx 30rpx;
	border-bottom: 1px solid #eaeaea;
}
.delete-icon {
	position: relative;
	&::after {
		content: '';
		height: 22rpx;
		position: absolute;
		left: 0;
		top: 6rpx;
		width: 2rpx;
		background: #333;
	}
}
</style>
