<template>
	<view class="coupon-list-box " :class="{'coupon-none':isDisable}" >
		<view class="coupon-num dp-f ai-c jc-sb">
			<view class="dp-f ai-c">
				<view class="">
					<image v-if="preferentialData.couponType==4" src="../../static/user/free.jpg" class="w-100 h-100"></image>
					<text v-if="preferentialData.couponType!=4" class="fs-30 color-d0 none-color">￥</text>
					<text v-if="preferentialData.couponType!=4" class="fs-60 color-d0 none-color">{{preferentialData.couponAmount}}</text>
				</view>
				<view class="pl-40">
					<view class="fs-24 c-15 mb-16 none-color">
						{{preferentialData.couponName}}
					</view>
					<view class="fs-24 c-15 none-color">
						{{preferentialData.couponMinPoint?'满'+preferentialData.couponMinPoint+'元可使用':'无门槛'}}
					</view>
				</view>
			</view>
			<view  class="w-128 h-56 lh-56 ta-c fs-24 bd-d0 color-d0 none-color none-bd">
				立即使用
			</view>
		</view>
		<view class="fs-26 c-15 fw-b pt-30 none-color">
			{{couponUseTypeFn(preferentialData.couponUseType)}}
		</view>
		<view class="pt-10 fs-24 c-999 none-color">
			使用说明：
		</view>
		<view class="pt-10 fs-24 c-999 none-color">
			有效期：{{preferentialData.effectiveStartTime}}：{{preferentialData.effectiveEndTime}}
		</view>
	</view>
</template>

<script>
	// import  from '@/components/'
	export default {
		props:{
			isDisable:{
				type: Boolean,
				default :false
			},
			preferentialData:{
				type:Object,
				default :()=>{}
			}
		},
		components: {},
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
			couponUseTypeFn(item){
				if(item==0){
					return '适用所有商品'
				}else if(item==1){
					return '适用指定分类商品'
				}else if(item==2){
					return '适用指定商品'
				}else if(item==3){
					return '适用指定品牌商品'
				}else{
					return '其他'
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.coupon-num {
		border-bottom: 1px dashed #D4D4D4;
		padding-bottom: 30rpx;
	}
	
	.coupon-list-box {
		width: 100%;
		height: 320rpx;
		background: #fff;
		// margin-bottom: 30rpx;
		box-sizing: border-box;
		padding: 30rpx 30rpx 23rpx 30rpx;
	}
	
	.nav-box {
		height: 86rpx;
		border-bottom: 1px solid #EAEAEA;
	}
	
	.code-box {
		background: #fff;
		border: 1px solid #F0F0F0;
	}
</style>
