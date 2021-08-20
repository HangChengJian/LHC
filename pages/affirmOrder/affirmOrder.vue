<template>
	<view class="affirmOrder-box">
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<view class="dp-f ai-c jc-sb bs-bb address-box" @click="goAddress">
			<view class="w100" v-if='orderInfo.address'>
				<view class="fs-36 c-15 fw-b">收货地址</view>
				<view class="dp-f ai-c jc-sb pt-20">
					<view class="fs-28 c-15 ">{{ orderInfo.address.name }} {{ orderInfo.address.phoneNumber }} {{orderInfo.address.provinceName}} {{orderInfo.address.cityName}} {{orderInfo.address.regionName}}</view>
					<view class="iconfont">&#xe6a3;</view>
				</view>
				<view class="fs-28 c-15 pt-20 t-ohs">{{ orderInfo.address.detailAddress }}</view>
			</view>
			<view class="w100" v-else>
				<view class="fs-36 c-15 fw-b">收货地址</view>
				<view class="dp-f ai-c jc-sb pt-20">
					<view class="fs-28 c-15 ">请选择收货地址</view>
					<view class="iconfont">&#xe6a3;</view>
				</view>
			</view>
		</view>
		<!-- 订单商品 -->
		<view class="order-goods" v-for="(item, index) in orderInfo.goodsList" :key="item.id">
			<image :src="item.productPic" class="w-240 h-240"></image>
			<view class="pl-30 f-1">
				<view class="h-80 t-ohs fs-28 c-333">{{ item.productName }}</view>
				<view class="fs-24 c-95 mt-10">规格：{{ item.productSkuName }}</view>
				<view class="dp-f ai-c jc-sb mt-30">
					<view class="fs-28 c-15 fw-b">{{item.activityCode?item.promotionMessage:'￥'+item.price }}</view>
					<view class="fs-28 c-15 fw-b">x{{ item.quantity }}</view>
				</view>
			</view>
		</view>
		<view class="list-box" @click="show">
			<text class="fs-30 c-15 fw-b">优惠券</text>
			<view class="dp-f ai-c">
				<text v-if="ticketIndex!==null" class="fs-26 c-63 c-15 lh-26">{{coupondata.couponName}}</text>
				<text v-else class="fs-26 c-63 c-15 lh-26">{{orderInfo.Available.length?'您有可用的优惠':'您没有可用的优惠'}}</text>
				<text class="fs-20 c-63 iconfont ml-10">&#xe6a3;</text>
			</view>
		</view>
		<view class="list-box bb-ea mt-14" v-if="judgmentCkcode">
			<text class="fs-30 c-15 fw-b">折扣码</text>
				<input  @input='inputCkcode(Ckcode)' type="text" style="text-align: right;" v-model="Ckcode"  class="fs-26 c-15 fw-b" placeholder="请输入折扣码" />
		</view>
		<view class="list-box bb-ea mt-14">
			<text class="fs-30 c-15 fw-b">商品金额</text>
			<text class="fs-26 c-15 fw-b">￥{{ orderInfo.amount.totalAmount }}</text>
		</view>
		<view class="list-box">
			<text class="fs-30 c-15 fw-b">运费</text>
			<text class="fs-26 c-15 fw-b">￥{{ orderInfo.amount.shippingAmount }}</text>
		</view>
		<!-- 未完成功能 -->
	<!-- 	<view class="dp-f ai-c c-62 fs-26 bs-bb pl-30 pr-30 mt-30">
			<view class="radio-bxo w-28 h-28 bg-222 mr-16 dp-fc" @click="radioType = !radioType"><view class="iconfont c-fff fs-18" v-show="radioType">&#xe63f;</view></view>
			同意
			<text class="c-15">《隐私政策》</text>
			，以上信息仅用于下单和收货
		</view> -->
		<view class="order-footer ">
			<view class="dp-f jc-fe">
				<view class="mt-27">
					<text class="fs-28 c-15">合计：</text>
					<text class="fs-38 c-15 fw-b">￥{{orderInfo.amount.payAmount}}</text><!-- -->
				</view>
			</view>
			<view class="w100 h-90 lh-90 ta-c c-fff fs-32 bg-222 mt-20" @click="onPay(requestid)">提交订单</view>
		</view>
		<view class="h-300"></view>
		<!-- 优惠券 -->
		<popup-layer ref="popupRef" :direction="'top'" :autoClose="false">
			<view class="box-pop bg-fff w100 dp-f fd-c">
				<view class="pop-title bb-ea">
					<view class="iconfont color-fff fs-25">&#xe66b;</view>
					<view class="fs-30 c-15">使用优惠券</view>
					<view class="iconfont color-9 fs-25" @tap="close">&#xe66b;</view>
				</view>
				<!-- 导航栏 -->
				<navTab
					ref="navTab"
					:isBorder="isBorder"
					:borderW="borderW"
					:tabTitle="tabTitle"
					:paddingB="paddingB"
					:paddingT="paddingT"
					@changeTab="changeTab"
					:fontSize="fontSize"
					:activeColor="activeColor"
					:textColor="textColor"
				></navTab>
				<scroll-view scroll-y="true" class="scroll-Y coupon-box" :catchtouchmove="false">
					<view class="h-20"></view>
					<view class="mb-14 bs-bb p-0-30 " v-for="(item, index) in AvailableList" :key="index" @click="!isDisable?onTicket(index):''">
						<view :class="ticketIndex == index&&!isDisable ? 'bd-15' : 'bd-fff'">
							<ticket :isDisable="isDisable" :preferentialData='item'></ticket>
						</view>
					</view>
				</scroll-view>
			</view>
		</popup-layer>
	</view>
</template>

<script>
import popupLayer from '@/components/popup/popup-layer.vue';
import ticket from '@/components/ticket/ticket.vue';

export default {
	components: {
		popupLayer,
		ticket
	},
	data() {
		return {
			judgmentCkcode:true,//判断是否显示折扣码
			isCkcode:false,//折扣码校验
			Ckcode:'',//折扣码
			coupondata:'',//优惠劵数据
			AvailableList:[],//优惠劵
			orderInfo: {}, //订单详情
			ticketIndex: null,
			radioType: false,
			tabTitle: ['可用优惠券(0)', '不可用优惠券(0)'],
			currentTab: 1,
			activeColor: '#151515',
			textColor: '#666666',
			fontSize: '28',
			paddingT: 20,
			paddingB: 16,
			borderW: 92,
			isBorder: true,
			isDisable:false,
			acitveAddress: null,
			address: {
				city: '110000',
				defaultStatus: 0,
				detailAddress: '维生素方法22222222',
				id: 18,
				isTouchMove: false,
				memberId: 1372786263928680400,
				name: '大哥大11111111',
				phoneNumber: '15267625150',
				postCode: '',
				province: '110100',
				region: '110101',
				requestid:'',
				productSkuID:'',
				activecode:''
			}
		};
	},
	onLoad(e) {
		this.activecode = e.code
		// console.log(this.activecode)
		this.requestid = e.type
		this.orderInfo = JSON.parse(e.data);
		this.productSkuID = this.orderInfo.productSkuList
		this.tabTitle[0]=`可用优惠券(${this.orderInfo.Available.length})`
		this.tabTitle[1]=`不可用优惠券(${this.orderInfo.noAvailable.length})`
		// console.log('订单详情', this.orderInfo);
	},
	onShow() {
		if (this.acitveAddress) {
			this.address = this.acitveAddress;
		}
		this.judgmentCkcode=this.judgmentActivity()
	},
	watch: {},
	computed: {},
	methods: {
		judgmentActivity(){
			for(let i=0;i<this.orderInfo.goodsList.length;i++){
				if(this.orderInfo.goodsList[i].activityCode===''){
					return true
				}
			}
			return false
		},
		changeTab(val){
			if(val){
				this.isDisable=true
				this.AvailableList=this.orderInfo.noAvailable
			}else{				
				this.isDisable=false
				this.AvailableList=this.orderInfo.Available
			}
		},
		// 提交订单
		onPay(type) {
			if(!this.orderInfo.address){
				uni.showToast({
					title:'请选择收货地址',
					icon:'none'
				})
				return
			}
			if(this.Ckcode.length>0&&!this.isCkcode){
				uni.showToast({
					title:'折扣码错误',
					icon:'none'
				})
				return
			}
			if(type==1){
				let parameter = {
					code:this.activecode,
					payType: 2,
					productSkuList:this.productSkuID,
					memberReceiveAddressId: this.orderInfo.address.id,
					
				};
				if(this.ticketIndex!==null){
					console.log(this.coupondata)
					parameter.couponId=this.coupondata.id
				}
				if(this.Ckcode.length>0){
					parameter.code=this.Ckcode
				}
				this.$http.submitorder(parameter).then(res => {
					uni.setStorageSync('selectArr', []);
					uni.redirectTo({
						url: '/pages/wxpay/wxpay?id=' + res.data.data.order.id + '&payNum=' + res.data.data.order.payAmount
					});
				});
			}else{
				let parameter = {
					cartIds: this.orderInfo.cartIds,
					memberReceiveAddressId: this.orderInfo.address.id,
				};
				if(this.ticketIndex!==null){
					console.log(this.coupondata)
					parameter.couponId=this.coupondata.id
				}
				if(this.Ckcode.length>0){
					parameter.code=this.Ckcode
				}
				this.$http.generateOrder(parameter).then(res => {
					uni.setStorageSync('selectArr', []);
					uni.redirectTo({
						url: '/pages/wxpay/wxpay?id=' + res.data.data.order.id + '&payNum=' + res.data.data.order.payAmount
					});
				});
			}
		},
		// 使用优惠券
		onTicket(index) {
			if (this.ticketIndex == index) {
				this.ticketIndex = null;
			} else {
				this.ticketIndex = index;
				this.coupondata=this.AvailableList[index]
			}
			this.close();
		},
		goAddress() {
			uni.navigateTo({
				url: '/pages/address/address'
			});
		},
		show() {
			this.$refs.popupRef.show(); // 或者 boolShow = rue
		},
		close() {
			this.$refs.popupRef.close(); // 或者 boolShow = false
		},
		inputCkcode(val){
			this.Ckcode=val.replace(/[^\w]/g,'');
			clearInterval(this.timer);
			if(this.Ckcode.length>0){
				this.timer = setInterval(()=>{
					this.$http.discountQueryCode({code:this.Ckcode}).then(res => {
						if(res.data.code==200){
							uni.showToast({
								title: res.data.message,
								icon:'none',
								duration: 1000,
							})
							this.isCkcode=true
						}else{
							this.isCkcode=false
						}
						console.log(res.data)
					})
					clearInterval(this.timer);
				},2000);
			}else{
				
			}
		}
	}
};
</script>

<style lang="scss">
page {
	min-height: 100vh;
	background: #f6f6f6;
}
.coupon-none{
		.none-color{
			color: #999999;
		}
		.none-bd{
			border: 1px solid #999999;
		}
	}
.affirmOrder-box {
	.bd-fff {
		border: 1px solid #fff;
	}
	.coupon-box {
		height: 862rpx;
		background: #f8f8f8;
	}

	.box-pop {
		height: 1046rpx;

		.pop-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 102rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
		}
	}

	.order-footer {
		height: 270rpx;
		width: 100%;
		background: #ffffff;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #fff;
		box-sizing: border-box;
		padding: 0 30rpx;
		z-index:111;
	}

	.list-box {
		padding: 30rpx;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.address-box {
		padding: 30rpx 30rpx 50rpx 30rpx;
	}

	.order-goods {
		padding: 30rpx;
		background: #fff;
		display: flex;
		align-items: center;
		margin-bottom: 14rpx;
	}
}
</style>
