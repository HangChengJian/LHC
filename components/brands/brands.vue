<template>
	<view>
		<view class="w100 ">
			<view class="w100 h-100 dp-f ai-c jc-sb mt-30">
				<view class="dp-f ai-c ml-30">
					<image :src="item.logoUrl" class="w-100 h-100 br-100"></image>
					<view class="ml-30">
						<view class="fw-b fs-32" style="color: #080808;">{{item.titleEn}}</view>
						<view class="c-999 fs-26">{{item.title}}</view>
					</view>
				</view>
				<view class="fs-28 c-15 mr-30" @click="$outerHref('/pages/classifydet/classifydet?id='+item.id)">
					进入品牌
					<text class="iconfont fs-22 color-000 ml-10">&#xe601;</text>
				</view>
			</view>
			<view class="fs-26 c-666 mt-30 w-690 m-0-a">
				{{item.story}}
			</view>
			<view class="mt-20 dp-f" style="justify-content: space-evenly;">
				<view class="w-210" v-for='(items,index) in item.products' :key='index' @click="$outerHref('/pages/goodsDetails/goodsDetails?id='+items.id)">
					<view class="w-210 h-210 m-0-a"><image :src="items.coverImage" class="w-210 h-210"></image></view>
					<view class="fs-28 c-15 m-0-a mt-10 ta-c">{{items.name}}</view>
				</view>
			</view>
			<view class="w-750 mt-30 h-14 " style="background: #F6F6F6;"></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:['item'],
		data() {
			return {
				
			}
		},
		methods: {
			lockBrand(){
				uni.navigateTo({
					url:''
				})
			}
		}
	}
</script>

<style>

</style>
