<template>
	<view>
		<view class="mt-20 mb-40 p-0-30 bs-bb" v-for="(item,index) in setsplist" :key="index" @click="goView(item.url)">
			<view class="w100 h-420 m-0-a">
				<image :src="item.img" class="w-690 h-420"></image>
			</view>
			<view class="mt-20 w-672 fw-b fs-32">{{item.title}}</view>
			<view class="mt-20 w-672 h-66 fs-24 c-666 t-ohs">{{item.titleCenter}}</view>
			<!-- <view class="dp-f" style="margin-top: 20rpx;">
				<view class="dp-f ">
					<image src="../../static/icon/like.png" class="w-30 h-28"></image>
					<view class="fs-22 c-666 ml-4" >{{item.likeNum}}</view>
				</view>
				<view class="dp-f ml-30">
					<image src="../../static/icon/evaluate.png" class="w-30 h-28"></image>
					<view class="fs-22 c-666 ml-4" >{{item.commentNum}}</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props:['setsplist'],
		data() {
			return {
				speciallist: [{
						id: 1,
						imgurl: '',
						title: '重磅标题标题标题标题标题标题标题标题标题标',
						cont: '文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文...'
					},
					{
						id: 2,
						imgurl: '',
						title: '重磅标题标题标题标题标题标题标题标题标题标',
						cont: '文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文...'
					},
					{
						id: 3,
						imgurl: '',
						title: '重磅标题标题标题标题标题标题标题标题标题标',
						cont: '文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文...'
					}
				],
			}
		},
		onLoad(){},
		onShow() {},
		watch:{},
		computed:{},
		methods:{
			goView(url){
				console.log(url)
				let view = encodeURIComponent(JSON.stringify(url))
				uni.navigateTo({
					url:'/pagesB/viewPage/viewPage?url='+view
				})
			}
		},
	}
</script>

<style>
</style>
