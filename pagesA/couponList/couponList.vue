<template>
	<view class="coupon-box">
		<!-- 导航栏 -->
		<view class="nav-box">
			<navTab ref="navTab" :isBorder='isBorder' :borderW='borderW' :tabTitle="tabTitle" :paddingB="paddingB"
				:paddingT="paddingT" @changeTab='changeTab' :fontSize='fontSize' :activeColor='activeColor'
				:textColor='textColor'></navTab>
		</view>
		<view class="bs-bb p-0-30" >
			<view class="dp-f jc-sb mt-20">
				<view class="h-80 w-530 code-box dp-f ai-c bs-bb pl-30 pr-30">
					<input type="text" v-model="codeValue" class="fs-28 c-15 w100" placeholder="请输入优惠码"
						placeholder-class="placeholder-color" />
				</view>
				<view class="w-140 h-80 lh-80 c-fff ta-c fs-28 bg-222" @tap="getCode">
					兑换
				</view>
			</view>
			<view class="dp-f jc-fe mt-30 mb-40">
				<view class="fs-24 c-15" @tap="Construction">
					优惠券使用说明
					<text class="iconfont fs-24 c-15 ml-10">&#xe62a;</text>
				</view>
			</view>
			
			<view class="dp-f fd-c ai-c" v-if='currentTab==2&&records.length==0'>
				<image src="../../static/icon/icon-01.png" class="w-342 h-297 mt-272"></image>
				<view class="fs-30 color-15 mt-46">
					您还没有已过期的纪录
				</view>
			</view>
			<scroll-view v-else scroll-y="true" :style="{height:scrollH+'rpx'}" @scrolltolower="lower()">
				<view  class=""  v-for="item in records" >
					<ticket @tap='couponTap(item)' :isDisable="false" :preferentialData='item'></ticket>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import navTab from '@/components/navTab/navTab'
	import ticket from '@/components/ticket/ticket.vue'
	export default {
		components: {
			ticket
		},
		data() {
			return {
				tabTitle: ['未使用', '已使用', '已过期'],
				currentTab: 0,
				activeColor: '#151515',
				textColor: "#9E9E9E",
				fontSize: '28',
				paddingT: 20,
				paddingB: 2,
				borderW: 84,
				isBorder: false,
				records:[],
				codeValue:'',
				pageIndex:1,
			}
		},
		onLoad() {
			this.getlist()
		},
		onShow() {},
		watch: {},
		computed: {
			scrollH:function(){
						let sys = uni.getSystemInfoSync();
						let winWidth = sys.windowWidth;
						let winrate = 750/winWidth;
						let winHeight =parseInt(sys.windowHeight*winrate)
						return winHeight-300	
					}
		},
		methods: {
			Construction(){
				uni.showToast({
					title: '建设中',
					icon:'none'
				});
			},
			lower(){
				console.log("已经滚动到底部了")
				this.pageIndex++
				this.getlist()
			},
			changeTab(index) {
				this.currentTab = index;
				this.pageIndex=1
				this.records=[]
				this.getlist()
			},
			getlist(){//
				this.$http.getCoupon({ useStatus: this.currentTab ,pageIndex:this.pageIndex}).then(res => {
					this.records.push(...res.data.data.records)
				});
			},
			getCode(){
				if(/^[\s]*$/.test(this.codeValue)){
					uni.showToast({
					    title: '请输入优惠码',
							icon:'none'
					});
				}else{
					this.$http.getCouponCode({ code: this.codeValue}).then(res => {
						if(res.data.code==200){
							this.codeValue=''
							uni.showToast({
								title: res.data.message,
								duration: 1000,
								success:()=>{
									this.pageIndex=1
									this.records=[]
									this.getlist()
								}
							})
						}
					});
				}
				
			},
			couponTap(e){
				uni.navigateTo({
					url:'/pagesA/available/available?id='+e.couponId
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
		background: #F8F8F8;
	}
	.coupon-none{
		.none-color{
			color: #999999;
		}
		.none-bd{
			border: 1px solid #999999;
		}
	}
	.placeholder-color {
		color: #9D9D9D;
	}

	.coupon-box {
		.coupon-num {
			border-bottom: 1px dashed #D4D4D4;
			padding-bottom: 30rpx;
		}

		.coupon-list-box {
			width: 100%;
			height: 320rpx;
			background: #fff;
			margin-bottom: 30rpx;
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
	}
</style>
