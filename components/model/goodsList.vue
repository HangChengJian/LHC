<template>
		 <swiper :style="'height: '+ swiperHeight+'vw;'" class="swiper" :indicator-dots="false" :autoplay="false" :display-multiple-items='100/date.width' active-class='swiperSon'>
		  <swiper-item
				v-for="(item, index) in date.dateArr"
				:key="index"
				>
				<view style="padding-right: 10rpx;" class="goodsview"  @click="lockGs(item.goodsId)">
					<view style="background: #F6F6F6">
						<image :src="item.coverImage" mode='scaleToFill'  :style="';width: '+date.width+'vw;height: '+date.width+'vw'"/>
					</view>
						<view class="title">{{ item.goodsName }}</view>
						<view class="price">
							￥{{ item.price }} 
						</view>
				</view>
		  </swiper-item>
		</swiper>
</template>

<script>
export default {
  name: 'GoodsList',
  components: {},
  props: {
    date: {
      type: Object,
      default() {
        return {}
      }
    }
  },
	data() {
	    // 这里存数据
	    return {
	      swiperHeight: this.date.width+20,
	    };
	  },
	methods:{
			lockGs(id){
				uni.navigateTo({
					url: '/pages/goodsDetails/goodsDetails?id='+id,
				});
			}
		},
}
</script>
<style lang="scss" scoped>
	.goodsview{
		text-align: center;
		font-family: PingFang SC;
	}
	.title{
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #5B5B5B;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		margin: 0 20rpx;
	}
	.price{
		font-size: 32rpx;
		font-weight: bold;
		line-height: 45rpx;
		color: #000000;
	}
</style>
