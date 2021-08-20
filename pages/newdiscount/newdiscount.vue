<template>
	<view class="exclusive-box" :style="{ background: info.activity.backgroundColour }" :class="{'pb-80':isbottom}">
		<image :src="info.activity.url" class="w100" mode="widthFix"></image>
		<view class="goods-list">
			<view class="mt-50 w-336" v-for="(item, index) in info.productList" :key="index">
				<view class="gs-cover dp-fc"><image :src="item.coverImage" class="h-336 w100"  @click.stop="lockGoods(item.id)" ></image></view>
				<view class="fs-26  c-15 mt-20 t-ohs h-72">{{ item.name }}</view>
				<view class="dp-f jc-sb ai-c mt-20">
					<view class="fs-32 fw-b color-a29">￥{{ item.price }}</view>
					<view class="iconfont color-a29" @click.stop="addCart(item)">&#xe605;</view>
				</view>
			</view>
		</view>
		<view class="w100 " v-if="shoppingcar.length > 0"></view>
		<!-- 规格弹窗 -->
		<newspolite
			ref="cartPopupRef"
			:btnType="false"
			:goodsInfo="goodsInfo"
			:activeInfo="activeInfo"
			:code="code"
			@changeSize="changeSize"
			@emptyInfo="emptyInfo"
			@selectshop="selectshop"
		></newspolite>
		<!-- 商品列表 -->
		<newshopcart ref="cartPopupReflist" :shoppingcar="shoppingcar" @changenum="changenum" :code="code"></newshopcart>
		<image :src="info.activity.baseImg" class="w100" mode="widthFix"></image>
		<!-- <view class="h-180">
			
		</view> -->
		<!-- 结算 -->
		<view class="w100" style="position: fixed;bottom: 0;" v-if="shoppingcar.length > 0">
			<view class="w100 h-70 dp-f ai-c pl-40" style="background: #151515;opacity: 0.8;">
				<text class="fs-28" style="color: #E4D9B4;">本页产品可单独结算，也可以和其他商品一同付款哦{{shoppingcar.length}}</text>
			</view>
			<view class="w100  bg-fff">
				<view class="m-0-a h100 dp-f" style="width: 92%;">
					<view style="position: relative;flex-flow: column;" class="w-100 h-80 dp-f ai-c mt-22">
						<view class="w-22 h-22 c-fff fw-b fs-20 dp-f jc-c ai-c shopcarttips">{{ shoppingcar.length }}</view>
						<view class="iconfont c-000  fs-40" @click.stop="cartlist()">&#xe605;</view>
						<view class="color-5d fs-22">选中商品</view>
					</view>
					<view>
						<view class="fw-b fs-30 mt-42" style="color: #151515;margin-left: 140rpx;" v-if="shoppingcar.length == info.activity.quantity">
							<text>总价:</text>
							<text>￥{{ info.activity.price }}</text>
						</view>
						<view class="fw-b fs-30 mt-42" style="color: #c2c2c2;margin-left: 140rpx;" v-else>
							<text>总价:</text>
							<text>￥{{ info.activity.price }}</text>
						</view>
					</view>
					<view>
						<view
							class="color-fff w-250 h-86 c-fff fs-32 dp-f jc-c ai-c ml-20 mt-20"
							style="background: #151515;"
							v-if="shoppingcar.length == info.activity.quantity"
							@click="goshopingcar()"
						>
							去购物车结算
						</view>
						<view class="w-250 h-86 c-fff fs-32 dp-f jc-c ai-c ml-20 mt-20" style="background: #d5d5d5;" v-else>
							还差{{ info.activity.quantity - shoppingcar.length }}件
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import popupLayer from '@/components/popup/popup-layer.vue';
import newspolite from '@/components/newspolite/newspolite.vue';
import newshopcart from '@/components/newshopcart/newshopcart.vue';
export default {
	components: {
		popupLayer,
		newspolite,
		newshopcart
	},
	data() {
		return {
			info: {},
			goodsInfo: {},
			activeInfo: {}, //选中规格
			goodslist: {},
			shoppingcar: [],
			productLists: [],
			xxx: '',
			skuid: '',
			code:'',
			isbottom:true
		};
	},
	onLoad(e) {
		this.code = e.code
		console.log(this.code)
		this.$http.getnewsshop({ code: e.code }).then(({ data: data }) => {
			this.info = data.data;
			console.log(data.data);
			this.shoppingcar = this.info.skuList;
			if(this.shoppingcar.length > 0){
				this.isbottom = true
			}else{
				this.isbottom = false
			}
			uni.setNavigationBarTitle({
				title: this.info.title
			});
		});
	},
	onShow() {},
	watch: {},
	computed: {},
	methods: {
		// 购物车结算
		goshopingcar(){
			this.productLists = [];
			if(this.shoppingcar.length > 0){
				console.log('xx',this.shoppingcar)
				//保留加购商品结算
				this.shoppingcar.forEach(item => {
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
			this.$http.goshopcar({ code: this.code , productSkuList:this.productLists}).then(res=> {
				if(res.data.success == true) {
					uni.switchTab({
						url: '/pages/goodsCart/goodsCart'
					});
				}
			});
		},
		//当前页面结算
		buyshop() {
			this.productLists = [];
			this.shoppingcar.forEach(item => {
				item.skuList.forEach(items => {
					// console.log(items.skuId,'xx')
					this.productLists.push({ id: items.skuId });
					console.log(this.productLists);
				});
			});
			this.$http.buyshops({ code: this.code, productSkuList: this.productLists }).then(res => {
				console.log(res.data.data);
				const orderInfo = res.data.data;
				let parameter = {
					amount: orderInfo.calcAmount, //商品合计
					goodsList: orderInfo.cartPromotionItemList, //商品列表
					address: null, //默认地址
					Available: orderInfo.couponHistoryDetailList, //可用优惠券
					noAvailable: orderInfo.disableCouponList, //不可用优惠券
					productSkuList: this.productLists,
				};
				orderInfo.memberReceiveAddressList.forEach((item, index) => {
					if (item.defaultStatus == 1) {
						console.log(item);
						parameter.address = item;
					}
				});
				uni.navigateTo({
					url: '/pages/affirmOrder/affirmOrder?data=' + JSON.stringify(parameter)  + '&type=1' 
				});
			});
		},
		changenum(e) {
			if(e.length == 0){
				this.isbottom = false
			}
			this.shoppingcar = e;
		},
		// 重置选中规格
		emptyInfo() {
			this.activeInfo = {};
		},
		changeSize(item) {
			this.activeInfo = item;
		},
		selectshop(e) {
			this.shoppingcar.push(e);
			this.isbottom = true
		},
		lockGoods(id) {
			uni.navigateTo({
				url: '/pages/goodsDetails/goodsDetails?id=' + id
			});
		},
		addCart(item) {
			console.log(item);
			if (this.shoppingcar.length >= this.info.activity.quantity) {
				uni.showToast({
					icon: 'none',
					title: '您已选购最大件数'
				});
				return;
			}
			this.shoppingcar.forEach(datas => {
				this.xxx = datas.productId;
			});
			console.log(this.xxx, '分割', item.id);
			if(this.shoppingcar.length>0){
				if (this.xxx == item.id) {
					uni.showToast({
						icon: 'none',
						title: '当前商品限购一件!'
					});
					return false;
				}
			}
			this.goodsInfo = item;
			this.$refs.cartPopupRef.showPop();
		},
		cartlist() {
			this.$refs.cartPopupReflist.showPops();
		},
		closeCatr() {
			this.$refs.cartPopupRef.close();
		}
	}
};
</script>

<style lang="scss" scoped>
	.pb-80{
		padding-bottom: 80rpx;
	}
.shopcarttips {
	border-radius: 50%;
	background: #d41b1b;
	top: 0;
	right: 0;
	position: absolute;
}
.exclusive-box {
	
	.goods-list {
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding-bottom: 30rpx;
	}

	.gs-cover {
		width: 336rpx;
		height: 336rpx;
		background: #f6f6f6;
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
}
</style>
