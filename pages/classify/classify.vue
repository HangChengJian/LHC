<!--分类-->
<template>
	<view class="classify-box">
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<view class="tab-box">
			<navTab ref="navTab" :isBorder='isBorder' :borderW='borderW' :tabTitle="tabTitle" :paddingB="paddingB"
				:paddingT="paddingT" @changeTab='changeTab' :fontSize='fontSize' :activeColor='activeColor'
				:textColor='textColor'></navTab>
		<!-- 	<view class="scroll-box" v-show='!changeIndex'>
				<scroll-view scroll-x :scroll-with-animation='true' :scroll-into-view='categoryIndex'>
					<view class="letter" :class="{'fw-b':index==categoryActive}" :id="'id'+index" v-for="(item,index) in letterList"
						:key='index' @click="changeLetter(index)" >
						{{item.letter}}
					</view>
					<view class="w-50">
						
					</view>
				</scroll-view>
			</view> -->
		</view>
		<view  class="h-80"></view>
		<scroll-view scroll-Y class="scrollY-box" :scroll-into-view='locationIndex' :scroll-with-animation='true'
			v-show="!changeIndex" @scroll='scrollY'>
			<!-- 品牌 -->
			<view class="brand-box dp-f fw-w jc-sb box" v-for="(item,i) in letterList" :id="'id'+i" :key='i'>
				<view class="brand-title-img">
					<image :src="item.pictureUrl" ></image>
					<view class="title" >
						{{item.categoryName}}
					</view>
				</view>
				<view class="dp-f fw-w jc-sb p-0-10 pt-10 w100 list1">
					<view class="mb-6 dp-f fw-w jc-sb p-6 brand-list-box " v-for="(items,index) in item.brandList" @click="$outerHref('/pages/classifydet/classifydet?id='+items.id)" :key='index'>
						<brand-item :item='items'></brand-item>
					</view>
					<!-- <view class="w-240 h-250" v-if='item.brandList.length  % 2 == 0'>
						{{item.brandList.length  % 2}}
					</view> -->
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-Y class="scrollY-box"  :scroll-with-animation='true'
			v-show="changeIndex">
			<!-- 气味 -->
			<view class="">
				<classswiper :list='smellList'></classswiper>
				<view class="h-50"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import navTab from '@/components/navTab/navTab'
	import brandItem from '@/components/brandItem/brand.vue'
	import classswiper from '@/components/classswiper/classswiper.vue'
	export default {
		components: {
			brandItem,
			classswiper,
			navTab
		},
		data() {
			return {
				diff: 0,//左边scroll-view 内层nav的总高度与视口之差
				arr:[],
				height: 0,
				navLeftHeight:0,//左边scroll-view 内层nav的总高度
				leftItemHeight: 26,//49行会计算出新值进行覆盖 字母dom个数
				locationIndex: '', //跳转id
				categoryIndex:'',
				categoryActive: 0, //选中字母下标
				letterList: [],
				smellList:[],
				// ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
				// 	'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				// ],
				cifyycy: false,
				tabTitle: ['品牌', '气味'],
				changeIndex: 0,
				activeColor: '#151515',
				textColor: "#151515",
				fontSize: '30',
				paddingT: 20,
				paddingB: 20,
				borderW: 60,
				isBorder: true,
				shwoPop: true,
				
			}
		},
		onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight;
			this.getClassifyBrand()
		},
		onReady() {
			// this.getClassifyBrand()
		},
		onShow() {},
		watch: {},
		computed: {},
		methods: {
			getClassifyBrand(){
				this.$refs.loading.open();
				this.$http.getClassifyBrand().then(res => {
					this.letterList = res.data.data
					console.log(this.letterList)
					// this.getHeightList();
					this.$refs.loading.close();
				});
			},
			// 气味api
			getClassifySmell(){
				this.$refs.loading.open();
				this.$http.getClassifySmell().then(res=>{
					this.smellList = res.data.data
					this.$refs.loading.close();
				})
			},
			getHeightList() {
				let _this = this;
				let selectorQuery = uni.createSelectorQuery();
				// selectorQuery.selectAll('.letter').boundingClientRect(function(rects) {
				// 	_this.leftItemHeight = rects[0].height;
				// 	_this.navLeftHeight = _this.leftItemHeight * 26;
				// 	_this.diff = _this.navLeftHeight - _this.height;
				// });
				selectorQuery.selectAll('.box').boundingClientRect(function(rects) {
					let arr = [0];
					let top = 0;
					rects.forEach(function(rect) {
						// 					rect.id      // 节点的ID
						// 					rect.dataset // 节点的dataset
						// 					rect.left    // 节点的左边界坐标
						// 					rect.right   // 节点的右边界坐标
						// 					rect.top     // 节点的上边界坐标
						// 					rect.bottom  // 节点的下边界坐标
						// 					rect.width   // 节点的宽度
						// 					rect.height  // 节点的高度
						top += rect.height;
						arr.push(top)
					})
					console.log(arr)
					_this.arr = arr
				}).exec()
			},
			scrollY(e) {
				let _this = this
				if (this.timeoutId) {
					clearTimeout(this.timeoutId);
				}
				this.timeoutId = setTimeout(function() { //节流
					_this.scrollHeight = e.detail.scrollTop + 1 ;
					//+1不要删除，解决最后一项某种情况下翻到底部，左边按钮并不会切换至最后一个
					//若想使切换参考线为屏幕顶部请删除 _this.height/2
					for (let i = 0; i < _this.arr.length; i++) {
						let height1 = _this.arr[i];
						let height2 = _this.arr[i + 1];
						if (!height2 || (_this.scrollHeight >= height1 && _this.scrollHeight < height2)) {
							// _this.categoryActive = i;
							_this.categoryIndex = 'id'+i
							return false;
						}
					}
					_this.categoryActive = 0;
					_this.timeoutId = undefined;
				}, 10)
			},
			changeLetter(index) {
				this.locationIndex = 'id' + index
				this.categoryActive = index
			},
			changeTab(index) {
				this.changeIndex = index
				if(this.smellList.length == 0){
					this.getClassifySmell()
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
  .list1 .brand-list-box:last-child:nth-child(3n + 2) {
    background: hotpink;
    margin-right: 244rpx;
  }
	.scrollY-box {
		flex: 1;
		overflow: scroll;
	}

	.scroll-box {
		width: 100%;
		height: 82rpx;
		white-space: nowrap;
		border-bottom: 1px solid #EFEFEF;

		.letter {
			display: inline-block;
			padding-left: 50rpx;
			font-size: 30rpx;
			color: #151515;
			line-height: 82rpx;
		}
	}

	// scroll-view 下拉条隐藏
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}

	.scroll-box {
		height: 82rpx;
		border-bottom: 1px solid #EFEFEF;
		display: flex;
		width: 100%;

		view {
			display: inline-block;
		}
	}

	.classify-box {
		background-color: #F9F9F9;
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
		
		.brand-title-img{
			width: 100%;
			height: 140rpx;
			position: relative;
			.title{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				color: #fff;
				font-size: 40rpx;
				font-weight: bold;
			}
			image{
				width: 100%;
				height: 100%;
			}
		}
		.tab-box {
			position: fixed;
			width: 100%;
			top: 0;
			background: #fff;
			z-index: 999;
		}

		.nav-box {
			border-bottom: 1px solid #EFEFEF;
			position: fixed;
			top: 0;
			width: 100%;
		}

		.tab-active {
			position: relative;

			&::after {
				position: absolute;
				content: '';
				bottom: -18rpx;
				width: 56rpx;
				height: 4rpx;
				left: 50%;
				margin-left: -28rpx;
				background: #000000;
				border-radius: 10rpx;
			}
		}

		.brand-box {
			box-sizing: border-box;
		}
	}
</style>
