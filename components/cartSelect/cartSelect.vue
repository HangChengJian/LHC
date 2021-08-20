<template>
	<view class="cartSelect" style="transform-style: preserve-3d;">
		<view class="ta-c   il-box   fs-24 value-box" @click.stop="onSelect">
			{{ data.isPackage ? (data.activityCode?'包含'+data.skuList.length + '件商品':data.packageSkuInfo.otherName) : sku.name }}
			<text class="jt iconfont" :class="{ 'no-right': data.isPackage ? true : false }">&#xe63b;</text>
			<!-- 	<view class="value-box  " >
				<view class="fs-24 color-15">
					111
				</view>
				<text class="jt iconfont">
					&#xe63b;
				</text>
			</view> -->
		</view>
	</view>
</template>

<script>
// import  from '@/components/'
export default {
	components: {},
	props: {
		sku: {
			type: Object,
			default: {}
		},
		data: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			showSelect: false
		};
	},
	onLoad() {},
	onShow() {},
	watch: {},
	computed: {},
	methods: {
		onSelect() {
			this.$emit('showSelect');
		}
	}
};
</script>

<style lang="scss" scoped>
.cartSelect {
	.no-right {
		right: 0 !important;
	}
	.jt {
		position: absolute;
		top: 2rpx;
		right: 2rpx;
		line-height: 16px;
	}
	.value-box {
		border: 1px solid #e7e7e7;
		height: 48rpx;
		line-height: 48rpx;
		padding-left: 10rpx;
		padding-right: 40rpx;
		position: relative;
		transform: translateZ(999);
		z-index: 999;
	}
	// .select-list {
	// 	position: absolute;
	// 	top: 0;
	// 	left: 0;
	// 	border: 1px solid #e7e7e7;
	// 	width: 90rpx;
	// 	overflow: hidden;
	// 	z-index: 999;
	// 	background: #fff;
	// 	transform: translateZ(999);
	// 	.list {
	// 		height: 55rpx;
	// 		line-height: 45rpx;
	// 		padding: 0 10rpx;
	// 		border-bottom: 1px solid #e7e7e7;
	// 		font-size: 24rpx;
	// 		transform: translateZ(999);
	// 		z-index: 999;
	// 		min-width: 112rpx;
	// 		max-width: 400rpx;
	// 	}
	// }
}
</style>
