<template>
	<view >
		<view class="w-690 h-60   m-0-a dp-f ai-c  searchbox" @click="$outerHref('/pages/search/search')">
			<image src="../../static/icon/search.png" class="w-26 h-26 pl-30"></image>
			<view class="pl-30 fs-26 color-9e">{{data.date.text || '搜索品牌或商品'}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['data']
	}
</script>

<style scoped>
	.searchbox {
		background-color: #f8f8f8;
	}
</style>
