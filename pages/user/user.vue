<template>
	<view class="user-box">
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<!-- 用户头像 -->
		<view class="user-cover-box h-430 bg-222 dp-f dp-fc" style="align-items: flex-end;" @click="onUser">
			<view class="dp-f fd-c ai-c" v-if="isShowUser">
				<image :src="userInfo.icon ? userInfo.icon : '../../static/icon/logo.png'" mode="" class="w-130 h-130 br50 "></image>
				<view class="fs-40 color-fff pt-16 pb-40">{{ userInfo.nickname ? userInfo.nickname : '登录/注册' }}</view>
			</view>
		</view>
		<!-- 优惠券 钱包 -->
		<view class="property-box h-153 bg-fff dp-f jc-sa ai-c">
			<view class="dp-f fd-c ai-c" @click="$outerHref('/pagesA/couponList/couponList',true)">
				<view class="fs-36 color-4b fw-b">{{isLogin?userInfo.couponCount:0}}</view>
				<view class="fs-24 color-4b pt-10">优惠券</view>
			</view>
			<view class="dp-f fd-c ai-c" @click="$outerHref('/pagesA/collect/collect',true)">
				<view class="fs-36 color-4b fw-b">{{isLogin?userInfo.collectionTotal:0}}</view>
				<view class="fs-24 color-4b pt-10">收藏</view>
			</view>
			<!-- 未完成功能 -->
			<!-- <view class="dp-f fd-c ai-c" @click="$outerHref('/pagesA/wallet/wallet',true)">
				<view class="fs-36 color-4b fw-b">{{isLogin?99:0}}</view>
				<view class="fs-24 color-4b pt-10">钱包</view>
			</view> -->
		</view>
		<view class="order-box mt-14 bg-fff ">
			<!-- 未完成功能 -->
			<!-- <view class="bg-222 h-80 dp-f jc-sb ai-c p-0-20 bs-bb" @click="$outerHref('/pagesB/exchange/exchange', true)">
				<view class="fs-28 color-cf"></view>
				<view class="dp-f jc-sb ai-c">
					<text class="fs-22 color-cf">进入积分商城</text>
					<text class="iconfont fs-22 color-cf ml-4 mr-4">&#xe65d;</text>
					<text class="iconfont fs-22 color-cf">&#xe601;</text>
				</view>
			</view> -->
			<view class=" dp-f jc-sb ai-c mt-40" @click="$outerHref('/pagesA/userOrder/userOrder',true)">
				<view class="fs-36 color-15">我的订单</view>
				<view class="dp-f jc-sb ai-c ">
					<text class="fs-24 color-4b">查看全部</text>
					<text class="iconfont fs-24 color-aaa">&#xe601;</text>
				</view>
			</view>
			<view class="property-box  bg-fff dp-f jc-sb ai-c p-0-25 mt-38" >
				<view class="dp-f fd-c ai-c" v-for='(item,index) in userOrder' :key='index' @click="$outerHref('/pagesA/userOrder/userOrder?type='+item.type,true)">
					<image :src="item.icon" mode="" class="w-44 h-44 "></image>
					<view class="fs-24 color-4b pt-20">{{item.name}}</view>
				</view>
				<!-- <view class="dp-f fd-c ai-c">
					<image src="../../static/icon/order02.png" mode="" class="w-44 h-44 "></image>
					<view class="fs-24 color-4b pt-20">代发货</view>
				</view>
				<view class="dp-f fd-c ai-c">
					<image src="../../static/icon/order03.png" mode="" class="w-44 h-44 "></image>
					<view class="fs-24 color-4b pt-20">待收货</view>
				</view>
				<view class="dp-f fd-c ai-c">
					<image src="../../static/icon/order04.png" mode="" class="w-44 h-44 "></image>
					<view class="fs-24 color-4b pt-20">已完成</view>
				</view>
				<view class="dp-f fd-c ai-c">
					<image src="../../static/icon/order05.png" mode="" class="w-44 h-44 "></image>
					<view class="fs-24 color-4b pt-20">待退款</view>
				</view> -->
			</view>
			<!-- 未完成功能 -->
			<!-- brand -->
			<!-- <image src="https://source.unsplash.com/random" mode="" class="w100 h-180 mt-40"></image> -->
		</view>
		<view class="list-box bg-fff mt-14 bs-bb p-0-30">
			<!-- 未完成功能 -->
			<!-- <view class="list dp-f ai-c ">
				<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/images/newWx/order1.png" mode="" class="w-28 h-28 mr-20"></image>
				<view class="fs-24 color-4b">联系客服</view>
			</view> -->
			<view class="list dp-f ai-c " @click="$outerHref('/pages/address/address',true)">
				<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/images/newWx/address.png" mode="" class="w-32 h-28 mr-20"></image>
				<view class="fs-24 color-4b">地址管理</view>
			</view>
			<!-- 未完成功能 -->
			<!-- <view class="list dp-f ai-c ">
				<image src="../../static/icon/order2.png" class="w-28 h-28 mr-20"></image>
				<view class="fs-24 color-4b">我的评论</view>
			</view> -->
			<!-- <view class="list dp-f ai-c" @click="$outerHref('/pagesA/coproblem/coproblem')">
				<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/images/newWx/order3.png" mode="" class="w-28 h-28 mr-20"></image>
				<view class="fs-24 color-4b">常见问题</view>
			</view> -->
			<view class="list dp-f ai-c " @click="$outerHref('/pagesA/setup/setup',true)">
				<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/images/newWx/order4.png" mode="" class="w-28 h-28 mr-20"></image>
				<view class="fs-24 color-4b">设置</view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="like mt-14 bs-bb p-0-30 bg-fff">
			<view class="fs-38 color-333 pt-40 pb-20">猜你喜欢</view>
			<view class="dp-f jc-sb fw-w">
				<view class="goods-cover-box" v-for="(item,index) in guessList" :key='index'><goods-module :item='item'></goods-module></view>
			</view>
		</view>
	</view>
</template>

<script>
import goodsModule from '@/components/goodsModule/goodsModule.vue';
export default {
	components: {
		goodsModule
	},
	data() {
		return {
			isShowUser: false, //显示用户信息
			isLogin: false, //是否登录
			userInfo: null, //用户信息
			guessParameter:{pageIndex:1,pageSize:10,type:4},
			guessList:[],//猜你喜欢
			isReach:false,//猜你喜欢是否无内容
			userOrder: [
				{ name: '待付款', icon: '../../static/icon/order01.png', type: 1 },
				{ name: '待发货', icon: '../../static/icon/order02.png', type: 2 },
				{ name: '待收货', icon: '../../static/icon/order03.png', type: 3 },
				{ name: '已完成', icon: '../../static/icon/order04.png', type: 4 },
				// { name: '待退款', icon: '../../static/icon/order01.png', type: 0 }
			]
		};
	},
	onLoad() {
		this.getLike()
	},
	onShow() {
		console.log('执行')
		this.$refs.loading.open();
		this.getUserInfo();
	},
	// 上拉加载
	onReachBottom() {
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
	watch: {},
	computed: {},
	methods: {
		getLike(){
			if(this.isReach){
				uni.showToast({
					title:'没有更多内容了',
					icon:'none'
				})
				return
			}
			this.$refs.loading.open();
			this.$http.getIndexHot(this.guessParameter).then(res=>{
				console.log('like',res.data.data.records)
				this.$refs.loading.close();
				if(res.data.data.records.length == 0){
					this.isReach = true
					return
				}
				this.guessParameter.pageIndex ++
				this.guessList = this.guessList.concat(res.data.data.records);
			})
		},
		onUser() {
			if (this.isLogin) {
				uni.navigateTo({
					url: '/pagesA/perinfo/perinfo'
				});
			} else {
				uni.navigateTo({
					url: '/pages/wxlogin/wxlogin'
				});
			}
		},
		//获取用户信息
		getUserInfo() {
			this.$http
				.userInfo()
				.then(res => {
					console.log(res.data);
					if(res.data.data.mark){
						this.isLogin = false;
					}else{
						this.isLogin = true;
					}
					// if (res.data.code == 200) {
					// 	this.isLogin = true;
					// } else {
					// 	this.isLogin = false;
					// }
					this.$refs.loading.close();
					this.userInfo = res.data.data;
					uni.setStorageSync('userInfo', JSON.stringify(res.data.data));
					this.isShowUser = true;
				})
				.catch(e => {
					console.log('2',e);
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f6f6f6;
}

.user-box {
	.order-box {
		box-sizing: border-box;
		padding: 40rpx 30rpx;
	}

	.list-box {
		.list {
			height: 93rpx;
			border-bottom: 1px solid #f6f6f6;
		}
	}

	.goods-cover-box {
		margin-bottom: 60rpx;
	}
}
</style>
