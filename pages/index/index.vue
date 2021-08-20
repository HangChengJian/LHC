<template>
	<view class="content">
		<scroll-view style="height: 100vh" scroll-y="true" scroll-with-animation @scrolltolower="onReach">
			<!-- 弹窗 -->
			<aui-dialog
				ref="dialog"
				:title="auiDialog.title"
				:msg="auiDialog.msg"
				:btns="auiDialog.btns"
				:mask="auiDialog.mask"
				:maskTapClose="auiDialog.maskTapClose"
				:items="auiDialog.items"
				:theme="auiDialog.theme"
				@callback="dialogCallback"
			></aui-dialog>
			<advertising 
				@close='closeAdvertising' 
				:advertising='advertising'
				:advertisingShow='advertisingShow'
			></advertising>
			<w-loading text="加载中.." mask="false" click="false" ref="loading"></w-loading>
			<block v-for="(item, index) in modelu" :key="index">
				<!--搜索-->
				<search v-if="item.type == 'Search'" :data="item"></search>
				<!--banner轮播-->
				<banner-swiper v-if="item.type == 'Carousel'" :data="item"></banner-swiper>
				<!-- 导航 -->
				<scroll-nav v-if="item.type == 'Navlist'" :data="item"></scroll-nav>
				<!--新人专享-->
				<recommend v-if="item.type == 'SingleEmbedded'" :data="item"></recommend>
				<!--专题-->
				<subject v-if="item.type == 'Outsidetitle'" :data="item"></subject>
				<!-- 标题 -->
				<view v-if="item.type == 'Title'" :style="'padding:' +item.date.paddingtop*2 +'rpx ' +item.date.paddingright*2 +'rpx ' +item.date.paddingbottom*2 +'rpx ' +item.date.paddingleft*2 +'rpx;background: linear-gradient(180deg, ' +item.date.backgroundColor0 +' 0%, ' +item.date.backgroundColor50 +' ' +item.date.backgroundColorN +'%,' +item.date.backgroundColor100 +' 100%); '">
					<Title  :date="item.date"/>
				</view>
				<!-- 商品轮播 -->
				<view v-if="item.type == 'GoodsList'" :style="'padding:' +item.date.paddingtop*2 +'rpx ' +item.date.paddingright*2 +'rpx ' +item.date.paddingbottom*2 +'rpx ' +item.date.paddingleft*2 +'rpx;background: linear-gradient(180deg, ' +item.date.backgroundColor0 +' 0%, ' +item.date.backgroundColor50 +' ' +item.date.backgroundColorN +'%,' +item.date.backgroundColor100 +' 100%); '">
					<GoodsList  :date="item.date"/>
				</view>
				<!-- 大图 -->
				<view v-if="item.type == 'BigPicture'" :style="'padding:' +item.date.paddingtop*2 +'rpx ' +item.date.paddingright*2 +'rpx ' +item.date.paddingbottom*2 +'rpx ' +item.date.paddingleft*2 +'rpx;background: linear-gradient(180deg, ' +item.date.backgroundColor0 +' 0%, ' +item.date.backgroundColor50 +' ' +item.date.backgroundColorN +'%,' +item.date.backgroundColor100 +' 100%); '">
					<BigPicture  :date="item.date"/>
				</view>
				<!-- 商品表格 -->
			<!-- 	<view v-if="item.type == 'GoodsForm'" :style="'padding:' +item.date.paddingtop*2 +'rpx ' +item.date.paddingright*2 +'rpx ' +item.date.paddingbottom*2 +'rpx ' +item.date.paddingleft*2 +'rpx;background: linear-gradient(180deg, ' +item.date.backgroundColor0 +' 0%, ' +item.date.backgroundColor50 +' ' +item.date.backgroundColorN +'%,' +item.date.backgroundColor100 +' 100%); '"> -->
					
						<view v-if="item.type == 'GoodsForm'" >
					<GoodsForm  :date="item.date"/>
				</view>
			</block>
			<!--推荐-->
			<view class="w100 h-0 bs-bb" style="border-bottom: 1px solid #F1F1F1;"></view>
			<view style="margin-top:60rpx;" v-if='modelu.length > 0'>
				<!--导航-->
				<navTab
					ref="navTab"
					:isBorder="isBorder"
					:borderW="borderW"
					:tabTitle="tabTitle"
					:paddingB="paddingB"
					:paddingT="paddingT"
					@changeTab="changeTab"
					:fontSize="fontSize"
					:activeColor="activeColor"
					:textColor="textColor"
				></navTab>
				<view class="mt-30 w-690 m-0-a dp-f fw-w jc-sb">
					<view v-for="(item, i) in tabList" :key="i" class="mb-60"><goods-module :item="item"></goods-module></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import bannerSwiper from '@/components/brannerSwiper/brannerSwiper.vue';
import goodsModule from '@/components/goodsModule/goodsModule.vue';
import topicelist from '@/components/topicelist/topicelist.vue';
import { aui } from '@/components/aui-dialog/common/aui/js/aui.js';
import auiDialog from '@/components/aui-dialog/aui-dialog.vue';
import navTab from '@/components/navTab/navTab';
import search from '@/components/search/search.vue';
import scrollNav from '@/components/scrollNav/scrollNav.vue';
import recommend from '@/components/recommend/recommend.vue';
import advertising from '@/components/advertising/advertising.vue';
import subject from '@/components/subject/subject.vue';
//组件初始化
import Title from '@/components/model/title.vue';
import GoodsList from "@/components/model/goodsList.vue";
import BigPicture from "@/components/model/bigPicture.vue";
import GoodsForm from "@/components/model/goodsForm.vue";

var _this = this;
export default {
	components: {
		bannerSwiper,
		goodsModule,
		topicelist,
		auiDialog,
		navTab,
		search,
		scrollNav,
		recommend,
		advertising,
		subject,
		//组件初始化
		Title,
		GoodsList,
		BigPicture,
		GoodsForm
	},
	data() {
		return {
			modelu: [],
			tabTitle: ['热门', '新品', '合辑'],
			tabContent: [{ name: '热门', page: 1, size: 6, list: [] }, { name: '新品', page: 1, size: 6, list: [] }, { name: '合辑', page: 1, size: 6, list: [] }],
			currentTab: 0,
			activeColor: '#151515',
			textColor: '#999999',
			fontSize: '28',
			paddingT: 0,
			paddingB: 4,
			borderW: 56,
			isBorder: false,
			shwoPop: true,
			imgList: [],
			actList: [],
			setsplist: [],
			auiDialog: {
				title: '',
				msg: '',
				btns: [
					{
						name: '确定'
					}
				],
				mask: true,
				maskTapClose: true,
				items: [],
				theme: 1
			},
			classbox: [],
			tabList: [],
			advertising:{},
			advertisingShow:false
		};
	},
	onReady() {},
	onLoad() {
		// 开启loading
		this.$nextTick(() => {
			this.$refs.loading.open();
		});
		// this.$http.getIndexModelu().then(res => {
		// 	console.log('res', res.data.data);
		// 	this.modelu = res.data.data;
		// });
		// Promise.all([this.$http.banner(), this.$http.activities(), this.$http.menus(), this.$http.special()]).then(res => {
		// 	// console.log(res)
		// 	this.setSwiperImg(res[0]);
		// 	this.setactivite(res[1]);
		// 	this.setmenus(res[2]);
		// 	this.setspecial(res[3]);
		// 	// 关闭loading
		// 	this.$refs.loading.close();
		// });
		Promise.all([this.$http.getIndexModelu()]).then(res => {
			this.modelu = res[0].data.data;
			console.log(this.modelu,'//////////')
			this.$nextTick(() => {
				this.$refs.loading.close();
			});
			// 关闭loading
			// setTimeout(()=>{
			// 	this.$refs.loading.close();
			// },500)
		});
		this.setTabGoods(0);
		this.$http.popupListAll().then(res=>{
			console.log(res)
			this.advertisingShow=true
			this.advertising=res.data.data[0]
		})
	},
	methods: {
		// 上拉加载
		onReach() {
			//一定时间内禁止重复调用模式
			this.$jiuaiDebounce.canDoFunction({
				key: 'click', //基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
				time: 1000, //如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
				success: () => {
					//成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
					this.setTabGoods(this.currentTab);
				}
			});
		},
		changeTab(index) {
			if (this.currentTab == index) return;
			if (this.tabContent[index].list.length == 0) {
				this.setTabGoods(index);
			} else {
				this.tabList = this.tabContent[index].list;
				console.log(this.tabContent[index].list);
			}
			this.currentTab = index;
		},
		queryTabGoods(index, option) {
			return new Promise((resolve, reject) => {
				this.$http.getIndexHot(option).then(res => {
					resolve(res);
				});
			});
		},
		//请求tab商品
		setTabGoods(index) {
			if (this.tabContent[index].queryNone) {
				uni.showToast({
					title: '没有更多了',
					icon: 'none'
				});
				return;
			}
			this.$nextTick(() => {
				this.$refs.loading.open();
			});
			const option = {
				pageIndex: this.tabContent[index].page,
				pageSize: this.tabContent[index].size,
				type: index + 1
			};

			let goodsList = [];
			this.queryTabGoods(index, option).then(res => {
				this.$nextTick(() => {
					this.$refs.loading.close();
				});
				if (res.data.data.records.length == 0) {
					if (this.tabContent[index].page !== 1) {
						this.tabContent[index].queryNone = true;
					}
					uni.showToast({
						title: '没有更多了',
						icon: 'none'
					});
				}
				this.tabContent[index].page += 1;
				const goodsList = res.data.data.records;
				this.tabContent[index].list = this.tabContent[index].list.concat(goodsList);
				this.tabList = this.tabContent[index].list;
			});
		},
		// 轮播
		setSwiperImg(data) {
			this.imgList = data.data.data;
		},
		// 活动
		setactivite(data) {
			this.actList = data.data.data;
		},
		// 菜单
		setmenus(data) {
			this.classbox = data.data.data;
		},
		// 专题
		setspecial(data) {
			this.setsplist = data.data.data;
		},
		//dialog弹窗底部按钮回调
		dialogCallback(e) {
			var _this = this;
			console.log(e);
		},
		closeAdvertising(){
			this.advertisingShow=false
			console.log('00000')
		},
		alert(theme) {
			var _this = this;
			_this.auiDialog.title = '提示';
			_this.auiDialog.msg = '您点击了';
			_this.auiDialog.items = [];
			_this.auiDialog.btns = [
				{
					name: '取消'
				},
				{
					name: '确定'
				}
			];
			_this.auiDialog.theme = theme;
			_this.$refs.dialog.show();
		},
		//跳转
		check(e) {
			if (e == 1) {
				//体验装
				uni.navigateTo({
					url: '/pages/exdress/exdress'
				});
			} else if (e == 2) {
				//新品推荐
				uni.navigateTo({
					url: '/pages/newarrival/newarrival'
				});
			} else if (e == 3) {
				//新品推荐
				uni.navigateTo({
					url: '/pages/selarea/selarea'
				});
			} else if (e == 4) {
				//超值简装
				uni.navigateTo({
					// url: '/pages/selarea/selarea',
				});
			} else if (e == 5) {
				//积分商城
				uni.navigateTo({
					url: '/pagesB/exchange/exchange'
				});
			}
		}
		// 多请求同步执行
		// async yy(){
		// 	console.log('1')
		// 	await this.$http.banner({id:1}).then(res=>{
		// 		console.log('3')
		// 		//loading 关闭
		// 		this.$refs.loading.close()
		// 	})
		// 	console.log('2')
		// }
	}
};
</script>

<style lang="scss">
// scroll-view 下拉条隐藏
::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
	display: none;
}

.ficat {
	flex-flow: column;
}
</style>
