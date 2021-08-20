<template>
	<view >
		<view v-for="(item,a) in list" :key='a'>
			<view class="mt-50 ml-30 dp-f  ai-c">
				<view class="w-13 h-4" style="background: #151515;"></view>
				<view class="fw-b fs-28 c-333 ml-6 new-font">{{item.categoryName}}</view>
			</view>
			<view class="mt-20 ml-30 dp-f">
				<scroll-view :scroll-x="true">
					<view class="dp-f">
						<view v-for='items in item.tags' :key='items.id' @click="checkd(items.id)">
							<view class="w-270 h-360 dp-f jc-c ai-c mr-28" style="position: relative;">
								<view class="c-fff fs-38 new-font" style="position: absolute;top: 122rpx;z-index: 500;">{{items.name}}</view>
								<view class="c-fff fs-38 mt-40 ta-c new-font" style="position: absolute;z-index: 500;">{{items.nameEn}}</view>
								<image :src="items.coverImage" class="w-270 h-360"></image>
								<view class="shadow-box">
									
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props:{
			list:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
			}
		},
		onLoad(){},
		onShow() {},
		watch:{},
		computed:{},
		methods:{
			checkd(id){
				console.log(id)
				uni.navigateTo({
					url: '/pages/orangetune/orangetune?id='+id,
				});
			}
		},
	}
</script>

<style>
.new-font{
	/* font-family: "kt"; */
}
.shadow-box{
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.3);
	
}
</style>
