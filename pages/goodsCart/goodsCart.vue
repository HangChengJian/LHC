<template>
	<view class="container">
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<scroll-view scroll-y="true" class="scroll-Y" style="height: 100vh;" :catchtouchmove="false" @scrolltolower="onReach">
			<!-- 公告 -->
			<TNoticeBar :list="list"></TNoticeBar>
			<!-- 保障详情 -->
			<popup-layer ref="popupRef" :direction="'top'" :autoClose="false">
				<view class="box-pop bg-fff w100 h-639 bs-bb p-0-40">
					<view class="fw-b fs-32 poptitle ta-c">
						了解详情
						<view class="iconfont color-333 clearIcon fs-22 fw-w closeIcon" @tap="close">&#xe66b;</view>
					</view>
					<view class=" fs-28 color-15  pb-14" style="padding-top: 64rpx;">- 运费规则</view>
					<view class="fs-20 color-15 ">
						网站全场订单单笔满58元即享受免运费服务（新疆、西藏、甘肃、内蒙古、青海、宁夏以及疫情影响地区暂不发货），详情咨询客服，带来不便敬请谅解。
					</view>
					<view class=" fs-28 color-15  pb-14" style="padding-top: 64rpx;">- 配送时间</view>
					<view class="fs-20 color-15 ">
						包裹将于付款后的3个工作日内发出，发货后预计2~5个工作日左右配送到您的地址。遇到节假日可能会有延迟，但我们会尽力保证您的包裹安全快速送达。
					</view>
				</view>
			</popup-layer>
			<view class="">
				<view class="w100 h-350 bg-fff" v-show="isLogin"></view>
				<sideslip-car
					ref="mycar"
					@show="show"
					@selAllBtn="selAllBtn"
					@delBtn="delBtn"
					@touchEv="touchEv"
					@selThis="selThis"
					@jsBtn="jsBtn"
					@changeNum="changeNum"
					@changeSize="changeSize"
					class="sideslip-car"
					:carts="carts"
					v-show="!isLogin"
				></sideslip-car>
			</view>
			<!-- 猜你喜欢 -->
			<view class="bs-bb p-0-30 bg-fff">
				<view class="fs-38 pb-10 pt-50">猜你喜欢</view>
				<view class="mt-20 w-690 m-0-a dp-f fw-w jc-sb">
					<view v-for="(item, i) in guessList" :key="i" class="mb-60"><goods-module :item='item'></goods-module></view>
				</view>
			</view>
			<view class="h-150"></view>
		</scroll-view>
	</view>
</template>

<script>
import sideslipCar from '@/components/sideslip-car/sideslip-car.vue';
import TNoticeBar from '@/components/t-notice-bar.vue';
import goodsModule from '@/components/goodsModule/goodsModule.vue';
import popupLayer from '@/components/popup/popup-layer.vue';
export default {
	components: {
		sideslipCar,
		TNoticeBar,
		goodsModule,
		popupLayer
	},
	data() {
		return {
			isLogin: true,
			isReach:false,//猜你喜欢是否无内容
			list: ['网站全场订单单笔满58元即享受免运费服务（新疆、西藏、甘肃、内蒙古、青海、宁夏以及疫情影响地区暂不发货），详情咨询客服，带来不便敬请谅解。'],
			carts: [],// 购物车列表
			guessList:[],//猜你喜欢
			guessParameter:{pageIndex:1,pageSize:10,type:4}
		};
	},
	onLoad() {
		this.getLike()
	},
	onShow() {
		this.initCart()
	},
	onHide() {
		this.$refs.mycar.initCart();
		this.carts.forEach(item=>{
			item.isTouchMove = false
		})
	},
	methods: {
		// 上拉加载
		onReach() {
			//一定时间内禁止重复调用模式
			this.$jiuaiDebounce.canDoFunction({
				key: 'click', //基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
				time: 1000, //如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
				success: () => {
					//成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
					this.getLike()
				}
			});
		},
		getLike(){
			if(this.isReach){
				uni.showToast({
					title:'没有更多内容了',
					icon:'none'
				})
				return
			}
			this.$http.getRecommend(this.guessParameter).then(res=>{
				console.log('like',res.data.data.records)
				if(res.data.data.records.length == 0){
					this.isReach = true
					return
				}
				this.guessParameter.pageIndex ++
				this.guessList = this.guessList.concat(res.data.data.records);
			})
		},
		initCart(){
			const selectArr = uni.getStorageSync('selectArr')
			console.log('选中购物车id',selectArr)
			if(selectArr.length == 0 || !selectArr){
				this.$refs.mycar.initSelect();
			}
			this.$refs.loading.open();
			this.$http.getCart().then(res => {
				if(res.data.code==200){
					this.carts = []
					this.$refs.loading.close();
					let list = res.data.data;
					if(selectArr){
						selectArr.forEach((item, index) => {
							list.forEach((items, i) => {
								if(items.id == item){
									list[i].selected = true
								}
							});
						});
					}
					
					list.forEach((item, index) => {
						list[index].isTouchMove = false;
					});
					this.carts = list;
					console.log('修改状态后的购物车',this.carts )
					setTimeout(()=>{
					this.$refs.mycar.getTotalPrice();
					this.isLogin = false;
					},100)
				}
			})
		},
		changeSize(item, index) {
			this.carts[index].sku = item;
			console.log('选择')
			this.initCart()
		},
		show() {
			this.$refs.popupRef.show(); // 或者 boolShow = rue
		},
		close() {
			this.$refs.popupRef.close(); // 或者 boolShow = false
		},
		serveCart(cart){
			const selectArr = []
			cart.forEach((item,index)=>{
				if(item.selected && item.id){
					selectArr.push(item.id)
				}
			})
			uni.setStorageSync('selectArr',selectArr)
		},
		jsBtn: function(cartIds) {
			this.$refs.loading.open();
			this.$http.createOrder(cartIds).then(res => {
				this.$refs.loading.close();
				const orderInfo = res.data.data;
				let parameter = {
					amount:orderInfo.calcAmount,//商品合计
					goodsList:orderInfo.cartPromotionItemList,//商品列表
					address: null,//默认地址
					cartIds,//购物车id
					Available:orderInfo.couponHistoryDetailList,//可用优惠券
					noAvailable:orderInfo.disableCouponList//不可用优惠券
				};
				orderInfo.memberReceiveAddressList.forEach((item, index) => {
					if (item.defaultStatus == 1) {
						console.log(item);
						parameter.address = item;
					}
				});
				uni.navigateTo({
					url: '/pages/affirmOrder/affirmOrder?data=' + JSON.stringify(parameter)
				});
			});
		},
		changeNum: function(carts) {
			this.carts = carts;
			console.log(carts);
			this.$refs.mycar.getTotalPrice();
		},
		selThis: function(carts) {
			console.log('单选', carts);
			this.carts = carts;
			this.$refs.mycar.getTotalPrice();
			this.serveCart(carts)
		},
		selAllBtn: function(carts) {
			console.log('全选', carts);
			this.carts = carts;
			this.$refs.mycar.getTotalPrice();
			this.serveCart(carts)
		},
		touchEv: function(carts) {
			this.carts = carts;
		},
		//删除商品
		delBtn: function(carts, ids, index) {
			const option = {
				ids
			};
			this.$http.delCart(option).then(res => {
				uni.showToast({
					title: '删除成功'
				});
				carts.splice(index, 1);
				this.carts = carts;
				this.$refs.mycar.getTotalPrice();
			});
		}
	}
};
</script>

<style>
page {
	background: #f5f5f5;
	overflow: hidden;
}

.scroll-Y {
	-webkit-overflow-scrolling: auto;
}

.poptitle {
	height: 119rpx;
	line-height: 119rpx;
	border-bottom: 1px solid #f5f5f5;
	position: relative;
}

.closeIcon {
	position: absolute;
	right: 0;
	top: 0;
}

.uni-checkbox-input {
	border-radius: 50% !important;
}

.container {
	/* 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        background: #f5f5f5;
        overflow: hidden; */
	min-height: 100vh;
}

.line1 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: box;
	display: -webkit-box;
	line-clamp: 1;
	box-orient: vertical;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	word-break: break-all;
	/* 英文换行问题 */
}

.line2 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: box;
	display: -webkit-box;
	line-clamp: 2;
	box-orient: vertical;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-break: break-all;
	/* 英文换行问题 */
}

.centerboth {
	display: flex;
	display: -webkit-flex;
	align-items: center;
	-webkit-align-items: center;
	justify-content: center;
	-webkit-justify-content: center;
}

.clearfix:after {
	content: '';
	display: block;
	visibility: hidden;
	height: 0;
	clear: both;
}

.clearfix {
	zoom: 1;
}

image {
	padding: 0;
	margin: 0;
}

textarea {
	width: 300rpx;
	height: 75rpx;
	display: block;
	position: relative;
	font-size: 28rpx;
}

button::after {
	border: none;
}

input:-ms-input-placeholder {
	color: #808080;
}

.container {
	background: #f5f5f5;
}

.sideslip-car {
	width: 100%;
}
</style>
