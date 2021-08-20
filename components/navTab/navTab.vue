<template>
	<view class="navTabBox">
		<view class="longTab">
			<!-- "width:"+isWidth+"px;color:"+activeColor -->
			<scroll-view scroll-x="true" style="white-space: nowrap; display: flex" scroll-with-animation :scroll-left="tabLeft" :class="{'Border':isBorder}">
				<view class="longItem bdr" :style='{width:isWidth+"px",color:index===tabClick?activeColor:textColor,fontSize:fontSize+"rpx",paddingTop:paddingT+"rpx",paddingBottom:paddingB+"rpx"}' :data-index="index" :class="{'click':index===tabClick,'bdl':isLeftBorder}"v-for="(item,index) in tabTitle" :key="index" :id="'id'+index" @click="longClick(index)">{{item}}</view>
				<!-- "transform:translateX("+isLeft+"px);width:"+isWidth+"px" -->
				<view class="underlineBox" :style='{transform:"translateX("+isLeft+"px)",width:isWidth + "px"}'>
					<view class="underline" :style="{background:activeColor,width:borderW+'rpx'}"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'navTab',
		props: {
			//导航标题
			tabTitle: {
				type: Array,
				default: []
			},
			// 高亮颜色
			activeColor:{
				type: String,
				default: '#151515'
			},
			//字体颜色
			textColor:{
				type: String,
				default: '#666666'
			},
			//字体大小
			fontSize:{
				type: String,
				default: '28'
			},
			//上边距
			paddingT:{
				type: Number,
				default: 20
			},
			//下边距
			paddingB:{
				type: Number,
				default: 4
			},
			//下边框宽度
			borderW:{
				type: Number,
				default: 84
			},
			//是否显示边框
			isBorder:{
				type: Boolean,
				default: false
			},
			//是否左边框
			isLeftBorder:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				tabClick: 0, //导航栏被点击
				isLeft: 0, //导航栏下划线位置
				isWidth: 0, //每个导航栏占位
				tabLeft:0
			};
		},
		created() {
			var that = this
			// 获取设备宽度
			uni.getSystemInfo({
				success(e) {
					if(that.tabTitle.length<= 5 ){
						that.isWidth = e.windowWidth / that.tabTitle.length //宽度除以导航标题个数=一个导航所占宽度	
					} else {
						that.isWidth = e.windowWidth / 5 
					}
				}
			})
			// this.isLeft = 1 * this.isWidth //设置下划线位置
		},
		methods: {
			// 导航栏点击
			longClick(index){
				if(this.tabTitle.length>5){
					var tempIndex = index - 2;
					tempIndex = tempIndex<=0 ? 0 : tempIndex;
					this.tabLeft = (index-2) * this.isWidth //设置下划线位置
				}
				this.tabClick = index //设置导航点击了哪一个
				this.isLeft = index * this.isWidth //设置下划线位置
				this.$emit('changeTab', index);//设置swiper的第几页
				// this.$parent.currentTab = index //设置swiper的第几页
			}
		}
	}
</script>

<style lang="scss">
	.navTabBox {
		width: 100vw;
		color: rgba(255, 255, 255, 0.50);
		background: #fff;
		.click {
			font-weight: 600;
			// color: #151515 ;
		}
		.longTab {
			width: 100%;
			.Border{
				border-bottom:1px solid  #EAEAEA;
			}
			.longItem{ 
				// height: 72upx; 
				display: inline-block;
				// line-height: 90upx;
				text-align: center;
				font-size: 28rpx;
				color: #666666;
				position: relative;
			}
			.bdl::after{
				content: '';
				position: absolute;
				left: 0;
				top: 22rpx;
				width: 1px;
				background: #EAEAEA;
				height: 38rpx;
			}
			.underlineBox {
				height: 2px;
				width: 20%;
				display: flex;
				align-content: center;
				justify-content: center;
				transition: .3s;
				.underline {
					width: 84upx;
					height: 2px;
					background-color: #151515;
				}
			}
		}
	}
</style>
