<template>
	<view class="login-box">
		<view class="">
			<view class="fs-44 fw-b c-15 pt-60">{{ title }}</view>
			<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="mt-150 w100 h-80 lh-80 fs-28 ta-c color-fff bg-222 mt-60">绑定手机号</button>
			<!-- <view class="input-box mt-80 dp-f bs-bb jc-sb ai-c">
				<view class="pr-20 verify-box  fs-32 color-15" >
					+86
				</view>
				<input type="text" value="" class="fs-32 c-15 f-1" placeholder="手机号"
					placeholder-class="placeholder-color" v-model="userPhone"/>
			</view>
			<view class="w100 h-80 lh-80 fs-28 ta-c color-fff bg-222 mt-60" @click="goVerify">
				下一步
			</view> -->
		</view>
	</view>
</template>

<script>
// import  from '@/components/'
export default {
	components: {},
	data() {
		return {
			userInfo:{},
			userPhone: '', //手机号
			title: '',
			verifyText: '获取验证码',
			disabled: false, //倒计时禁用
			time: 5, //倒计时
			isCode: false, //是否验证码登录
			showPassword: false,
			isBinding: null //是否绑定手机号
		};
	},
	onLoad(e) {
		this.isBinding = e.isBinding;
		if (e.isBinding) {
			this.title = '绑定手机号';
		} else {
			this.title = '注册';
		}
	},
	onShow() {},
	watch: {},
	computed: {},

	methods: {
		getPhoneNumber(e) {
			if(!e.detail.encryptedData)return
			uni.login({
				provider: 'weixin',
				success: ret => {
					this.userInfo.encryptedData = e.detail.encryptedData;
					this.userInfo.iv = e.detail.iv;
					this.userInfo.code = ret.code;
					console.log(e.detail.encryptedData)
					console.log(e.detail.iv)
					console.log(ret.code)
					this.$http.bindingPhone(this.userInfo).then(res => {
						console.log('res',res)
						this.getUserInfo()
					})
				}
			});
		},
		//获取用户信息
		getUserInfo() {
			this.$http
				.userInfo()
				.then(res => {
					this.userInfo = res.data.data;
					uni.setStorageSync('userInfo', JSON.stringify(res.data.data));
					uni.setStorage({
						key: 'userInfo',
						data: JSON.stringify(res.data.data),
						success: function () {
							uni.navigateBack({
							    delta: 1
							});
						}
					});
					
				})
				.catch(e => {
				});
		},
		goVerify() {
			if (!this.userPhone) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
				return;
			}
			let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (!myreg.test(this.userPhone)) {
				uni.showToast({
					title: '请输入正确手机号',
					icon: 'none'
				});
				return;
			}
			if (this.isBinding) {
				uni.navigateTo({
					url: '/pages/loginVerification/loginVerification?userPhone=' + this.userPhone + '&isBinding=1'
				});
			} else {
				uni.navigateTo({
					url: '/pages/loginVerification/loginVerification?userPhone=' + this.userPhone
				});
			}
		},
		wxLogin() {
			uni.navigateTo({
				url: '/pages/wxlogin/wxlogin'
			});
		},
		//发送手机验证码倒计时
		timer() {
			if (this.time > 0) {
				this.disabled = true;
				this.time--;
				this.verifyText = this.time + '秒';
				setTimeout(this.timer, 1000);
			} else {
				this.time = 5;
				this.verifyText = '发送验证码';
				this.disabled = false;
			}
		},
		//验证码登录
		changeCode() {
			this.isCode = true;
		},
		// 密码登录
		passwordLogin() {
			this.isCode = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.login-box {
	box-sizing: border-box;
	padding: 0 30rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100vh;

	.verify-box {
		height: 100%;
	}

	.login-footer {
		padding-bottom: 112rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.input-box {
		padding: 20rpx 0;
		border-bottom: 2rpx solid #c0c0c0;
	}

	.placeholder-color {
		color: #9d9d9d;
	}
}
</style>
