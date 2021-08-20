<template>
	<view class="bs-bb p-0-30">
		<w-loading text="加载中.." mask="false" click="true" ref="loading"></w-loading>
		<view class="mt-20 dp-f ai-c jc-sb">
			<view class="dp-f ai-c bg-f6 h-60 f-1">
				<image src="../../static/icon/search.png" class="w-26 h-26 pl-30"></image>
				<!-- <view >
					搜索品牌内商品
				</view> -->
				<input type="text" value="" placeholder="搜索商品" class="pl-20 fs-26 c-333 f-1 pr-20" placeholder-class="color-9e" v-model="searchCon" @confirm="sendsearch"/>
			</view>
			<view class="fs-26 color-96 pl-18">
				取消
			</view>
		</view>
		<!-- 历史记录 -->
		<view v-show="seatips">
			<view class="dp-f mt-40 ai-c jc-sb">
				<view class="fs-26 color-15 fw-b ">
					历史记录
				</view>
				<view class="iconfont" @click="delsearcon">&#xe629;</view>
			</view>
			<view class="dp-f fw-w jc-sb">
				<view class=" h-76 lh-76 ta-c fs-26 color-15 text-box t-oh" @click="goSearchList(item)" v-for='(item,index) in history' :key='index'>
					{{item}}
				</view>
				<view class=" h-76 lh-76 ta-c fs-26 color-15 " style="min-width: 111rpx;">
				</view>
				<view class=" h-76 lh-76 ta-c fs-26 color-15 "  style="min-width: 111rpx;">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import  from '@/components/'
	export default {
		components: {},
		data() {
			return {
				title: 'Hello',
				searchCon: '',
				seatips: false,
				history:[],
			}
		},
		onLoad(){},
		onShow() {
			const History = uni.getStorageSync('Search')
			if(History){
				this.history = History.reverse()
				this.seatips = true
			} 
		},
		watch:{},
		computed:{},
		methods:{
			// 请求搜索接口
			sendsearch () {
				uni.navigateTo({
					url:'/pages/searchList/searchList?name='+this.searchCon
				})
				this.$setSearch(this.searchCon)
			},
			// 清空全部浏览记录
			delsearcon() {
				uni.removeStorage({
				    key: 'Search',
				    success:(res)=> {
				        console.log('success');
							uni.showToast({
							    title: '删除成功',
								icon: 'none'
							});
						this.seatips = false
						this.history = []
				    }
				});
				// this.$refs.loading.open();
				// this.$http.clearSearch().then(res=>{
				// 	this.seatips = false
				// 	uni.showToast({
				// 	    title: '删除成功',
				// 		icon: 'none'
				// 	});
				// 	this.$refs.loading.close();
				// })
			},
			goSearchList(name){
				uni.navigateTo({
					url:'/pages/searchList/searchList?name='+name
				})
			}
			
		},
	}
</script>

<style lang="scss" scoped>
	.text-box{
		border: 1px solid #E5E5E5;
		padding: 0 18rpx;
		margin-top:20rpx ;
		min-width: 110rpx;
	}
</style>
