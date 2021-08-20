<!--品牌详情-->
<template>
	<view class="brand-box">
		<scroll-view style="height: 100vh" scroll-y="true" scroll-with-animation @scrolltolower="onReach">
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<!--品牌-->
		<view class="mt-30  dp-f bs-bb p-0-30">
			<view class="dp-f ai-c f-1">
				<view class="w-100 h-100 br50 ov-h "><image :src="brand.logoUrl" class="w-100 h-100"></image></view>
				<view class="f-1 ml-30">
					<view class="fs-32 fw-b" style="color: #080808;">{{ brand.titleEn }}</view>
					<view class="fs-26 c-999">{{ brand.title }}</view>
				</view>
			</view>
			
			<view class="mt-30" >
				<image
					:src="brand.hasLike ? '../../static/icon/order9.png' : '../../static/icon/order1.png'"
					mode=""
					class="w-26 h-22"
					:class="{ 'jello-vertical': brand.hasLike }"
					@click="setLike"
				></image>
			</view>
		</view>
		<!--文案-->
		<view class="w-676 mt-20  ml-30 dp-f fw-w">
			<view class="c-666 fs-26" v-if="mores">{{ brand.story }}</view>
			<view class="c-666 fs-26" v-if="!mores">{{ brand.story }}</view>
			<!-- <view class="999 fs-24 ml-19" v-if="mores" @click="more">更多</view>
			<view class="999 fs-24 dp-f jc-fe w100" v-if="!mores" @click="more">收起</view> -->
		</view>
		<!--banner-->
		<view class="mt-30 w-690 h-420 m-0-a"><image :src="brand.bgImage" class="w-690 h-420"></image></view>
		<!--商品列表-->
		<view class="mt-29"><classtit :goodsList="goodsList" @onSelect="onSelect"></classtit></view>
		</scroll-view>
	</view>
</template>

<script>
import classtit from '@/components/classtit/classtit.vue';
export default {
	components: {
		classtit
	},
	data() {
		return {
			mores: true,
			isLike: false,
			brand: [],
			goodsList: [],
			tabIndex:0,
			isQuery:false,
			parameter: {
				brandId: null,
				keyword: '',
				name: '',
				pageIndex: 1,
				pageSize: 10,
				publishStatus: 0,
				sortField: '',
				sortOrder: '',
				// tagId: 0
			}
		};
	},
	onLoad(e) {
		this.$http.getClassifyDet(e.id).then(res => {
			this.brand = res.data.data;
			this.parameter.brandId = this.brand.id;
			this.$refs.loading.close();
			this.getList();
		});
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
					// this.setTabGoods(this.currentTab);
					if(this.isQuery){
						uni.showToast({
							title:'没有更多了',
							icon:'none'
						})
						return
					}
					this.parameter.pageIndex +=1
					this.getList()
				}
			});
		},
		onSelect(index,type) {
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
		    this.parameter.pageIndex = 1
			this.isQuery = false
			this.getList();
		},
		getList() {
			this.$refs.loading.open();
			this.$http.Sendsearch(this.parameter).then(res => {
				this.$refs.loading.close();
				if(res.data.data.records.length == 0){
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
					this.isQuery = true
					return
				}
				console.log(res.data.data.records);
				this.goodsList = this.goodsList.concat(res.data.data.records);
			});
		},
		more() {
			this.mores = !this.mores;
		},
		// 收藏
		setLike() {
			// this.$refs.loading.open();
			this.$http.setbrandLike({ brandId: this.brand.id }).then(res => {
				// this.$refs.loading.close();
				this.brand.hasLike = !this.brand.hasLike;
			});
		}
	}
};
</script>

<style scoped lang="scss">
	.brand-box{
		width: 100vw;
		overflow: hidden;
	}
.jello-vertical {
	-webkit-animation: jello-vertical 0.9s both;
	animation: jello-vertical 0.9s both;
}

@-webkit-keyframes jello-vertical {
	0% {
		-webkit-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
	}
	30% {
		-webkit-transform: scale3d(0.75, 1.25, 1);
		transform: scale3d(0.75, 1.25, 1);
	}
	40% {
		-webkit-transform: scale3d(1.25, 0.75, 1);
		transform: scale3d(1.25, 0.75, 1);
	}
	50% {
		-webkit-transform: scale3d(0.85, 1.15, 1);
		transform: scale3d(0.85, 1.15, 1);
	}
	65% {
		-webkit-transform: scale3d(1.05, 0.95, 1);
		transform: scale3d(1.05, 0.95, 1);
	}
	75% {
		-webkit-transform: scale3d(0.95, 1.05, 1);
		transform: scale3d(0.95, 1.05, 1);
	}
	100% {
		-webkit-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
	}
}
@keyframes jello-vertical {
	0% {
		-webkit-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
	}
	30% {
		-webkit-transform: scale3d(0.75, 1.25, 1);
		transform: scale3d(0.75, 1.25, 1);
	}
	40% {
		-webkit-transform: scale3d(1.25, 0.75, 1);
		transform: scale3d(1.25, 0.75, 1);
	}
	50% {
		-webkit-transform: scale3d(0.85, 1.15, 1);
		transform: scale3d(0.85, 1.15, 1);
	}
	65% {
		-webkit-transform: scale3d(1.05, 0.95, 1);
		transform: scale3d(1.05, 0.95, 1);
	}
	75% {
		-webkit-transform: scale3d(0.95, 1.05, 1);
		transform: scale3d(0.95, 1.05, 1);
	}
	100% {
		-webkit-transform: scale3d(1, 1, 1);
		transform: scale3d(1, 1, 1);
	}
}
// .fload{
// 	width: 594rpx;
// 	height: auto;
// 	display: -webkit-box;
// 	word-break: break-all;
// 	-webkit-box-orient: vertical;
// 	/* 要显示多少行就改变line-clamp的数据,此处折叠起来显示一行*/
// 	-webkit-line-clamp: 1;
// 	overflow: hidden;
// 	text-overflow: ellipsis;
// }
// .hide{
// 	display: -webkit-box;
// }
// .show{
// 	display: block;
// }
</style>
