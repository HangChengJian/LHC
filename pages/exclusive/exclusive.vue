<template>
	<view class="exclusive-box" :style="{ background: info.backgroundColour }">
		<image :src="info.coverImage" class="h-750 w100"></image>
		<view class="dp-fc">
			<view class="fs-40 fw-b pt-50 pb-10" style="border-bottom: 1px solid #222;">{{ info.title || '' }}</view>
		</view>
		<view class="goods-list">
			<view class="mt-50 w-336" v-for="(item, index) in info.productList" @click.stop="lockGoods(item.id)" :key="index">
				<view class="gs-cover dp-fc"><image :src="item.coverImage" class="h-336 w100"></image></view>
				<view class="fs-26  c-15 mt-20 t-ohs h-72">{{ item.name }}</view>
				<view class="dp-f jc-sb ai-c mt-20">
					<view class="fs-32 fw-b color-a29">￥{{ item.price }}</view>
					<view class="iconfont" @click.stop="addCart(item)">&#xe60d;</view>
				</view>
			</view>
		</view>
		<!-- 规格弹窗 -->
		<specification ref="cartPopupRef" :btnType="false" :goodsInfo="goodsInfo" :activeInfo="activeInfo" @changeSize="changeSize" @emptyInfo="emptyInfo"></specification>
	</view>
</template>

<script>
import popupLayer from '@/components/popup/popup-layer.vue';
import specification from '@/components/specification/specification.vue';
export default {
	components: {
		popupLayer,
		specification
	},
	data() {
		return {
			info: {},
			goodsInfo: {},
			activeInfo: {} //选中规格
		};
	},
	onLoad() {
		this.$http.getConfig({ type: 1 }).then(({ data: data }) => {
			this.info = data.data;
			uni.setNavigationBarTitle({
				title: this.info.title 
			});
		});
	},
	onShow() {},
	watch: {},
	computed: {},
	methods: {
		// 重置选中规格
		emptyInfo() {
			this.activeInfo = {};
		},
		changeSize(item) {
			this.activeInfo = item;
		},
		lockGoods(id) {
			uni.navigateTo({
				url: '/pages/goodsDetails/goodsDetails?id=' + id
			});
		},
		addCart(item) {
			console.log(item);
			this.goodsInfo = item;
			this.$refs.cartPopupRef.showPop();
		},
		closeCatr() {
			this.$refs.cartPopupRef.close();
		}
	}
};
</script>

<style lang="scss" scoped>
.exclusive-box {
	.goods-list {
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding-bottom: 100rpx;
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
