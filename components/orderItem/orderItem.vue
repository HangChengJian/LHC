<template>
	<view class="h-250 bg-fff dp-f bs-bb order-item" @click="orderDetails">
		<view  class="w-200 h-200 br-10">
			<image :src="item.productPic" mode="" class="w-200 h-200 br-10"></image>
		</view>
		<view class="f-1 pl-20 dp-f fd-c jc-sb bs-bb">
			<view class="t-ohs fs-26 color-333">{{item.productName}}</view>
			<view class="w-500">
				<view class="size-box">规格:{{item.productSkuName}}</view>
			</view>
			<view class="color-15 fs-110 fw-b">￥{{item.productPrice}}</view>
		</view>
	</view>
</template>

<script>
	// import  from '@/components/'
	export default {
		components: {},
		props:{
			item:{
				type:Object
			},
			orderId:{
				type:String
			},
			islock:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad(){},
		onShow() {},
		watch:{},
		computed:{},
		methods:{
			orderDetails() {
				if(this.islock){
					console.log(this.item)
					uni.navigateTo({
						url: '/pages/goodsDetails/goodsDetails?id='+this.item.productId,
					});
				}else{
					uni.navigateTo({
						url: '/pagesA/orderstatus/orderunpaid?orderId='+this.orderId
					});
				}
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.order-item{
		padding: 20rpx 30rpx 30rpx 30rpx;
		border-bottom: 1px solid #EAEAEA;
	}
	.size-box{
		border: 1px solid #E7E7E7;
		font-size: 24rpx;
		padding: 8rpx 10rpx;
		 display:inline-block;
		        display:inline;
		        zoom:1;
	}
</style>
