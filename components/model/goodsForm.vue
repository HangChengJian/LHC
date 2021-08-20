<template>
  <div class="GoodsFormDiv mt-30 w-690 m-0-a dp-f fw-w jc-sb ">
      <view
        v-for="(item, index) in date.dateArr"
        :key="index"
		class="mb-60"
      >
	  <!-- :style="'width:'+isWidth+'px;'" -->
	  <goods-module :item="item"></goods-module>
       <!-- <div  @click="lockGs(item.goodsId)" class="GoodsFormCol" :style="'margin:'+date.margin+'px;padding: '+date.padding+'px;'">
          <view style="background: #F6F6F6">
          	<image :src="item.coverImage" mode='scaleToFill'  :style="'width:'+goodsWidth+'px;;height: '+goodsWidth+'px'"/>
          </view>
          <div class="title">{{ item.goodsName }}</div>
          <div class="name">{{ item.description }}</div>
          <div class="price">
            €{{ item.price }}
          </div>
        </div> -->
      </view>
  </div>
</template>

<script>
	import goodsModule from '@/components/goodsModule/goodsModule.vue';
export default {
  name: 'GoodsForm',
  components: {goodsModule},
  props: {
    date: {
      type: Object,
      default() {
        return {}
      }
    }
  },
	data() {
		return {
			isWidth: 0,
			goodsWidth:0
		};
	},
	created() {
		var that = this
		// 获取设备宽度
		console.log(this.date)
		uni.getSystemInfo({
			success(e) {
				that.isWidth = (e.windowWidth-that.date.paddingright-that.date.paddingleft)/that.date.column
				that.goodsWidth=that.isWidth-that.date.margin*2-that.date.padding*2
			}
		})
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
.GoodsFormDiv {
 //  text-align: center;
	// display: flex;
	// flex-wrap: wrap;
  .GoodsFormCol {
    box-shadow: 0px 1px 10px rgba(215,215,215,0.3);
    .title{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
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
			font-family: Adobe Gothic Std;
			font-weight: normal;
			line-height: 70rpx;
			color: #333333;

		}
  }
}
</style>
