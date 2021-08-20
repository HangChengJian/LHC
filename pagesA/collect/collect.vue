<!--收藏-->
<template>
	<view class="ov-h dp-f fd-c" style="height: 100vh;">
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<!--头部-->
		<view class="dp-f jc-sa w-750 h-100 ai-c collet-nav-box" style="">
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
		</view>
		<view class="h-100 bg-fff"></view>
		<view class="f-1" style="overflow: scroll;">
			<!--商品-->
			<scroll-view style="height: 100%" scroll-y="true" scroll-with-animation :catchtouchmove="false" v-show="!changeIndex && isLogin">
				<view class="container"><collect-list ref="mycar" @delBtn="onShwoPop" @touchEv="touchEv" class="sideslip-car" :carts="goodsList" :isLoading='isLogin'></collect-list></view>
				<view class="h-100 bg-fff"></view>
				<!-- <view class="h-200 bg-000 bd-15" v-for="item in 11"></view> -->
			</scroll-view>
			<!--品牌-->
			<scroll-view style="height: 100%" scroll-y="true" scroll-with-animation :catchtouchmove="false" v-show="changeIndex">
				<view class="container" v-if='goodsList.length > 0'><brands v-for="(item, index) in goodsList" :key="index" :item="item"></brands></view>
				<view class=" h-700 bg-fff"  v-if='goodsList.length == 0 && isLogin'>
					<view class="hint-box dp-f fd-c ai-c">
						<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/xxsx/image/qs4.jpg" mode="widthFix" style="margin-top: 122rpx;"></image>
						<text class="fs-32 c-333 " style="padding: 60rpx 0 80rpx 0;">您未有收藏品牌</text>
						<view class="w-220 h-80 lh-80 color-fff bg-000 ta-c" @click="goClass">去逛逛</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 删除 -->
		<shade v-show="shwoPop">
			<view class="w-580 h-282 bg-fff br-6 ov-h">
				<view class="h-200 lh-200 ta-c fs-32 color-9">确认要删除收藏品吗？</view>
				<view class="h-800 bt-ed dp-f">
					<view class="f-1 ta-c lh-80 c-15 fw-b" @click="shwoPop = false">我再想想</view>
					<view class="f-1 ta-c lh-80 c-15 fw-b bl-ed" @click="delBtn">确定</view>
				</view>
			</view>
		</shade>
	</view>
</template>

<script>
import brands from '@/components/brands/brands';
import navTab from '@/components/navTab/navTab';
import collectList from '@/components/collectList/collectList';
import filtratePop from '@/components/filtratePop/filtratePop';
import popupLayer from '@/components/popup/popup-layer';
import shade from '@/components/shadeBox/shade.vue';
export default {
	components: {
		collectList,
		filtratePop,
		popupLayer,
		shade,
		navTab,
		brands
	},
	data() {
		return {
			tabTitle: ['商品', '品牌'],
			changeIndex: 0,
			activeColor: '#151515',
			textColor: '#151515',
			fontSize: '30',
			paddingT: 20,
			paddingB: 20,
			borderW: 60,
			isBorder: true,
			//分割
			shwoPop: false,
			goodsPage: 1,
			goodsList: [], //商品列表
			delId: null, //删除id
			delIndex: null, //删除下标
			isLogin: false
		};
	},
	onLoad() {},
	onShow() {
		if (this.changeIndex == 0) {
			this.getLikeGoods();
		} else {
			this.getLikeBrand();
		}
	},
	watch: {},
	computed: {},
	methods: {
		goClass(){
			uni.switchTab({
				url:'/pages/classify/classify'
			})
		},
		onShwoPop(list, id, index) {
			console.log('w', list, index, id);
			this.delId = id;
			this.delIndex = index;
			this.shwoPop = true;
		},
		getLikeBrand() {
			this.goodsList = []
			this.isLogin = false;
			this.$refs.loading.open();
			const option = {
				pageIndex: this.goodsPage,
				pageSize: 10
			};
			this.$http.getLikeBrand(option).then(res => {
				let list = res.data.data.records;
				this.goodsList = list;
				this.$refs.loading.close();
				this.isLogin = true;
			});
		},
		getLikeGoods() {
			this.goodsList = []
			this.isLogin = false;
			this.$refs.loading.open();
			const option = {
				pageIndex: this.goodsPage,
				pageSize: 10
			};
			this.$http.getLikeGoods(option).then(res => {
				console.log(res.data.data.records);
				let list = res.data.data.records;
				list.forEach((item, index) => {
					list[index].isTouchMove = false;
				});
				this.goodsList = list;
				this.isLogin = true;
				this.$refs.loading.close();
			});
		},
		changeTab(index) {
			this.changeIndex = index;
			console.log(this.changeIndex);
			if (index == 0) {
				this.getLikeGoods();
			} else {
				this.getLikeBrand();
			}
		},
		showScreen(type) {
			if (type) {
				this.$refs.jfpopupRef.show(); // 或者 boolShow = rue
				return;
			}
			this.$refs.jfpopupRef.close(); // 或者 boolShow = rue
		},
		jsBtn: function(ids) {
			console.log(ids);
		},
		changeNum: function(carts) {
			this.goodsList = carts;
			this.$refs.mycar.getTotalPrice();
		},
		selThis: function(carts) {
			this.goodsList = carts;
			this.$refs.mycar.getTotalPrice();
		},
		selAllBtn: function(carts) {
			this.goodsList = carts;
			this.$refs.mycar.getTotalPrice();
		},
		touchEv: function(carts) {
			this.goodsList = carts;
		},
		delBtn() {
			this.$http.setGoodsLike({ productId: this.delId }).then(res => {
				console.log(this.delIndex);
				this.goodsList.splice(this.delIndex, 1);
				console.log(this.goodsList);
				this.shwoPop = false;
			});
			// this.delId
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}
.collet-nav-box {
	// border: 1px solid #F7F7F7;
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 50;
	background: #fff;
}
.uni-checkbox-input {
	border-radius: 50% !important;
}

.container {
	// height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	background: #fff;
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
	background: #fff;
}

.container {
	width: 100%;
}

.sideslip-car {
	width: 100%;
}

.activeTag {
	border: 1px solid #151515;
}

.dleBtn {
	// position: absolute;
	// right: 0;
	// top: 0;
	width: 134rpx;
	height: 310rpx;
	// line-height: 310rpx;
	text-align: center;
	background: #bfbfbf;
	color: #ffffff;
	// font-size: 30rpx;
	z-index: 9999;
	// -webkit-transition: all 0.3s;
	// transition: all 0.3s;
	// -webkit-transform: translateX(148rpx);
	// transform: translateX(148rpx);
}
</style>
