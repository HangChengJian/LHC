<template>
	<view class="">
		<!-- 规格弹窗 -->
		<popup-layer ref="cartPopupRef" :direction="'top'" :autoClose="true">
			<view class="cart-pop bg-fff w100 ">
				<view class="iconfont color-333 clearIcon fs-22 fw-b" @tap="closeCatr">&#xe66b;</view>
				<view style="padding: 30rpx;">
					<view class="dp-f pb-15 pb-40">
						<image :src="goodsInfo.coverImage" mode="" class="w-280 h-280 mr-20 "></image>
						<view class="">
							<view class="fs-32 c-15 fw-b">￥{{goodsInfo.price}}</view>
							<view class="fs-22 color-9b pt-12">{{goodsInfo.name}}</view>
						</view>
					</view>
					<view class="dp-f fw-w jc-sb">
						<view class="goods-size fs-28 color-222 h-100 lh-100">1ml可获得30积分</view>
						<view class="goods-size  fs-28 color-222 h-100 lh-100">1ml可获得30积分</view>
					</view>
				</view>
				<view class="h-220 w100 "></view>
				<view class="btn-box dp-f jc-sb "><view class="w100 h-74 lh-74 ta-c fs-28 bg-222 color-fff  btn-bd-0" @click="onBtn">加入购物袋</view></view>
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
	watch: {
		goodsInfo(newVal){
			console.log(newVal)
		}
	},
	computed: {},
	methods: {
		showPop() {
			this.$refs.cartPopupRef.show(); // 或者 boolShow = rue
		},
		closeCatr() {
			this.$refs.cartPopupRef.close(); // 或者 boolShow = false
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
	.cart-pop {
		position: relative;
		box-sizing: border-box;

		.goods-size {
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
