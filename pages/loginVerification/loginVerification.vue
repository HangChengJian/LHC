<template>
	<view class="login-box">
		<view class="pt-f"><w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading></view>
		<view class="" v-if="isNext">
			<view class="fs-44 fw-b c-15 pt-60">验证手机号</view>
			<view class="input-box mt-80 dp-f bs-bb jc-sb">
				<input type="text" value="" class="fs-32 c-15" placeholder="验证码" placeholder-class="placeholder-color" v-model="code"/>
				<view class="ta-c verify-box fs-20" @click="timer" :class="{ displayBtn: disabled }">{{ verifyText }}</view>
			</view>
			<view class="fs-22 c-666 mt-20 h-30" v-show='disabled'>短信验证码已发送至尾号{{ phoneStr }}的手机，请注意查收</view>
			<view class="w100 h-80 lh-80 fs-28 ta-c color-fff bg-222 mt-60" @click="onbind">{{ btnText }}</view>
		</view>
		<view class="" v-else>
			<view class="fs-44 fw-b c-15 pt-60">设置密码</view>
			<!-- <view class="input-box mt-80 dp-f bs-bb jc-sb">
				<input type="text" value="" class="fs-32 c-15" placeholder="验证码"
					placeholder-class="placeholder-color" />
				<view class="ta-c verify-box fs-20" @click="timer" :class="{displayBtn:disabled}">
					{{verifyText}}
				</view>
			</view> -->
			<view class="input-box mt-80 dp-f bs-bb jc-sb">
				<input type="text" value="" class="fs-32 c-15 f-1" placeholder="密码" placeholder-class="placeholder-color" />
				<view class="pl-20">
					<image src="../../static/icon/lock.png" class="w-34 h-18" v-show="showPassword"></image>
					<image src="../../static/icon/nolock.png" class="w-34 h-18" v-show="!showPassword"></image>
				</view>
			</view>
			<view class="w100 h-80 lh-80 fs-28 ta-c color-fff bg-222 mt-60">确定</view>
		</view>
	</view>
</template>

<script>
// import  from '@/components/'
export default {
	components: {},
	data() {
		return {
			code:'',//验证码
			userPhone: '',
			phoneStr: '',
			verifyText: '获取验证码',
			disabled: false, //倒计时禁用
			time: 60, //倒计时
			isCode: false, //是否验证码登录
			showPassword: false,
			isNext: true,
			TT: null,
			isBinding: null, //是否绑定手机号
			btnText: ''
		};
	},
	onLoad(e) {
		this.userPhone = e.userPhone;
		this.isBinding = e.isBinding;
		if (e.isBinding) {
			this.btnText = '确认绑定';
		} else {
			this.btnText = '去设置密码';
		}
		this.phoneStr = this.userPhone.substr(this.userPhone.length - 4);
	},
	onShow() {},
	watch: {},
	computed: {},
	methods: {
		// 绑定手机
		onbind() {
			if(this.isBinding){
				if(!this.code){
					uni.showToast({
						title:'请输入验证码'
					})
					return
				}
				this.$refs.loading.open()
				const option = {
					mobile: this.userPhone,
					authCode:this.code
				};
				this.$http.bindPhone(option).then(res => {
					this.$refs.loading.close()
					if(res.data.code == 200){
						uni.showToast({
							title:'绑定成功'
						})
						this.getUserInfo();
						
					}
				});
			}else{
				this.isNext = false
			}
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
							    delta: 2
							});
						}
					});
					
				})
				.catch(e => {
				});
		},
		//发送手机验证码倒计时
		timer() {
			if (!this.disabled) {
				console.log('点击');
				const option = {
					telephone: this.userPhone
				};
				this.$http.getAuthCode(option).then(res => {
					// this.$refs.loading.close()
					console.log('xx', res);
				});
			}
			if (this.time > 0) {
				this.disabled = true;
				clearInterval(this.TT);
				this.TT = setInterval(() => {
					this.time--;
					this.verifyText = this.time + '秒';
					this.timer();
				}, 1000);
				// setTimeout(this.timer, 1000);
			} else {
				this.time = 60;
				this.verifyText = '发送验证码';
				this.disabled = false;
				clearInterval(this.TT);
			}
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
		width: 164rpx;
		height: 72rpx;
		line-height: 72rpx;
		background: #222;
		color: #fff;
	}

	.displayBtn {
		background-color: #d2d2d2;
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
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.placeholder-color {
		color: #9d9d9d;
	}
}
</style>
