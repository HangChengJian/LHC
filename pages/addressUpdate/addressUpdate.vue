<template>
	<view class="address-update-box">
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<view class="list-box" @click="onFocus1">
			<view class="fs-26  c-15 pt-30">收货人</view>
			<view class="input-box  mt-20">
				<input type="text" value="" class="fs-32 c-15" :focus='input1' placeholder="收货人姓名" placeholder-class="placeholder-color" v-model="userName" />
			</view>
		</view>
		<view class="list-box" @click="onFocus2">
			<view class="fs-26  c-15 pt-60">手机号码</view>
			<view class="input-box  mt-20">
				<input type="text" value="" class="fs-32 c-15" :focus='input2' placeholder="收货人手机号" placeholder-class="placeholder-color" v-model="userphone" />
			</view>
		</view>
		<view class="list-box" @tap="handleTap('picker3')">
			<view class="fs-26  c-15 pt-60">所在地区</view>
			<view class="input-box  mt-20">
				<view class="fs-32" :class="{ 'c-15': userRegionText, 'color-c0': !userRegionText }">{{ userRegionText ? userRegionText : '省、市、县（区）' }}</view>
			</view>
		</view>
		<lb-picker
			ref="picker3"
			v-model="userAddress"
			confirm-color="#151515"
			cancel-color="#151515"
			mode="multiSelector"
			:list="list1"
			:level="3"
			:dataset="{ name: 'label4' }"
			@change="handleChange"
			@confirm="handleConfirm"
			@cancel="handleCancel"
		></lb-picker>
		
		<view class="list-box" @click="onFocus3">
			<view class="fs-26  c-15 pt-60">详细地址</view>
			<view class="input-box  mt-20 dp-f ai-c jc-sb">
				<input type="text" value="" class="fs-32 c-15 f-1" :focus='input3' placeholder="街道、门牌号等" placeholder-class="placeholder-color" v-model="address" />
				<view class="iconfont color-c0 fs-40">&#xe615;</view>
			</view>
		</view>
		<view class="fs-32 c-15 mt-63">设为默认</view>
		<view class="dp-f ai-c jc-sb">
			<view class="fs-28 c-15">每次下单时都会默认使用该地址</view>
			<view class="check-box" @click="cheakType = !cheakType" :class="{ acitbeBg: cheakType }"><view class="move-box" :class="{ activeMove: cheakType }"></view></view>
		</view>
		<!-- <view class="dp-f ai-c c-62 fs-26 mt-63">
			<view class="radio-bxo w-28 h-28 bg-222 mr-16 dp-fc" @click="radioType = !radioType">
				<view class="iconfont c-fff fs-18" v-show="radioType">
					&#xe63f;
				</view>
			</view>
			同意
			<text class="c-15">
				《隐私政策》
			</text>
			，以上信息仅用于下单和收货
		</view> -->
		<view class="address-footer" @click="serveBtn"><view class="bg-222  h-82 lh-82 mt-124 ta-c fs-28 c-fff address-add">保存</view></view>
	</view>
</template>

<script>
import LbPicker from '@/components/lb-picker';
import areaData from '../../common/js/area-data-min.js';
export default {
	components: { LbPicker },
	data() {
		return {
			input1:false,
			input2:false,
			input3:false,
			userName: '',
			userphone: '',
			address: '',
			userRegion: {value:[]},
			userRegionText: '',
			list1: areaData,
			userAddress: [],
			label4: '',
			cheakType: false,
			radioType: false,
			isUpdate:false,//是否更新
			updateId:null,
		};
	},
	onReady () {
	  this.$nextTick(() => {
		  if(this.userAddress.length >0){
			  // 此处可以调用getColumnsInfo方法获取默认值的选项信息
			  const info1 = this.$refs.picker3.getColumnsInfo(this.userAddress)
			  this.userRegionText = info1.item.map(m => m.label).join('-')
		  }
	  })
	},
	onLoad(e) {
		if(e.Data){
			const Data = JSON.parse(e.Data)
			this.userAddress = [Data.province,Data.city,Data.region]
			console.log('xxxx',this.userAddress)
			this.userName = Data.name;
			this.userphone = Data.phoneNumber;
			this.address = Data.detailAddress;
			this.cheakType = Data.defaultStatus;
			this.userRegion.value[0] = Data.province
			this.userRegion.value[1] = Data.city
			this.userRegion.value[2] = Data.region
			this.updateId = Data.id
			this.isUpdate = true
			console.log(this.userRegion)
		}
	},
	onShow() {},
	watch: {},
	computed: {},
	methods: {
		// input获取焦点
		onFocus1(){
			this.input2 = false
			this.input3 = false
			this.input1 = true
		},
		onFocus2(){
			this.input1 = false
			this.input3 = false
			this.input2 = true
		},
		onFocus3(){
			this.input1 = false
			this.input2 = false
			this.input3 = true
		},
		//保存地址
		serveBtn() {
			if(!this.userName || !this.userphone || !this.userRegionText || !this.address){
				uni.showToast({
					title:'填写信息不完整',
					icon:'none'
				})
				return
			}
			console.log(this.userRegion)
			let Data = {
				defaultStatus: this.cheakType ? 1 : 0,
				detailAddress: this.address,
				name: this.userName,
				phoneNumber: this.userphone,
				postCode: '',
				province: this.userRegion.value[0],
				city: this.userRegion.value[1],
				region: this.userRegion.value[2]
			};
			if(this.updateId){
				Data.id = this.updateId
			}
			// "city": "110000",
			// "defaultStatus": 0,
			// "detailAddress": "维生素方法",
			// "name": "大哥大",
			// "phoneNumber": "15267625150",
			// "postCode": "10325",
			// "province": "110100",
			// "region": "110101"
			
			this.$refs.loading.open();
			if(this.isUpdate){
				console.log(Data)
				this.$http.updateAddress(Data).then(res=>{
					this.$refs.loading.close();
					uni.showToast({
						title:'保存成功',
						success:()=>{
							uni.navigateBack({
								delta: 1
							});
						}
					})
				})
			}else{
				this.$http.setAddress(Data).then(res => {
					this.$refs.loading.close();
					uni.showToast({
						title:'保存成功',
						success:()=>{
							uni.navigateBack({
								delta: 1
							});
						}
					})
				});
			}
		},
		handleTap(name) {
			this.$refs[name].show();
		},
		handleChange(e) {
			console.log('change::', e);
		},
		handleConfirm(e) {
			// 如果存在多个picker，可以在picker上设置dataset属性，confirm中获取，就能区分是哪个picker了
			console.log('confirm::', e);
			this.userRegion = e;
			this.userRegionText = e.item[0].label + '-' + e.item[1].label + '-' + e.item[2].label;
			if (e) {
				const name = e.dataset.name;
				const label = e.item.label;
				if (name && label) {
					this[name] = label;
				}
			}
		},
		handleCancel(e) {
			console.log('cancel::', e);
		}
	}
};
</script>

<style lang="scss">
.address-update-box {
	box-sizing: border-box;
	padding: 0 30rpx;
	.address-footer {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		padding-bottom: 80rpx;
	}
	.address-add {
		width: 93%;
		margin: 0 auto;
	}
	.check-box {
		background: #cccccc;
		box-sizing: border-box;
		height: 50rpx;
		width: 92rpx;
		padding: 4rpx;
		transition: all 0.8s;
	}

	.acitbeBg {
		background: #151515;
	}

	.activeMove {
		transform: translateX(42rpx);
	}

	.move-box {
		height: 100%;
		width: 42rpx;
		background: #fff;
		transition: all 0.4s;
	}

	.list-box {
		border-bottom: 1px solid #d0d0d0;
		padding-bottom: 22rpx;
	}

	.placeholder-color {
		color: #c0c0c0;
	}
}
</style>
