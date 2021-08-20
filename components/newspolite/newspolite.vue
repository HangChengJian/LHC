<template>
	<view class="">
		<!-- 规格弹窗 -->
		<popup-layer ref="cartPopupRef" :direction="'top'" :autoClose="true" @closeCallBack='closeCatr'>
			<view class="cart-pop bg-fff w100">
				<view style="width: 92%;" class="m-0-a">
					<view class="mt-30 dp-f">
						<view class="w-200 h-200"><image :src="goodsInfo.coverImage" class="w100 h100"></image></view>
						<view class="mt-36 ml-20" style="width: 70%;">
							<view class="fs-28 c-15 o-h" style="text-overflow: ellipsis;white-space: nowrap;" v-if="activeIndex !== null">{{goodsInfo.name}}</view>
							<view class="fs-26 c-15 mt-10" v-if="activeIndex !== null">已选：{{selects}}</view>
							<!-- <view class="fs-32 fw-b mt-9" style="color: #A2925C;">￥58</view> -->
						</view>
						<!-- <view class="fs-26 c-15 mt-36" v-if="activeIndex !== null">库存: {{stocks}}</view> -->
					</view>
					<view class="c-15 fs-26 mt-20">规格</view>
					<view class="w100 dp-f fw-w mt-30">
						<view 
							class="w-196 h-60 dp-f jc-c ai-c mr-20 mt-20"
							:class="{bgcolor:activeIndex == i}"
							style="background: #EDEDED;"
							v-for="(item,i) in goodsInfo.skuList" 
							:key="i" 
							@click="onSize(item,i)"
						>
							<text class="c-999 fs-26" :class="{'ce6': activeIndex == i}">{{item.skuName}}</text>
						</view>
					</view>
				</view>
				<view class="btn-box dp-f " @click="onAddCartn"><view class="w100 h-74 lh-74 ta-c fs-28 bg-222 color-fff  btn-bd-0">加入购物袋</view></view>
			</view>
		</popup-layer>
	</view>
</template>

<script>
import popupLayer from '@/components/popup/popup-layer.vue';
export default {
	components: { popupLayer },
	props: {
		goodsInfo: {
			type: Object,
			default:() => ({})
		},
		activeInfo: {
			type: Object,
			default:() => ({})
		},
		code:{
			type: String,
			default:() => ('')
		}
	},
	data() {
		return {
			activeIndex: null,
			activeData: {},
			selects:'',
			stocks:''
		};
	},
	onLoad() {
	},
	onShow() {},
	watch: {},
	computed: {},
	methods: {
		showPop() {
			this.$refs.cartPopupRef.show(); // 或者 boolShow = rue
		},
		closeCatr() {
			this.$refs.cartPopupRef.close(); // 或者 boolShow = false
			this.activeIndex = null
			this.$emit('emptyInfo')
		},
		onSize(item, i) {
			console.log(item.skuId)
			if (item.stock == 0) {
				return;
			}
			this.selects = item.skuName;
			this.stocks = item.stock
			this.activeData = item;
			this.activeIndex = i;
			this.$emit('changeSize', item);
		},
		onAddCartn() {
			if (this.activeIndex == null) {
				uni.showToast({
					title: '请选择规格',
					icon: 'none'
				});
				return;
			}
			let newGoods = this.goodsInfo
			newGoods.newId = this.goodsInfo.skuList[this.activeIndex].skuId
			this.$emit('selectshop',newGoods)
			this.$refs.cartPopupRef.close(); 
		},
	}
};
</script>

<style lang="scss" scoped>
.cart-pop {
	position: relative;
	box-sizing: border-box;
	height:754rpx ;
	.bgcolor{
		background: #151515 !important;
	}
	.ce6 {
		color: #FFFFFF !important;
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
