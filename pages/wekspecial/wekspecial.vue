<!--每周特惠-->
<template>
	<view class="con" :style="{ background: info.backgroundColour }">
		<view class="w100 h-750">
			<image :src="info.coverImage" class="w-750 h-750"></image>
		</view>
		<view class="w100 ta-c" >
			<view class="c-15 fw-b fs-40 m-0-a ta-c pt-50 title-box">{{info.title || ''}}</view>
			<view class="w-690 bg-fff m-0-a" style="margin-top: 51rpx;">
				<!--列表-->
				<view v-for="(item,index) in info.productList" :key='index' @click.stop="lockGoods(item.id)">
					<view class="w-690 dp-f pt-30 fd-r" :class="{'fd-rr':(index+1)%2 !==1 }">
						<view class="w-280 h-280 ml-30" :class="{'ml-none':(index+1)%2 !==1 }">
							<image :src="item.coverImage" class="w-280 h-280"></image>
						</view>
						<view class="w-380 mt-37">
							<view class="fw-b fs-32 c-15 m-0-a ta-c mt-10 t-ohs bs-bb p-0-20">{{item.name}}</view>
							<view class="fs-26 m-0-a ta-c mt-10 t-oh  bs-bb p-0-20" style="color:#424242;">{{item.subTitle}}</view>
							<!-- <view class="fs-26 m-0-a ta-c mt-10" style="color:#424242;">香调/香调/香调</view> -->
							<view class="mt-20 w-180 h-48 c-fff bg-222 dp-f jc-c ai-c fs-24 m-0-a">立即购买</view>
						</view>
					</view>	
				</view>
				<view class="h-30"></view>
			</view>
			<view class="h-154"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				goodsInfo: {},
				activeInfo: {} //选中规格
			};
		},
		onLoad() {
			this.$http.getConfig({ type: 2 }).then(({ data: data }) => {
				this.info = data.data;
				uni.setNavigationBarTitle({
					title: this.info.title // 其他页面传过来的标题名
				});
			});
		},
		onShow() {},
		watch: {},
		computed: {},
		methods: {
			lockGoods(id) {
				uni.navigateTo({
					url: '/pages/goodsDetails/goodsDetails?id=' + id
				});
			},
		}
	};
</script>

<style scoped>
	.title-box{
		display: inline-block;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #151515;
	}
	.ml-none{
		margin-right: 30rpx;
		margin-left: 0 !important;
	}
</style>
