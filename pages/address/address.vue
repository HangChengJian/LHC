<template>
	<view class="ov-h address-box">
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<scroll-view style="height: 100vh" scroll-y="true" scroll-with-animation :catchtouchmove="false">
			<view class="container">
				<address-list
					ref="mycar"
					class="sideslip-car"
					@selAllBtn="selAllBtn"
					@delBtn="delBtn"
					@touchEv="touchEv"
					@selThis="selThis"
					@jsBtn="jsBtn"
					@changeNum="changeNum"
					@onClick="onClick"
					:carts="list"
				></address-list>
			</view>
			<view class="bg-fff h-500"></view>
			<view class="address-footer" @click="goAdd">
				<view class="bg-222  h-82 lh-82 mt-124 ta-c fs-28 c-fff address-add">
					<text class="iconfont c-fff pr-20">&#xe624;</text>
					添加收货地址
				</view>
			</view>
		</scroll-view>
		<!-- 删除 -->
		<shade v-show="shwoPop">
			<view class="w-580 h-282 bg-fff br-6 ov-h">
				<view class="h-200 lh-200 ta-c fs-32 color-9">确认要删除该地址吗？</view>
				<view class="h-800 bt-ed dp-f">
					<view class="f-1 ta-c lh-80 c-15 fw-b fs-32" @click="shwoPop = false">我再想想</view>
					<view class="f-1 ta-c lh-80 c-15 fw-b bl-ed fs-32" @click="onDelBtn">确定</view>
				</view>
			</view>
		</shade>
		<view class=" dp-f fd-c ai-c" v-show="false">
			<!-- <image src="../../static/icon/icon-02.png" class="w-319 h-319 mt-193"></image> -->
			<view class="fs-32 color-15 mt-80">您还未添加收货地址</view>
			<view class="fs-28 color-9 mt-11">快去添加吧~</view>
			<view class="bg-222 w-355 h-82 lh-82 mt-124 ta-c fs-28 c-fff">
				<text class="iconfont c-fff pr-20">&#xe624;</text>
				添加收货地址
			</view>
		</view>
	</view>
</template>

<script>
import addressList from '@/components/addressList/addressList';
import filtratePop from '@/components/filtratePop/filtratePop';
import popupLayer from '@/components/popup/popup-layer';
import shade from '@/components/shadeBox/shade.vue';
export default {
	components: {
		addressList,
		filtratePop,
		popupLayer,
		shade
	},
	data() {
		return {
			shwoPop: false,
			list: [{}], // 地址列表
			newList: [], //刷新列表
			deleteId: null, //删除地址id
			deleteIndex: null //删除地址下标
		};
	},
	onLoad() {},
	onShow() {
		this.$refs.loading.open();
		this.getAddress();
	},
	watch: {},
	computed: {},
	methods: {
		onClick(item) {
			let pages = getCurrentPages(); //当前页面
			let prevPage = pages[pages.length - 2]; //上一页面
			console.log(prevPage.$page.fullPath.length >=60)
			if (prevPage.$page.fullPath.length >=60) {
				prevPage.$vm.orderInfo.address = item; //修改上一页data里面的acitveAddress参数值为选择地址
				uni.navigateBack({
					delta: 1
				});
			}
		},
		getAddress() {
			this.$http.getAddress().then(res => {
				let addressList = res.data.data;
				addressList.reverse();
				this.list = addressList;

				this.list.forEach((item, index) => {
					this.list[index].isTouchMove = false;
				});
				this.$refs.loading.close();
			});
		},
		// 新建地址
		goAdd() {
			uni.navigateTo({
				url: '/pages/addressUpdate/addressUpdate'
			});
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
		changeNum: function(list) {
			this.list = list;
			this.$refs.mycar.getTotalPrice();
		},
		selThis: function(list) {
			this.list = list;
			this.$refs.mycar.getTotalPrice();
		},
		selAllBtn: function(list) {
			this.list = list;
			this.$refs.mycar.getTotalPrice();
		},
		touchEv: function(list) {
			this.list = list;
		},
		delBtn: function(list, ids, index) {
			console.log(ids, index);
			this.newList = list;
			this.deleteId = ids;
			this.deleteIndex = index;
			this.shwoPop = true;
		},
		onDelBtn() {
			this.$http.delAddress(this.deleteId).then(res => {
				this.newList.splice(this.deleteIndex, 1);
				this.list = this.newList;
				this.$refs.mycar.getTotalPrice();
				this.shwoPop = false;
				uni.showToast({
					title: '删除成功'
				});
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}

.address-box {
	.address-footer {
		position: fixed;
		width: 100%;
		bottom: 0;
		padding-bottom: 80rpx;
		left: 0;
	}
	.address-add {
		width: 93%;
		margin: 0 auto;
	}

	.collet-nav-box {
		border: 1px solid #f7f7f7;
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
		height: 100%;
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
}
</style>
