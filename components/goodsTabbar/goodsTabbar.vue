<template>
	<view class="">
		<view class="goods-tabbar w100 dp-f bs-bb bg-fff jc-sb">
			<view class="dp-f ">
				<view class="dp-f fd-c jc-c ai-c mr-30"  @click="onService">
					<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/images/newWx/tb01.png" mode="" class="w-34 h-34 mr-8 "></image>
					<view class="fs-22 color-5d mt-10">
						客服
					</view>
				</view>
				<view class="dp-f fd-c jc-c ai-c" @click="lockCart">
					<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/images/newWx/tb02.png" mode="" class="w-34 h-34 mr-8 "></image>
					<view class="fs-22 color-5d mt-10">
						购物袋
					</view>
				</view>
			</view>
			<!-- <view class="f-1 h-74 lh-74 ta-c fs-28 bg-d2 color-fff  ml-50" @click="onBtn">
				已售罄
			</view> -->
			<view class="dp-f ai-c">
				<view class="w-250 h-74 lh-74 ta-c fs-28 bg-222 color-fff mr-20 btn-bd-0" @click="onBtn">
					加入购物袋
				</view>
				<view class="w-250 h-74 lh-74 ta-c fs-28 bg-fff color-333 btn-bd"  @click="onBtn">
					立即购买
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
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
			onService(){
				uni.previewImage({
					current: 'https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/xxsx/image/code.jpg', // 当前显示图片的http链接
					urls: ['https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/xxsx/image/code.jpg'] // 需要预览的图片http链接列表
				});
			},
			lockCart(){
				uni.switchTab({
					url:'/pages/goodsCart/goodsCart'
				})
			},
			onBtn(){
				this.$emit('showPop')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.goods-tabbar{
		padding: 20rpx 30rpx 50rpx 30rpx;
		.btn-bd{
			border: 2rpx solid #222;
		}
		.btn-bd-0{
			border: 2rpx solid #222;
		}
	}
</style>
