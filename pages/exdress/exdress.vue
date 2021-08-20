<!--体验装-->
<template>
	<view class="">
		<!--搜索-->
		<view class="w-690 h-60  mt-12  m-0-a dp-f ai-c  searchbox">
			<image src="../../static/icon/search.png" class="w-26 h-26 pl-30"></image>
			<view class="pl-30 fs-26 color-9e">
				搜索品牌内商品
			</view>
		</view>
		<!--banner-->
		<view class="mt-30 m-0-a w-690 h-420">
			<image src="https://source.unsplash.com/random" class="w-690 h-420"></image>
		</view>
		<!--商品-->
		<view>
			<classtit @showScreen='showScreen(true)'></classtit>
		</view>
		<!-- 筛选 -->
		<popup-layer ref="jfpopupRef" :direction="'left'" :autoClose="false">
			<filtrate-pop @showScreen='showScreen'></filtrate-pop>
		</popup-layer>
	</view>
</template>

<script>
	import classtit from '@/components/classtit/classtit'
	import popupLayer from '@/components/popup/popup-layer'
	import filtratePop from '@/components/filtratePop/filtratePop'
	export default {
		components: {
			classtit,
			popupLayer,
			filtratePop
		},
		data() {
			return {
				
			}
		},
		methods: {
			showScreen(type){
				if(type){
					this.$refs.jfpopupRef.show(); // 或者 boolShow = rue
					return
				}
				this.$refs.jfpopupRef.close(); // 或者 boolShow = rue
			}
		}
	}
</script>

<style scoped lang="scss">
	.searchbox {
		background-color: #F8F8F8;
	}
	.box-pop{
		width: 538rpx;
		padding-top: 20rpx;
		position: relative;
		height: 100%;
	}
	.activeTag{
		border: 1px solid #151515;
	}
	
</style>
