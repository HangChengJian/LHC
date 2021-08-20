<!--新品推荐-->
<template>
	<view class="con">
		<view class="w-750 m-0-a">
			<!--banner-->
		<view class="w-750 h-750 m-0-a"><image :src="info.coverImage" class="w-750 h-750"></image></view>
			<view class="w-750 m-0-a"  :style="{'background':info.backgroundColour}">
				<view class="fw-b fs-40 pt-40 ta-c">{{info.title }}</view>
				<view class="w-160 m-0-a mt-10" style="border: 1px solid #151515;"></view>
				<view class="mt-40">
					<view v-for="(item,index) in info.newProductRecommend" :key="index">
						<newshops :item='item' :info='info'></newshops>
					</view>
				</view>
			</view>
		</view>
		<!--更多推荐-->
		<view class="mt-40">
			<view class="fw-b fs-38 ta-c">更多推荐</view>
			<view class="w-160 m-0-a mt-10" style="border: 1px solid #151515;"></view>
			<view class="mt-20 w-690 m-0-a dp-f fw-w jc-sb">
				<view v-for="(item,i) in info.moreProductRecommend" :key="i" class="mb-60">
					<goods-module :item='item'></goods-module>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import goodsModule from '@/components/goodsModule/goodsModule.vue'
	import newshops from '@/components/newshops/newshops.vue'
	export default {
		components: {
			goodsModule,
			newshops
		},
		onLoad() {
			this.$http.getConfig({ type: 3 }).then(({ data: data }) => {
				this.info = data.data;
				uni.setNavigationBarTitle({
					title: this.info.title 
				});
			});
		},
		data() {
			return {
				info:{},
				newshoplist:[
					{
						id:1,
						title:'形容香水产品的短句',
						des:'香水香水香水香水香水香水香',
						price:'￥9.9'
					},
					{
						id:1,
						title:'形容香水产品的短句',
						des:'香水香水香水香水香水香水香',
						price:'￥9.9'
					},
					{
						id:1,
						title:'形容香水产品的短句',
						des:'香水香水香水香水香水香水香',
						price:'￥9.9'
					}
				],
				gosshop: [{
						id: 1,
						title: 'GUCCL',
						desc: 'GUCCI 古驰 花之舞 淡...',
						price: '￥58.00'
					},
					{
						id: 2,
						title: 'GUCCL',
						desc: 'GUCCI 古驰 花之舞 淡...',
						price: '￥58.00'
					},
					{
						id: 3,
						title: 'GUCCL',
						desc: 'GUCCI 古驰 花之舞 淡...',
						price: '￥58.00'
					},
					{
						id: 4,
						title: 'GUCCL',
						desc: 'GUCCI 古驰 花之舞 淡...',
						price: '￥58.00'
					},
					{
						id: 5,
						title: 'GUCCL',
						desc: 'GUCCI 古驰 花之舞 淡...',
						price: '￥58.00'
					},
					{
						id: 6,
						title: 'GUCCL',
						desc: 'GUCCI 古驰 花之舞 淡...',
						price: '￥58.00'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">

</style>
