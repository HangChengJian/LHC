<template>
	<view>
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<!--banner-->
		<view class="w-750 h-580"><image :src="info.bgImage" class="w-750 h-580"></image></view>
		<!--文案-->
		<view class="w-160 mt-50 m-0-a mb-30" style="border: 1px solid #151515;" v-show='info.name'></view>
		<view class="bg-fff html-box"><rich-text class="content" :nodes="info.description"></rich-text></view>
		<view class="w-160 mt-30 m-0-a" style="border: 1px solid #151515;"  v-show='info.name'></view>
		<!--商品内容-->
		<view>
			<view class="mt-20 w-690 m-0-a dp-f fw-w jc-sb">
				<view v-for="(item, i) in info.productList" :key="i" class="mb-60"><goods-module :item="item"></goods-module></view>
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
	onLoad(option) {
		// 开启loading
		this.$nextTick(() => {
			this.$refs.loading.open();
		});
		this.$http.getSmellDetail({ id: option.id }).then(({ data: data }) => {
			this.$refs.loading.close();
			console.log(data.data);
			this.info = data.data;
			uni.setNavigationBarTitle({
				title: this.info.name 
			});
		});
	},
	data() {
		return {
			info: {}
		};
	},
	methods: {}
};
</script>

<style scoped>
.html-box {
	text-align: center;
	font-size: 26rpx;
}
</style>
