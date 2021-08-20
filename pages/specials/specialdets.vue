<!--专题详情-->
<template>
	<view>
		<view class="w100 h-480">
			<image src="https://source.unsplash.com/random" class="w100 h-480"></image>
		</view>
		<view class="m-0-a" style="margin-top: 60rpx;">
			<view class="m-0-a ta-c"><text class="c-15 fs-28" style="border-bottom: 2rpx solid #151515;">Acqua di Parma</text></view>
			<view class="m-0-a ta-c fw-b fs-36 mt-20">帕尔玛之水</view>
		</view>
		<!--富文本-->
		<view></view>
		<!--悬浮层-->
		<view class="w-140 h-50 bg-222 c-fff fs-26 dp-f jc-c ai-c shops" @tap="shwoIntegral(true)">商品(6)</view>
		<!--隐藏域-->
		<popup-layer ref="jfpopupRef" :direction="'top'" :autoClose="false">
			<scroll-view  :scroll-y="true">
				<view class="box-pop bg-fff w100 bs-bb p-0-40">
					<view class="dp-f ai-c jc-c pt-40 pb-20">
						<view class="fs-30 ta-c m-0-a">
							文中商品(6)
						</view>
						<view class="iconfont color-333 clearIcon fs-22 fw-w fw-b" @tap="shwoIntegral(false)">
							&#xe66b;
						</view>
					</view>
					<view class="w-660 h-260 dp-f ai-c mt-30 m-0-a" style="border:1px solid #EAEAEA;" v-for="(item,index) in 7">
						<view class="w-200 h-200 ml-20">
							<image src="https://source.unsplash.com/random" class="w-200 h-200"></image>
						</view>
						<view class="w-400 ml-20">
							<view class="fs-28 c-15">38女神节GUCCI 古驰 花之舞淡香 等等等等等等等等等等...</view>
							<view class="dp-f jc-sb" style="margin-top:66rpx;">
								<view class="fs-34 fw-b">￥9.9</view>
								<view class="w-140 h-54 bg-222 c-fff fs-28 dp-f ai-c jc-c">去购买</view>
							</view>
						</view>
					</view>
					<view class="h-30"></view>
				</view>
			</scroll-view>
		</popup-layer>
	</view>
</template>

<script>
	import popupLayer from '@/components/popup/popup-layer.vue'
	export default {
		components:{
			popupLayer
		},
		data() {
			return {
				boolShow:false
			}
		},
		methods: {
			shwoIntegral(type) {
				if (type) {
					this.$refs.jfpopupRef.show(); // 或者 boolShow = rue
					return
				}
				this.$refs.jfpopupRef.close(); // 或者 boolShow = rue
			},
			show() {
				this.$refs.popupRef.show(); // 或者 boolShow = rue
			},
			close() {
				this.$refs.popupRef.close(); // 或者 boolShow = false
			},
		}
	}
</script>

<style>
	.box-pop{
		height: 835rpx;
	}
.shops{
	position: fixed;
	bottom: 120rpx;
	right: 30rpx;
}
</style>
