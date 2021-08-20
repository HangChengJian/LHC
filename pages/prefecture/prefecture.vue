<template>
	<view >
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<view v-if='info.name'>
			<view class="search-box">
				<search :data='searchText'></search>
			</view>
			<image :src="info.coverImg" mode="widthFix" style="width: 100%;" v-if="info.coverImg" @click="$outerHref(info.jumpUrl)"></image>
			<view class="tab-box"><classtit :goodsShow="false" @showScreen="showScreen" @onSelect="onSelect" :border='false'></classtit></view>
			<view class="mt-20 w-690 m-0-a dp-f fw-w jc-sb">
				<view v-for="(item, i) in goodsList" :key="i" class="mb-60"><goods-module :item="item"></goods-module></view>
			</view>
		</view>
	</view>
</template>

<script>
import classtit from '@/components/classtit/classtit.vue';
import goodsModule from '@/components/goodsModule/goodsModule.vue';
import search from '@/components/search/search.vue';
export default {
	components: {
		classtit,
		goodsModule,
		search
	},
	data() {
		return {
			info: {},
			isReach: false,
			goodsList: [],
			parameter: {
				brandId: 0,
				keyword: '',
				pageIndex: 1,
				pageSize: 10,
				publishStatus: 0,
				sortField: '',
				sortOrder: '',
				tagId: 0
			}
		};
	},
	onLoad(e) {
		uni.setNavigationBarTitle({
			title: e.name
		});
		this.$http.getPrefecture({ name: e.name }).then(({ data: data }) => {
			this.info = data.data;
		});
		this.parameter.keyword = e.name;
		this.getList();
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
	methods: {
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
		showScreen(type) {
			if (type) {
				this.$refs.jfpopupRef.show(); // 或者 boolShow = rue
				return;
			}
			this.$refs.jfpopupRef.close(); // 或者 boolShow = rue
		},
		onSelect(index, type) {
			console.log(index, type);
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
			this.goodsList = [];
			this.getList();
		}
	}
};
</script>

<style lang="scss" scoped>
.search-box{
	margin-bottom: 20rpx;
}
</style>
