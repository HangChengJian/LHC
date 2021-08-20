<template>
	<view class="announcement">
		<view class="content uni-flex uni-flex-item fx-ct">
			<view class="bigtit">
				news头条
			</view>
			<block >
				<view class="example-body" style="flex: 1;padding-top: 10px;">
					<!-- <uni-notice-bar  color='#F49267' scrollable="true" single="true" :text="notice" background-color='#fff'></uni-notice-bar> -->
				</view>
				<!-- 	<view class="seamless">
					<view class="seamless-scroll" :style="{left: marqueeDistance + 'px'}">{{ module.allValue.announContent }}</view>
				</view> -->
				<!-- <swiper class="swiper" autoplay="true" circular="true" vertical="false" interval="6000">
					<swiper-item class="swiper-item gonggao" v-for="(item, index) in swiperText" :key="index">
						{{ module.allValue.announContent }}
					</swiper-item>
				</swiper> -->
			</block>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {
			uniNoticeBar
		},
		props: ['module', 'preview', 'modulesIndex'],
		data() {
			return {
				scroll: true,
				announcementList: [],
				hideNotice: false,
				marqueePace: 1, //滚动速度
				marqueeDistance: 10, //初始滚动距离
				size: 12,
				interval: 20, // 时间间隔
				countTime: '',
				length: '',
				windowWidth: 0,
				swiperText: ['我是大幅度', '嘻嘻嘻地方', '消息的放放风']
			}
		},
		
		created() {
			
		},
		computed: {
			
			notice() {
				return '哒哒哒哒哒哒多多多多多多多多多多多多多多多多多多多多多多'
			}
		},
		methods: {
			
		}
	}
</script>

<style >
	
	.announcement {
		padding: 0 20upx;
		height: 82upx;
		display: flex;
		flex-direction: row;
		overflow: hidden;
		background-color: #fff;
		/* border-radius: 60upx; */
		width: 93%;
		box-sizing: border-box;
		margin: 0 auto;
		/* margin-top:20upx; */
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	.announcement .content {
		height: 100%;
		flex: 1 1 0%;
	}

	.announcement .icon {
		width: 64upx;
		height: 64upx;
		vertical-align: middle;
		display: flex;
		align-items: center;
		margin: 18upx 20upx 10upx 0;
	}

	.announcement .swiper {
		flex: 1 1 0%;
		height: 60upx;
	}

	.announcement .swiper-item .tit {
		margin-top: 6upx;
		font-size: 28upx;
		line-height: 1.5;
	}

	.announcement .swiper-item .last {
		color: #999999;
		line-height: 1.5;
		font-size: 25upx;
	}

	.seamless {
		position: relative;
		width: 100%;
		height: 50upx;
		padding: 25upx 0;
		overflow: hidden;
	}

	.seamless-scroll {
		white-space: nowrap;
		position: absolute;
	}

	.gonggao {
		line-height: 60upx;
		color: #F49267;
	}

	.bigtit {
		font-size: 30upx;
		font-weight: 600;
		line-height: 60upx;
		/* padding-right: 20upx; */
		color: #FE6962;
	}
</style>
