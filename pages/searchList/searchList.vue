<template>
	<view class="searchList-box">
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<view v-if="!isNone">
			<view class="tab-box"><classtit :goodsShow="false" @showScreen="showScreen" @onSelect="onSelect"></classtit></view>
			<view>
				<view class="h-100"></view>
				<view class="dp-f mt-30 bs-bb pl-30" v-for="(item, index) in goodsList" :key="item.id" @click="$outerHref('/pages/goodsDetails/goodsDetails?id='+item.id)">
					<view class="goods-cover-box">
						<view class="cartImg "><image :src="item.coverImage" class="w100 h100"></image></view>
					</view>
					<view class="bs-bb pr-10 pl-20 f-1">
						<view class="fs-28 fw-b t-ohs c-15 pt-30 pr-40" style="height: 80rpx;">{{ item.name }}</view>
						<view class="mt-16 ">
							<view class="ta-c bd-15 color-a29 il-box p-0-32 bd-a2 fs-24 mr-10" v-if='item.isNew'>新品</view>
							<view class="ta-c bd-15 color-a29 il-box p-0-32 bd-a2 fs-24 mr-10" v-if='item.isRecommend'>推荐</view>
						</view>
						<view class="fs-32 fw-b  c-15 pt-24">￥{{ item.price }}</view>
					</view>
				</view>
				<view class="h-100"></view>
			</view>
		</view>
		<!-- 筛选 -->
		<popup-layer ref="jfpopupRef" :direction="'left'" :autoClose="false">
			<filtrate-pop @showScreen="showScreen" :filtrateList="list" @changeTag="changeTag"></filtrate-pop>
		</popup-layer>

		<view class="bs-bb p-0-30" v-show="isReach && isNone">
			<view class="mt-20 dp-f ai-c jc-sb">
				<view class="dp-f ai-c bg-f6 h-60 f-1">
					<image src="../../static/icon/search.png" class="w-26 h-26 pl-30"></image>
					<input type="text" value="" placeholder="搜索品牌内商品" class="pl-20 fs-26 c-333" placeholder-class="color-9e" v-model="inputSearch" @confirm="sendsearch" />
				</view>
				<view class="fs-26 color-96 pl-18" @click="$goBack">取消</view>
			</view>
			<view class="">
				<view class=" h-700 bg-fff">
					<view class="hint-box dp-f fd-c ai-c">
						<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/xxsx/image/qs1.jpg" mode="widthFix" style="margin-top: 222rpx;"></image>
						<text class="fs-28 color-15 " style="padding: 80rpx 0 30rpx 0;">很抱歉，暂时无法搜索到商品哦~</text>
						<view class="fs-28 color-15 c-999">换个关键词试试吧</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import filtratePop from '@/components/filtratePop/filtratePop';
import popupLayer from '@/components/popup/popup-layer';
import classtit from '@/components/classtit/classtit.vue';
export default {
	components: {
		filtratePop,
		popupLayer,
		classtit
	},
	data() {
		return {
			list: [],
			isReach: false,
			isNone: false,
			goodsList: [],
			tabIndex: 0,
			inputSearch:'',
			parameter: {
				// brandId: 0,
				keyword: '',
				pageIndex: 1,
				pageSize: 10,
				publishStatus: 0,
				sortField: '',
				sortOrder: '',
				// tagId: 0
			}
		};
	},
	// 上拉加载
	onReachBottom() {
		//一定时间内禁止重复调用模式
		this.$jiuaiDebounce.canDoFunction({
			key: 'click', //基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
			time: 1000, //如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
			success: () => {
				//成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
				this.getList();
			}
		});
	},
	onLoad(e) {
		this.parameter.keyword = e.name;
		this.getList();
		setTimeout(() => {
			const list = [
				{
					title: '风格',
					list: [{ name: '干警', id: '10' }, { name: '文艺', id: '20' }, { name: '开朗', id: '30' }, { name: '温柔', id: '40' }]
				},
				{
					title: '香调',
					list: [{ name: '木质', id: '50' }, { name: '花香', id: '60' }, { name: '柑橘', id: '70' }, { name: '果香', id: '80' }]
				},
				{
					title: '规格',
					list: [{ name: '试香', id: '90' }, { name: '合辑', id: '100' }]
				},
				{
					title: '品牌',
					list: [{ name: '帕尔马', id: '11' }, { name: '宝格丽', id: '12' }, { name: '爱马仕', id: '13' }, { name: '六神', id: '14' }]
				}
			];
			this.list = list;
		}, 1000);
	},
	onShow() {},
	watch: {},
	computed: {},
	methods: {
		sendsearch(){
			this.$setSearch(this.inputSearch)
			this.parameter.keyword = this.inputSearch;
			this.parameter.pageIndex = 1
			this.isReach = false
			this.isNone= false,
			this.getList();
		},
		onSelect(index, type) {
			// 热销: sortField: sales, sortOrder: desc;      价格: sortField: price, sortOrder: desc (降序), asc(升序)
			if (this.tabIndex == index && index !== 2) {
				return;
			}
			this.tabIndex = index;
			switch (index) {
				case 0:
					console.log('0');
					this.parameter.sortField = '';
					this.parameter.sortOrder = '';
					break;
				case 1:
					this.parameter.sortField = 'sale';
					this.parameter.sortOrder = 'desc';
					console.log('1');
					break;
				case 2:
					this.parameter.sortField = 'price';
					if (type) {
						this.parameter.sortOrder = 'desc';
					} else {
						this.parameter.sortOrder = 'asc';
					}
					break;
			}
			this.parameter.pageIndex = 1;
			this.isReach = false;
			this.goodsList = []
			this.getList();
		},
		getList() {
			if (this.isReach) {
				uni.showToast({
					title: '没有更多内容了',
					icon: 'none'
				});
				return;
			}
			this.$refs.loading.open();
			this.$http.Sendsearch(this.parameter).then(res => {
				this.$refs.loading.close();
				if (this.parameter.pageIndex == 1) {
					if (res.data.data.records.length == 0) {
						this.isReach = true;
						this.isNone = true;
						return;
					}
					this.goodsList = res.data.data.records;
				} else {
					if (res.data.data.records.length == 0) {
						this.isReach = true;
						return;
					}
					this.goodsList = this.goodsList.concat(res.data.data.records);
				}
				this.parameter.pageIndex++;
			});
		},
		changeTag(list) {
			this.list = list;
		},
		showScreen(type) {
			if (type) {
				this.$refs.jfpopupRef.show(); // 或者 boolShow = rue
				return;
			}
			this.$refs.jfpopupRef.close(); // 或者 boolShow = rue
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
	min-height: 100vh;
}

.searchList-box {
	.tab-box {
		width: 100%;
		position: fixed;
		top: 0;
		background: #fff;
	}
	.cartImg {
		width: 260rpx;
		height: 260rpx;
	}

	.collet-nav-box {
		background: #fff;
		border-bottom: 1px solid #eaeaea;
		position: fixed;
		width: 100%;
		left: 0;
		z-index: 0;
	}
}
</style>
