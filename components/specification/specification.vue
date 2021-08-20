<template>
	<view class="">
		<!-- 规格弹窗 -->
		<popup-layer ref="cartPopupRef" :direction="'top'" :autoClose="true" @closeCallBack='closeCatr'>
			<view class="cart-pop bg-fff w100 ">
				<view class="iconfont color-333 clearIcon fs-22 fw-b pl-40" @tap="closeCatr">&#xe66b;</view>
				<view style="padding: 30rpx;">
					<view class="dp-f pb-15 pb-40">
						<image :src="goodsInfo.coverImage" mode="" class="w-280 h-280 mr-20 "></image>
						<view class="">
							<!-- <view class="fs-32 c-15 fw-b" v-if="activeData.price">￥{{ activeData.price }}</view>
							<view class="fs-32 c-15 fw-b" v-else>￥220—￥33330</view> -->
							<view v-if='goodsInfo.isPackage'>
								<view class="fs-32 c-15 fw-b" >￥{{ goodsInfo.price }}</view>
							</view>
							<view v-else-if='goodsInfo.skuList.length == 1'>
								<view class="fs-32 c-15 fw-b" >￥{{ goodsInfo.skuList[0].price }}</view>
							</view>
							<view v-else>
								<view class="fs-32 c-15 fw-b" v-if="activeInfo.price">￥{{ activeInfo.price }}</view>
								<view class="fs-32 c-15 fw-b" v-else><text v-if='goodsInfo.minPrice'>￥</text> {{ goodsInfo.minPrice }}<text v-if='goodsInfo.minPrice'>~</text> {{ goodsInfo.maxPrice }}</view>
							</view>
							
							<view class="fs-22 color-9b pt-12">{{ goodsInfo.description }}</view>
						</view>
					</view>
					<view class="dp-f fw-w jc-sb" v-if="goodsInfo.isPackage">
						<view class="goods-sizeT fs-28 color-222 h-100 lh-100 dp-f jc-sb" :class="{ bd15: true, ce6: item.stock == 0 }">
							<text>{{ goodsInfo.packageSkuInfo.otherName }}</text>
							<!-- <text>{{ goodsInfo.packageSkuInfo.point }}积分</text> -->
						</view>
					</view>
					<view class="dp-f fw-w jc-sb" v-else-if="goodsInfo.skuList.length == 1">
						<view class="goods-sizeT fs-28 color-222 h-100 lh-100 dp-f jc-sb" :class="{ bd15: true, ce6: item.stock == 0 }">
							<text>{{ goodsInfo.skuList[0].name }}</text>
							<!-- <text>{{ goodsInfo.skuList[0].point }}积分</text> -->
						</view>
					</view>
					<view class="dp-f fw-w jc-sb" v-else>
						<view
							class="goods-sizeT fs-28 color-222 h-100 lh-100 dp-f jc-sb"
							:class="{ bd15: activeIndex == index, ce6: item.stock == 0 }"
							v-for="(item, index) in goodsInfo.skuList"
							:key="index"
							@click="onSize(index, item)"
						>
							<text>{{ item.name }}</text>
							<!-- <text>{{ item.point }}积分</text> -->
						</view>
					</view>
				</view>
				<view class="h-220 w100"></view>
				<view class="btn-box dp-f jc-sb " v-if="btnType">
					<view class="w-330 h-74 lh-74 ta-c fs-28 bg-222 color-fff mr-20 btn-bd-0" @click="onAddCartn">加入购物袋</view>
					<view class="w-330 h-74 lh-74 ta-c fs-28 bg-fff color-333 btn-bd " @click="onBtn">立即购买</view>
				</view>
				<view class="btn-box dp-f " v-else @click="onAddCartn"><view class="w100 h-74 lh-74 ta-c fs-28 bg-222 color-fff  btn-bd-0">加入购物袋</view></view>
			</view>
		</popup-layer>
	</view>
</template>

<script>
import popupLayer from '@/components/popup/popup-layer.vue';
export default {
	components: { popupLayer },
	props: {
		btnType: {
			type: Boolean,
			default: true
		},
		goodsInfo: {
			type: Object,
			default: {}
		},
		activeInfo: {
			type: Object,
			default: {}
		},
	},
	data() {
		return {
			activeIndex: null,
			activeData: {}
		};
	},
	onLoad() {},
	onShow() {},
	watch: {},
	computed: {},
	methods: {
		showPop() {
			this.$refs.cartPopupRef.show(); // 或者 boolShow = rue
		},
		closeCatr() {
			this.$refs.cartPopupRef.close(); // 或者 boolShow = false
			if(this.btnType == false){
				this.activeIndex = null
				this.$emit('emptyInfo')
			}
		},
		onSize(index, item) {
			if (item.stock == 0) {
				return;
			}
			this.activeData = item;
			this.activeIndex = index;
			this.$emit('changeSize', item);
		},
		onAddCartn() {
			let data = {
				productId: this.goodsInfo.id,
				productSkuId: this.goodsInfo.isPackage ? this.goodsInfo.packageSkuInfo.id : this.goodsInfo.skuList.length == 1 ? this.goodsInfo.skuList[0].id : this.activeData.id
			};
			if (!data.productSkuId) {
				uni.showToast({
					title: '请选择规格',
					icon: 'none'
				});
				return;
			}
			this.$http.addCart(data).then(res => {
				console.log(res.data);
				if (res.data.code == 200) {
					uni.showToast({
						title: '加入成功'
					});
					this.closeCatr();
				}
			});
		},
		onBtn() {
			const productSkuId = this.goodsInfo.isPackage
				? this.goodsInfo.packageSkuInfo.id
				: this.goodsInfo.skuList.length == 1
				? this.goodsInfo.skuList[0].id
				: this.activeData.id;
			this.$emit('purchase', productSkuId);
		}
	}
};
</script>

<style lang="scss" scoped>
.cart-pop {
	position: relative;
	box-sizing: border-box;
	.bd15 {
		border: 2rpx solid #151515 !important;
	}
	.ce6 {
		color: #e6e6e6 !important;
	}
	.goods-sizeT {
		margin-top: 15rpx;
		border: 2rpx solid #e6e6e6;
		text-align: center;
		// margin-right: 30rpx;
		padding: 0 20rpx;
		width: 42%;
	}

	.btn-box {
		position: absolute;
		bottom: 0rpx;
		// height: 100rpx;
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		padding-top: 20rpx;
		padding-bottom: 60rpx;
	}

	.clearIcon {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}

	.btn-bd {
		border: 2rpx solid #222;
	}

	.btn-bd-0 {
		border: 2rpx solid #222;
	}
}
</style>
