<template>
	<view class="" @click="lockGs(item.id)">
		<view class="goods-module w-336 dp-f jc-c fd-c" v-if='type == 1'>
			<view class="w-336 h-336 bg-f6 dp-f ai-c jc-c">
				<image :src="item.coverImage" mode="" class="w-336 h-336"></image>
			</view>
			<view class="fs-32 ta-c  t-ohs pt-20 h-86" style="white-space: break-spaces;">
				{{item.name?item.name:item.goodsName}}
			</view>
			<view class="t-oh fs-24 color-60 pt-10 ta-c">
				{{item.description}}
			</view>
			<view class="fs-32 ta-c fw-b t-oh pt-12">
				￥{{item.price}}
			</view>
		</view>
		<view class="goods-module w-336 dp-f jc-c fd-c" v-if='type == 2'>
			<image src="https://source.unsplash.com/random" mode="" class="w100 h-336"></image>
			<view class="fs-32 ta-c fw-b t-oh pt-20">
				GUCCIG
			</view>
			<view class="t-oh fs-30 color-15 pt-6">
				GUCCI 古驰 花之舞GUCCI 古驰 花之舞GUCCI 古驰 花之舞
			</view>
			<view class="fs-24 ta-c fw-b t-ohs pt-20 color-94">
				100积分+￥58.00
			</view>
			<view class="fs-22 ta-c fw-b t-oh pt-10 color-9">
				已兑换999件
			</view>
		</view>
	</view>
	
</template>
<script>
	export default {
		components: {},
		props: {
			//不同布局样式
			type: {
				type: Number,
				default: 1
			},
			item:{
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad(){},
		onShow() {},
		watch:{},
		computed:{},
		methods:{
			lockGs(id){
				uni.navigateTo({
					url: '/pages/goodsDetails/goodsDetails?id='+id,
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.goods-module{
		
	}
</style>
