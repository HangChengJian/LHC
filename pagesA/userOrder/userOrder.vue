<template>
	<view class="container999" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
		<!-- 刷新组件需搭配scroll-view使用，并在pages.json中添加 "disableScroll":true-->
		<refresh ref="refresh" @isRefresh="isRefresh"></refresh>
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<view class="h-80 bg-fff w100 nav-Cbox">
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab="changeTab"></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(listItem, listIndex) in swiperList" :key="listIndex">
				<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
					<view :id="'top' + listIndex" style="width: 100%;height: 94upx;"></view>
					<order-list
						v-if="listItem.list.length > 0"
						:item="item"
						:orderIndex="i"
						:swiperIndex="listIndex"
						v-for="(item, i) in listItem.list"
						:key="i"
						@changeOrder="changeOrder"
					></order-list>
					<view class="noCard dp-f fd-c ai-c mt-14" v-if="listItem.list.length == 0">
						<!-- <image src="../../static/icon/icon-03.png" class="w-342 h-297" style="padding-top: 80rpx;"></image> -->
						<view class="fs-30 c-15" style="padding-top: 80rpx;">未有此类订单</view>
						<view class="fs-30 color-9 pt-14">快去选购商品下单吧</view>
						<view class="bg-000 w-260 h-80 lh-80 fs-30 color-fff ta-c" style="margin-top: 130rpx;" @click="goHome">去选购商品</view>
					</view>
					<!-- 猜你喜欢 -->
					<!-- <view class="bs-bb p-0-30 bg-fff">
						<view class="fs-38  pt-60 ta-c">更多精选商品</view>
						<view class="mt-20 w-690 m-0-a dp-f fw-w jc-sb">
							<view v-for="(item, i) in 6" :key="i" class="mb-60"><goods-module></goods-module></view>
						</view>
					</view> -->
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import navTab from '@/components/navTab/navTab';
import refresh from '@/components/navTab/refresh';
import orderList from '@/components/orderList/orderList';
import goodsModule from '@/components/goodsModule/goodsModule.vue';
export default {
	components: {
		navTab,
		refresh,
		orderList,
		goodsModule
	},
	data() {
		return {
			tabTitle: ['全部', '待付款', '待发货', '待收货', '已完成'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			list: [['a'], ['a', 'b', 'c', 'd', 'e', 'f'], [], ['2233', '4234', '13144', '324244'], []], //数据格式
			swiperList: [
				{ pageIndex: 1, list: null, disable: false },
				{ pageIndex: 1, list: null, disable: false },
				{ pageIndex: 1, list: null, disable: false },
				{ pageIndex: 1, list: null, disable: false },
				{ pageIndex: 1, list: null, disable: false }
			],
			toView: '' //回到顶部id
		};
	},
	onLoad(e) {
		console.log(e.type);
		if (e.type) {
			this.currentTab = e.type;
		}
	},
	onShow() {
		this.getOrderList(this.currentTab);
	},
	watch: {},
	computed: {},
	methods: {
		goHome() {
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		getOrderList(index, type = false) {
			console.log(this.swiperList[index].pageIndex);
			if (!type) {
				this.$refs.loading.open();
			}
			let status = null;
			console.log('index', index);
			switch (index) {
				case 0:
					status = -1;
					break;
				case 1:
					status = 0;
					break;
				case 2:
					status = 1;
					break;
				case 3:
					status = 2;
					break;
				case 4:
					status = 3;
					break;
			}
			const parameter = {
				status, //订单状态：-1->全部；0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭,可用值:-1,0,1,2,3,4,示例值(-1)
				pageIndex: type ? 1 : this.swiperList[index].pageIndex, //页数
				pageSize: 5 //条数
			};
			this.$http.orderList(parameter).then(res => {
				const newlist = res.data.data.records;
				if (type) {
					this.swiperList[index].list = newlist;
					uni.showToast({
						icon: 'success',
						title: '刷新成功'
					});
					this.$refs.refresh.endAfter(); //刷新结束调用
				} else {
					if (this.swiperList[index].list === null) {
						this.swiperList[index].list = [];
					}
					if (this.swiperList[index].pageIndex == 1) {
						this.swiperList[index].list = newlist;
					} else {
						this.swiperList[index].list = this.swiperList[index].list.concat(newlist);
					}
					this.$refs.loading.close();
					if (newlist.length == 0) {
						this.swiperList[index].disable = true;
					}
				}
			});
		},
		toTop() {
			this.toView = '';
			setTimeout(() => {
				this.toView = 'top' + this.currentTab;
			}, 10);
		},

		// 修改订单
		changeOrder(obj) {
			if (obj.type === 1) {
				console.log(this.swiperList[obj.swiperIndex].list);
				this.swiperList[obj.swiperIndex].list.splice(obj.index, 1);
				uni.showToast({
					title: '删除成功'
				});
			} else if (obj.type === 2) {
				this.swiperList[obj.swiperIndex].list[obj.index].status = 4;
				this.getOrderList(this.currentTab);
				uni.showToast({
					title: '取消成功'
				});
			} else if (obj.type === 3) {
				this.getOrderList(this.currentTab);
			}
		},
		changeTab(index) {
			this.currentTab = index;
		},
		// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
		isRequest() {
			return new Promise((resolve, reject) => {
				this.pages[this.currentTab]++;
				var that = this;
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: `请求第${that.currentTab + 1}个导航栏的第${that.pages[that.currentTab]}页数据成功`
					});
					let newData = ['新数据1', '新数据2', '新数据3'];
					resolve(newData);
				}, 1000);
			});
		},
		// swiper 滑动
		swiperTab: function(e) {
			var index = e.detail.current; //获取索引
			this.currentTab = index;
			this.$refs.navTab.longClick(index);
			// if (this.swiperList[index].list === null) {
			this.getOrderList(index);
			// }
		},
		// 加载更多 util.throttle为防抖函数
		lower1() {
			if (this.swiperList[this.currentTab].disable) {
				uni.showToast({
					title: '没有更多了',
					icon: 'none'
				});
				return;
			}
			this.swiperList[this.currentTab].pageIndex++;
			this.getOrderList(this.currentTab);
		},
		// lower1: util.throttle(function(e) {
		// console.log(`加载${this.currentTab}`)//currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
		// uni.showLoading({
		// 	title: '加载中',
		// 	mask:true
		// })
		// 	this.isRequest().then((res)=>{
		// 		let tempList = this.list
		// 		tempList[this.currentTab] = tempList[this.currentTab].concat(res)
		// 		console.log(tempList)
		// 		this.list = tempList
		// 		this.$forceUpdate() //二维数组，开启强制渲染
		// 	})
		// }, 300),
		// 刷新touch监听
		refreshStart(e) {
			this.$refs.refresh.refreshStart(e);
		},
		refreshMove(e) {
			this.$refs.refresh.refreshMove(e);
		},
		refreshEnd(e) {
			this.$refs.refresh.refreshEnd(e);
		},
		isRefresh() {
			this.getOrderList(this.currentTab, true);
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f6f6f6;
}

.container999 {
	width: 100vw;
	min-height: 100vh;
	overflow: hidden;
	color: #6b8082;
	position: relative;
}

.content {
	width: 100%;
}

.nav-Cbox {
	position: absolute;
	top: 0;
	z-index: 20;
	border-top: 1px solid #eaeaea;
}

.noCard {
	height: 100%;
	background: #ffffff;
	// border-top: 1px solid #eaeaea;
}

.nav {
	position: fixed;
	left: 0;
	top: 0;
	color: white;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	font-size: 24upx;
	background-color: #50b7ea;
	z-index: 996;
}

.searchInput999 {
	width: 90%;
	margin: 0 auto;
	background: white;
	border-radius: 30upx;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 56upx;
}

.search999 {
	width: 32upx;
	height: 32upx;
}

.searchBox999 {
	width: 56upx;
	height: 56upx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.input999 {
	color: #999;
	width: 80%;
}
</style>
