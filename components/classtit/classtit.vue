<template>
	<view class="">
		<view class="dp-f jc-sa w-750 h-100 ai-c" :class="{'tab-border':border}">
			<!-- <view class="fs-26 c-333 fw-b">综合</view>
			<view class="fs-26 c-999">热销</view>
			<view class="dp-f fs-26 c-999 ai-c">价格<view class="ml-10">
					<image src="../../static/icon/px.png" class="w-16 h-20"></image>
				</view>
			</view>
			<view class="dp-f fs-26 c-999 ai-c" @click="onScreen">筛选<view class="ml-10">
					<image src="../../static/icon/sx.png" class="w-20 h-20"></image>
				</view>
			</view> -->
			<view class="dp-f fs-26 c-999 ai-c" :class="{'fw-b color3':activeIndex == index}"
				v-for='(item,index) in tabList' @click="onTab(index)" :key='index'>{{item.title}}
				<view class="ml-10">
					<image src="../../static/icon/px.png" class="w-16 h-20" v-show='index == 2 && activeIndex !==index'>
					</image>
					<image src="../../static/icon/px-top.png" class="w-16 h-20"
						v-show='index == 2 && activeIndex ==index && sort'></image>
					<image src="../../static/icon/px-bottom.png" class="w-16 h-20"
						v-show='index == 2 && activeIndex ==index && !sort'></image>
					<image src="../../static/icon/sx.png" class="w-20 h-20" v-show='index == 3 && activeIndex !==index'>
					</image>
					<image src="../../static/icon/sx2.png" class="w-20 h-20" v-show='index == 3 && activeIndex ==index'>
					</image>
				</view>
			</view>
		</view>
		<view class="mt-30" v-if='goodsShow'>
			<view class=" w-690 m-0-a dp-f fw-w jc-sb">
				<view v-for="(item,i) in goodsList" :key="i" class="mb-60" @click="$outerHref('/pages/goodsDetails/goodsDetails?id='+item.id)">
					<view class="goods-module w-336 dp-f jc-c fd-c">
						<view class="bg-f6">
							<image :src="item.coverImage" mode="" class="w100 h-336"></image>
						</view>
						<view class="fs-32 ta-c fw-b t-ohs pt-20">
							{{item.name}}
						</view>
						<view class="t-ohs fs-24 color-60 pt-10 m-0-a h-80 ta-c" v-if='item.description'>
							{{item.description}}
						</view>
						<view class="fs-32 ta-c fw-b t-oh pt-12">
							￥{{item.price}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsShow: {
				type: Boolean,
				default: true
			},
			border: {
				type: Boolean,
				default: true
			},
			goodsList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				activeIndex: 0, //选中下标
				sort: true, //价格升序降序
				tabList: [{
					title: '综合'
				}, {
					title: '热销'
				}, {
					title: '价格'
				}],
				// , {
				// 	title: '筛选'
				// }
			}
		},
		methods: {
			onTab(index) {
				this.activeIndex = index
				switch (index) {
					case 0:
						this.onSelect(0)
						break;
					case 1:
						this.onSelect(1)
						break;
					case 2:
						this.onSelect(2)
						this.sort = !this.sort
						break;
					case 3:
						this.onScreen()
						break;
				}
			},
			onScreen() {
				this.$emit('showScreen',true)
			},
			onSelect(index){
				this.$emit('onSelect',index,this.sort)
			}
		}
	}
</script>

<style scoped>
	.tab-border{
		border: 1px solid #F7F7F7;
	}
	.color3 {
		color: #333;
	}
</style>
