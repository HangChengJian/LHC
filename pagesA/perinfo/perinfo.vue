<!--个人信息-->
<template>
	<view class="con">
		<!--信息列表-->
		<view class="w-750 h-128 btss dp-f ai-c jc-sb">
			<view class="c-15 fs-26 ml-30">头像</view>
			<view class="dp-f h-128 ai-c">
				<view class="w-88 h-88" style="margin-right: 60rpx;">
					<image :src="userData.icon" class="w-88 h-88 br-90"></image>
				</view>
				<!-- <view class="iconfont mr-30">&#xe62b;</view> -->
			</view>
		</view>
		<view class="w-750 h-97 btss dp-f ai-c jc-sb">
			<view class="c-15 fs-26 ml-30">昵称</view>
			<view class="dp-f h-128 ai-c">
				<view class="fs-26 c-15" style="margin-right: 30rpx;">{{userData.nickname}}</view>
				<!-- <view class="iconfont mr-30">&#xe62b;</view> -->
			</view>
		</view>
		<view class="w-750 h-97 btss dp-f ai-c jc-sb">
			<view class="c-15 fs-26 ml-30">手机号</view>
			<view class="dp-f h-128 ai-c" v-if='userData.phone'>
				<view class="fs-26 c-999" style="margin-right: 30rpx;">{{userData.phone}}</view>
			</view>
			<view class="dp-f h-128 ai-c" v-else @click="$outerHref('/pages/userRegister/userRegister?isBinding=1')">
				<view class="fs-26 c-999" style="margin-right: 30rpx;">绑定手机号</view>
				<view class="iconfont mr-30">&#xe62b;</view>
			</view>
		</view>
		 <!-- @tap="handleTap('picker1')" -->
		<view class="w-750 h-97 btss dp-f ai-c jc-sb">
			<view class="c-15 fs-26 ml-30">性别</view>
			<view class="dp-f h-128 ai-c">
				<view class="fs-26 c-999" style="margin-right: 30rpx;">{{userGender}}</view>
				<!-- <view class="iconfont mr-30">&#xe62b;</view> -->
			</view>
		</view>
	<!-- 	<lb-picker ref="picker1" v-model="userGender" mode="selector" :list="list1" :confirm-color='confirmColor'
			:dataset="{ name: 'label1' }" >
		</lb-picker> -->
		<!-- <view class="w-750 h-97 btss dp-f ai-c jc-sb" @tap="handleTap('picker2')">
			<view class="c-15 fs-26 ml-30">生日</view>
			<view class="dp-f h-128 ai-c">
				<view class="fs-26 c-999" style="margin-right: 30rpx;">{{userBirthday?userBirthday:'未设置'}}</view>
				<view class="iconfont mr-30">&#xe62b;</view>
			</view>
		</view>
		<lb-picker ref="picker2" v-model="userBirthday" mode="dateSelector"  :confirm-color='confirmColor'>
		</lb-picker>
		<view class="w-750 h-97 btss dp-f ai-c jc-sb" @tap="handleTap('picker3')">
			<view class="c-15 fs-26 ml-30">地区</view>
			<view class="dp-f h-128 ai-c">
				<view class="fs-26 c-999" style="margin-right: 30rpx;">{{userAdderss?userAdderss:'请选择'}}</view>
				<view class="iconfont mr-30">&#xe62b;</view>
			</view>
		</view>
		<lb-picker ref="picker3" v-model="userAdderss" mode="multiSelector" @change="handleChange" @confirm="handleConfirm"
			@cancel="handleCancel" :list="list2"  :level="1" :dataset="{ name: 'label1' }"  :confirm-color='confirmColor'>
		</lb-picker>
		<view class="w-750 h-97 btss dp-f ai-c jc-sb">
			<view class="c-15 fs-26 ml-30">微信号</view>
			<view class="dp-f h-128 ai-c">
				<view class="fs-26 c-999" style="margin-right: 30rpx;">请填写</view>
				<view class="iconfont mr-30">&#xe62b;</view>
			</view>
		</view> -->
		<view class="w-750 h-97 btss dp-f ai-c jc-sb" @click="$outerHref('/pages/address/address')">
			<view class="c-15 fs-26 ml-30">收货地址</view>
			<view class="dp-f h-128 ai-c">
				<view class="iconfont mr-30">&#xe62b;</view>
			</view>
		</view>
		<view class="w-750 h-14 bg-f6"></view>
		<!-- <view>
			<view class="w-750 h-87 bbss dp-f ai-c jc-sb">
				<view class="c-999 fs-26 ml-30">通用设置</view>
			</view>
			<view class="w-750 h-143 bbss dp-f ai-c jc-sb">
				<view class="c-15 fs-26 ml-30">
					<view class="c-15 fs-26">个性化推荐</view>
					<view class="mt-13 fs-24 c-999">开启后可看到你感兴趣的内容，建议开启</view>
				</view>
				<view class="dp-f h-143 ai-c">
					<view class="fs-26 c-999" style="margin-right: 30rpx;">已允许</view>
					<view class="iconfont mr-30">&#xe62b;</view>
				</view>
			</view>
		</view> -->
		<view class="w100 h-100 lh-100 ta-c fs-34 c-fff bg-222 outBtn" @click="onOut">
			退出
		</view>
	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker'
	import areaData from '../../common/js/area-data-min.js'
	export default {
		components: {
			LbPicker
		},
		data() {
			return {
				userData:null,
				confirmColor: '#151515',
				userGender: "",
				userBirthday:'',
				userAdderss:'',
				list2: areaData,
				list1: [{
						label: '男',
						value: '男'
					},
					{
						label: '女',
						value: '女'
					}
				],
			}
		},
		onLoad(){
			
		},
		onShow() {
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.userData = userInfo
			if(userInfo.gender == "1"){
				this.userGender = '男'
			}else if(userInfo.userInfo == "2"){
				this.userGender = '女'
			}else{
				this.userGender = '未知'
			}
		},
		methods: {
			onOut(){
				uni.removeStorage({
				    key: 'Token',
				    success:(res)=> {
						uni.navigateBack({
						    delta: 1
						});
				    }
				});
			},
			handleTap(name) {
				this.$refs[name].show()
			},
			handleChange(e) {
				console.log('change::', e)
			},
			handleConfirm(e) {
				// 如果存在多个picker，可以在picker上设置dataset属性，confirm中获取，就能区分是哪个picker了
				console.log('confirm::', e)
				this.userAdderss = e.item[0].label
				if (e) {
					const name = e.dataset.name
					const label = e.item.label
					if (name && label) {
						this[name] = label
					}
				}
			},
			handleCancel(e) {
				console.log('cancel::', e)
			}
		}
	}
</script>

<style scoped>
	.btss {
		border-top: 1px solid #EAEAEA;
	}
	
	.bbss {
		border-bottom: 1px solid #EAEAEA;
	}
</style>
