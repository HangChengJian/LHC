<!-- 新人大礼 -->
<template>
	<view class="">
		<popup-layer ref="cartPopupReflist" :direction="'top'" :autoClose="true" @closeCallBack="closeCatr">
			<view class="cart-pop bg-fff w100">
				<view class="c-15 fs-30 ta-c pt-30">选中商品({{ shoppingcar.length }})</view>
				<view class="iconfont color-333 clearIcon fs-22 fw-b pl-40" @tap="closeCatr">&#xe66b;</view>
				<view style="width: 100%;height: 77%;">
					<scroll-view style="height: 90%;" scroll-y="true">
						<view class="mt-30 h-260 m-0-a dp-f ai-c" style="width: 92%;background: #F6F6F6;" v-for="(item, index) in shoppingcar" :key="index">
							<view class="w-220 h-220 ml-20"><image :src="item.coverImage" class="w100 h100"></image></view>
							<view class="w-410 h-220 ml-20">
								<view class="fs-28 c-15 mt-10 t-ohs">{{ item.name }}</view>
								<view class="dp-f w100 ai-c" style="margin-top: 72rpx; justify-content: space-between;">
									<view class="fs-34 fw-b">￥{{ item.price }}</view>
									<view class="countBox  mr-30 dp-f ai-c jc-c">
										<view class="carSub w-60 h-60 dp-fc" style="background: #151515;" @click="changeNum(index)">
											<text class="iconfont fs-24 c-fff">&#xe60b;</text>
										</view>
										<view class="cartNum">{{ quantity }}</view>
										<view class="carAdd w-60 h-60  dp-fc" style="background: #cccccc;"><text class="iconfont fs-24 c-fff">&#xe624;</text></view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view style="width: 90%; margin-top: 10rpx;background: #151515;" class="c-fff fs-32 fw-b h-86 dp-f jc-c ai-c m-0-a" @click="buyshop()">立即结算</view>
			</view>
		</popup-layer>
	</view>
</template>

<script>
import popupLayer from '@/components/popup/popup-layer.vue';
export default {
	components: { popupLayer },
	props: {
		shoppingcar: {
			type: Array,
			default: () => []
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
			quantity: 1,
			activecode:''
		};
	},
	created() {},
	watch: {},
	computed: {
		//初始没商品加购规格 使用productList里的skuList里的  skuId  【】 =》 立即结算 和主购物车
		//有选择商品 删除默认选择商品 加购新商品 使用productList里的skuList里的  skuId  
		
		//进来  赋值 = newList =[默认选择] 删除一个默认选择【1】 加购 【1，2】
	},
	methods: {
		showPops() {
			this.$refs.cartPopupReflist.show(); // 或者 boolShow = rue
		},
		closeCatr() {
			this.$refs.cartPopupReflist.close(); // 或者 boolShow = false
			if (this.btnType == false) {
				this.activeIndex = null;
				this.$emit('emptyInfo');
			}
		},
		onBtn() {
			const productSkuId = this.goodsInfo.isPackage
				? this.goodsInfo.packageSkuInfo.id
				: this.goodsInfo.skuList.length == 1
				? this.goodsInfo.skuList[0].id
				: this.activeData.id;
			this.$emit('purchase', productSkuId);
		},
		changeNum(index) {
			// console.log(index)
			this.shoppingcar.splice(index, 1);
			this.$emit('changenum', this.shoppingcar);
			if (this.shoppingcar.length == 0) {
				this.$refs.cartPopupReflist.close();
			}
		},
		// 结算
		buyshop() {
			this.activecode = this.code
			this.productLists = [];
			// if(this.shoppingcar.skuList.length > 0)
			console.log(this.shoppingcar.length)
			if(this.shoppingcar.length > 0){
				console.log('xx',this.shoppingcar)
				//保留加购商品结算
				this.shoppingcar.forEach(item => {
					console.log(item)
					if(item.newId){
						this.productLists.push({ id: item.newId });
					}else{
						this.productLists.push({ id: item.id });
					}
				});
			}else{
				//初始没有加购商品
				this.shoppingcar.forEach(item => {
					item.skuList.forEach(items => {
						// console.log(items.skuId,'xx')
						this.productLists.push({ id: items.skuId });
						console.log(this.productLists);
					});
				});
			}
			
			this.$http.buyshops({ code: this.activecode, productSkuList: this.productLists }).then(res => {
				console.log(res.data.data);
				const orderInfo = res.data.data;
				let parameter = {
					amount: orderInfo.calcAmount, //商品合计
					goodsList: orderInfo.cartPromotionItemList, //商品列表
					address: null, //默认地址
					Available: orderInfo.couponHistoryDetailList, //可用优惠券
					noAvailable: orderInfo.disableCouponList, //不可用优惠券
					productSkuList: this.productLists
				};
				orderInfo.memberReceiveAddressList.forEach((item, index) => {
					if (item.defaultStatus == 1) {
						console.log(item);
						parameter.address = item;
					}
				});
				uni.navigateTo({
					url: '/pages/affirmOrder/affirmOrder?data=' + JSON.stringify(parameter) + '&type=1'+'&code=' + this.activecode
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.cart-pop {
	position: relative;
	box-sizing: border-box;
	height: 830rpx;
	.clearIcon {
		position: absolute;
		top: 36rpx;
		right: 30rpx;
	}
}
.countBox {
	/* position: absolute;
		right: 140rpx;
		bottom: 25rpx;
		right: 10rpx;
		bottom: 20rpx; */
	border: 1px solid #e7e7e7;
}

.cartNum {
	width: 60rpx;
	height: 50rpx;
	text-align: center;
	line-height: 50rpx;
	font-size: 24rpx;
	color: #151515;
	border-left: 1px solid #e7e7e7;
	border-right: 1px solid #e7e7e7;
}
.t-ohs {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
