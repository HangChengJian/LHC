<template>
	<view class="login-box">
		<view class="">
			<view class="fs-44 fw-b c-15 pt-60">
				{{isCode?'手机快捷登录':'登录'}}
			</view>
			<view class="input-box mt-80 dp-f bs-bb jc-sb">
				<input type="number" value="" class="fs-32 c-15 f-1" placeholder="手机号"
					placeholder-class="placeholder-color" @focus='activeIndex = 1' @blur='activeIndex = 0'
					v-model="phoneNumber" @input='inputChange' />
				<view class="pl-20 verify-box placeholder-color fs-28" @click="timer" v-show='isCode'>
					{{verifyText}}
				</view>
				<view class="animation-line animation-all" :class="{'active-input':activeIndex == 1}"></view>
			</view>
			<view class="input-box mt-100 dp-f bs-bb jc-sb" v-if='isCode'>
				<input type="text" value="" class="fs-32 c-15 f-1" placeholder="验证码"
					placeholder-class="placeholder-color" @input='inputChange' v-model="code" />
			</view>
			<view class="input-box mt-100 dp-f bs-bb jc-sb" v-else>
				<input :type="showPassword?'text':'password'" value="" class="fs-32 c-15 f-1" placeholder="密码"
					placeholder-class="placeholder-color" @focus='activeIndex = 2' @blur='activeIndex = 0'
					@input='inputChange' v-model="password" />
				<view class="pl-20">
					<image src="../../static/icon/lock.png" class="w-34 h-18" v-show='showPassword' @click="onLock">
					</image>
					<image src="../../static/icon/nolock.png" class="w-34 h-18" v-show='!showPassword' @click="onLock">
					</image>
				</view>
				<view class="animation-line animation-all" :class="{'active-input':activeIndex == 2}"></view>
			</view>

			<view class="dp-f ai-c pt-10 jc-sb">
				<view class="fs-24 c-15" @click="$outerHref('/pages/userRegister/userRegister')">
					新用户注册
				</view>
				<view class="fs-24 c-15" @click="$outerHref('/pages/loginVerification/loginVerification')">
					忘记密码？
				</view>
			</view>
			<view class="w100 h-80 lh-80 fs-28 ta-c color-fff  mt-60 submitBtn" :class="disabledBtn?'bg-222':'bg-e6'"
				@click="onLogin">
				登录
			</view>
			<view class="fs-26 fw-b mt-50 ta-c c-15" v-if='!isCode' @click="changeLogin">
				使用短信验证码登录
			</view>
			<view class="fs-26 fw-b mt-50 ta-c c-15" v-else @click="changeLogin">
				使用密码登录
			</view>
		</view>
		<view class="login-footer">
			<view class="fs-28  ta-c color-a1">
				其他登录方式
			</view>
			<image src="../../static/icon/wx.png" class="w-68 h-68 mt-70" @click="wxLogin"></image>
		</view>
	</view>
</template>

<script>
	// import  from '@/components/'
	var timer;
	export default {
		components: {},
		data() {
			return {
				phoneNumber: '', //手机号
				password: '', //密码
				code: '', //验证码
				verifyText: '获取验证码',
				disabled: false, //倒计时禁用
				time: 5, //倒计时
				isCode: false, //是否验证码登录
				showPassword: false,
				activeIndex: 0,
				disabledBtn: false, //按钮禁用
			}
		},
		onLoad() {},
		onShow() {},
		watch: {},
		computed: {},
		methods: {
			// 显示密码
			onLock() {
				this.showPassword = !this.showPassword
			},
			// input输入 防抖
			inputChange() {
				clearTimeout(timer)
				timer = setTimeout(() => {
					if (this.isCode) {
						console.log('验证码登录')
						if (this.phoneNumber && this.code) {
							this.disabledBtn = true
						} else {
							this.disabledBtn = false
						}
					} else {
						console.log('手机号登录')
						if (this.phoneNumber && this.password) {
							this.disabledBtn = true
						} else {
							this.disabledBtn = false
						}
					}
				}, 400)
			},
			// 登录
			onLogin() {
				if(!this.phoneNumber){
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if(this.isCode){
					if(!this.code){
						uni.showToast({
							title: '请输入验证码',
							icon: 'none'
						})
						return
					}
				}else{
					if(!this.password){
						uni.showToast({
							title: '请输入密码',
							icon: 'none'
						})
						return
					}
				}
				let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test((this.phoneNumber))) {
					uni.showToast({                  
						title: '请输入正确手机号',
						icon: 'none'
					})
					return
				}
			},
			wxLogin() {
				uni.navigateTo({
					url: '/pages/wxlogin/wxlogin',
				});
			},
			//发送手机验证码倒计时
			timer() {
				if (this.time > 0) {
					this.disabled = true;
					this.time--;
					this.verifyText = this.time + "秒";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 5;
					this.verifyText = "发送验证码";
					this.disabled = false;
				}
			},
			//切换登录方式
			changeLogin() {
				this.isCode = !this.isCode
				if (this.isCode) {
					this.password = ''
				} else {
					this.code = ''
				}
			},

		},
	}
</script>

<style lang="scss" scoped>
	.login-box {
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;

		.submitBtn {
			transition: all .4s;
		}

		.animation-line {
			position: absolute;
			height: 1px;
			background: #222;
			left: 0;
			bottom: -1px;
			width: 0%;
		}

		.active-input {
			width: 100%;
		}

		.verify-box {
			height: 100%;
		}

		.animation-all {
			transition: all .5s;
		}

		.login-footer {
			padding-bottom: 112rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.input-box {
			padding: 20rpx 0;
			border-bottom: 2rpx solid #C0C0C0;
			position: relative;
		}

		.placeholder-color {
			color: #9D9D9D;
		}
	}
</style>
