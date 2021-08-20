<!--设置-->
<template>
	<view class="">
		<view class="w-750 h-107 btss bbss dp-f ai-c jc-sb" v-if='userData.phone'>
			<view class="c-15 fs-26 ml-30">手机号</view>
			<view class="dp-f h-128 ai-c">
				<view class="fs-26 c-999" style="margin-right: 30rpx;">{{userData.phone}}</view>
				<!-- <view class="iconfont mr-30">&#xe62b;</view> -->
			</view>
		</view>
		<view class="w-750 h-107  bbss dp-f ai-c jc-sb" v-else  @click="$outerHref('/pages/userRegister/userRegister?isBinding=1')">
			<view class="c-15 fs-26 ml-30">绑定手机号</view>
			<view class="dp-f h-128 ai-c">
				<view class="fs-26 c-999" style="margin-right: 30rpx;">未绑定</view>
				<view class="iconfont mr-30">&#xe62b;</view>
			</view>
		</view>
		<!-- <view class="w-750 h-107  bbss dp-f ai-c jc-sb" @click="asscheck">
			<view class="c-15 fs-26 ml-30">关联账号</view>
			<view class="dp-f h-128 ai-c">
				<view class="fs-26 c-999" style="margin-right: 48rpx;">
					<image src="../../static/user/wx.png" class="w-48 h-48 pl-10"></image>
					<image src="../../static/user/wb.png" class="w-48 h-48 pl-10"></image>
					<image src="../../static/user/zfb.png" class="w-48 h-48 pl-10"></image>
					<image src="../../static/user/qq.png" class="w-48 h-48 pl-10"></image>
				</view>
				<view class="iconfont mr-30">&#xe62b;</view>
			</view>
		</view>
		<view class="w-750 h-107  bbss dp-f ai-c jc-sb">
			<view class="ml-30 c-15  fs-26">登陆设备管理</view>
			<view class="iconfont mr-30">&#xe62b;</view>
		</view>
		<view class="w-750 h-107  bbss dp-f ai-c jc-sb">
			<view class="ml-30 c-15  fs-26">安全中心</view>
			<view class="iconfont mr-30">&#xe62b;</view>
		</view>
		<view class="w-750 h-107  bbss dp-f ai-c jc-sb">
			<view class="ml-30 c-15  fs-26">小程序分享</view>
			<view class="iconfont mr-30">&#xe62b;</view>
		</view> -->
		<!-- <view class="w-750 h-107  bbss dp-f ai-c jc-sb">
			<view class="ml-30 c-15  fs-26">关于我们</view>
			<view class="iconfont mr-30">&#xe62b;</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData:{}
			}
		},
		onShow() {
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.userData = userInfo
		},
		methods: {
			asscheck () {
				//账号关联
				uni.navigateTo({
					url: '/pagesA/setup/accass',
				});
			}
		}
	}
</script>

<style>
	.btss{
		 border-top: 1px solid #EAEAEA;
	}
	.bbss{
		 border-bottom: 1px solid #EAEAEA;
	}
</style>
