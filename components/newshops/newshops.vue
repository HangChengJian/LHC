<template>
	<view class="">
		<view class="m-0-a dp-f w-690" :style="{'background':info.productBackgroundColour}" @click="lockGs(item.id)">
			<view class="w-320 "><image :src="item.coverImage" class="w-320 h-320" mode="widthFix"></image></view>
			<view class="w-370 h-350" >
				<view class="fs-32 fw-b mt-30 ml-20" :style="{'color':info.productTitleColour}">{{item.name}}</view>
				<view class="c-999 fs-24 ml-20 mt-6" :style="{'color':info.productSubTitleColour}">{{item.subTitle}}</view>
				<view class="fs-46 fw-b ml-20 mt-28" :style="{'color':info.productPriceColour}" >￥9.9</view>
				<view class="w-330 h-60 fs-32 fw-b ml-20 mt-24 dp-f jc-c ai-c" :style="{'background':info.productButtonBackgroundColour,'color':info.productButtonColour}">立即购买</view>
			</view>
		</view>
		<view class="w-690 h-30 m-0-a"></view>
	</view>
</template>

<script>
	export default {
		props:['item','info'],
		data() {
			return {
				
			}
		},
		methods: {
			lockGs(id){
				uni.navigateTo({
					url: '/pages/goodsDetails/goodsDetails?id='+id,
				});
			}
		}
	}
</script>

<style>

</style>
