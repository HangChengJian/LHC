<template>
	<view class="dp-f fd-c ai-c bs-bb p-0-30">
		<view class="pt-f"><w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading></view>
		<image src="../../static/icon/logo.png" class="w-180 h-180 mt-260"></image>
		<view class="fs-40 fw-b c-15 mt-20 mt-234">嗅嗅识香{{ Timer }}-</view>
		<!-- 	<button class="sys_btn bg-222 ta-c fs-28 c-fff h-80 lh-90 w100 mt-234" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWxT" v-if="showbotton">小程序授权登录</button> -->
		<button class="sys_btn bg-222 ta-c fs-28 c-fff h-80 lh-90 w100 mt-234" open-type="getUserInfo" lang="zh_CN" @click="getUserInfo">授权用户信息</button>

		<view class="ta-c fs-28 c-15 h-80 lh-90 w100 mt-50 bd-15" @click="goBack">暂不授权</view>
	</view>
</template>

<script>
// import  from '@/components/'
var _ordertimer = null;
var data = new Date();
export default {
	components: {},
	data() {
		return {
			userInfo: {},
			showbotton: true,
			code: '',
			Timer: '',
			xx: ''
		};
	},
	onLoad() {},
	onShow() {},
	watch: {},
	computed: {},
	methods: {
		leftTimer(enddate) {
			this.Timer = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate() + ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds(); //当前时间
			var leftTime = new Date(enddate) - new Date(); //计算剩余的毫秒数
			var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
			var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10); //计算剩余的小时
			var minutes = parseInt((leftTime / 1000 / 60) % 60, 10); //计算剩余的分钟
			var seconds = parseInt((leftTime / 1000) % 60, 10); //计算剩余的秒数
			days = this.checkTime(days);
			hours = this.checkTime(hours);
			minutes = this.checkTime(minutes);
			seconds = this.checkTime(seconds);
			if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) this.xx = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒';
			if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
				console.log('结束');
				clearInterval(_ordertimer);
				_ordertimer = null;
			}
		},
		go(v) {
			var date1 = new Date(),
				data2 = new Date(1617687634000);
			if (data2 < date1) return; //设置的时间小于现在时间退出
			_ordertimer = setInterval(() => {
				this.leftTimer(data2);
			}, 1000);
		},
		checkTime(i) {
			//将0-9的数字前面加上0，例1变为01
			if (i < 10) {
				i = '0' + i;
			}
			return i;
		},
		goBack() {
			const path = ['pages/user/user', 'pages/goodsCart/goodsCart'];
			const routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			const curRoute = routes[routes.length - 2].route; // 获取上一个页面路由
			if (path.includes(curRoute)) {
				uni.switchTab({
					url: '/pages/index/index'
				});
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		getUserInfo() {
			this.$refs.loading.open();
			wx.getUserProfile({
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: res => {
					uni.login({
						provider: 'weixin',
						success: ret => {
							this.userInfo.encryptedData = res.encryptedData;
							this.userInfo.iv = res.iv;
							this.userInfo.code = ret.code;
							this.wxLoadin();
						}
					});

					// this.userInfo.nickName = res.userInfo.nickName;
					// this.userInfo.avatarUrl = res.userInfo.avatarUrl;
				},
				fail: () => {
					// this.wxLoadin();
					this.$refs.loading.close();
				}
			});
		},
		wxLoadin() {
			const _this = this;
			console.log('xxxx', _this.userInfo);
			_this.$http.wxLoadin(_this.userInfo).then(res => {
				_this.$refs.loading.close();
				uni.setStorage({
					key: 'Token',
					data: res.data.data.token,
					success: () => {
						//是否绑定手机号
						if (res.data.data.isBindPhone) {
							// var pages = getCurrentPages();
							// var page = pages[pages.length - 2].$page.fullPath;
							// console.log(page)
							uni.navigateBack({
								delta: 1
							});
						} else {
							uni.redirectTo({
								url: '/pages/userRegister/userRegister?isBinding=1'
							});
						}
					}
				});
			});
		},
		appLoginWx() {
			this.$refs.loading.open();
			const _this = this;
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					// console.log(res.provider.indexOf('weixin'))
					if (res.provider[0] == 'weixin') {
						console.log('res', res);
						uni.login({
							provider: 'weixin',
							success: ret => {
								console.log('ret', ret);
								_this.code = ret.code;
								_this.$refs.loading.close();
								_this.showbotton = false;
							},
							fail: () => {
								uni.showToast({
									title: '微信登录授权失败',
									icon: 'none'
								});
							}
						});
					}
				}
			});
		},
		appLoginWxT() {
			this.$refs.loading.open();
			const _this = this;
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					// console.log(res.provider.indexOf('weixin'))
					if (res.provider[0] == 'weixin') {
						uni.login({
							provider: 'weixin',
							success: ret => {
								uni.getUserInfo({
									provider: 'weixin',
									success: info => {
										console.log('ret', ret);
										console.log('info', info);
										_this.code = ret.code;
										const data = {
											code: ret.code,
											encryptedData: info.encryptedData,
											iv: info.iv
										};
										_this.userInfo = data;
										console.log('_this.userInfo', _this.userInfo);
										_this.showbotton = false;
										_this.$refs.loading.close();
										// _this.$http.wxLoadin(data).then(res => {
										// 	_this.$refs.loading.close();
										// 	uni.setStorage({
										// 		key: 'Token',
										// 		data: res.data.data.token,
										// 		success: () => {
										// 			//是否绑定手机号
										// 			if (res.data.data.isBindPhone) {
										// 				// var pages = getCurrentPages();
										// 				// var page = pages[pages.length - 2].$page.fullPath;
										// 				// console.log(page)
										// 				uni.navigateBack({
										// 					delta: 1
										// 				});
										// 			} else {
										// 				uni.redirectTo({
										// 					url: '/pages/userRegister/userRegister?isBinding=1'
										// 				});
										// 			}
										// 		}
										// 	});
										// });
									},
									fail: () => {
										uni.showToast({
											title: '微信登录授权失败',
											icon: 'none'
										});
									}
								});
							},
							fail: () => {
								uni.showToast({
									title: '微信登录授权失败',
									icon: 'none'
								});
							}
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped></style>
