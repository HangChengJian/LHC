<template>
	<view class="goods-details">
		<w-loading text="加载中.." mask="false" click="false" ref="loading"></w-loading>
		<cus-previewImg ref="cusPreviewImg" :list="goodsInfo.images" />
		<nav-bar type="transparent" fontColor="#FFF"></nav-bar>
		<view class="uni-padding-wrap">
			<!-- 轮播 -->
			<view class="page-section swiper bg-f6">
				<view class="page-section-spacing pt-r">
					<swiper class="swiper h-750" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="true" @change="swiperChange">
						<swiper-item class="swiperItem bg-f6" @click="previewImg(index)" v-for="(item, index) in swiperImg" :key="index">
							<image :src="item" mode="" class="w100 h100"></image>
						</swiper-item>
					</swiper>
					<view class="tag-box">{{ swiperIndex }}/{{ swiperImg.length || 1 }}</view>
				</view>
			</view>
			<!-- 商品描述 -->
			<view class="goods-desc-box  ">
				<view v-if='goodsInfo.isPackage'>
					<view class="fs-38 pt-20" >￥{{ goodsInfo.price }}</view>
				</view>
				<view v-else-if='goodsInfo.skuList.length == 1'>
					<view class="fs-38 pt-20" >￥{{ goodsInfo.skuList[0].price }}</view>
				</view>
				<view v-else>
					<view class="fs-38 pt-20" v-if="activeInfo.price">￥{{ activeInfo.price }}</view>
					<view class="fs-38 pt-20" v-else>
						<text v-if='goodsInfo.minPrice'>￥</text> {{ goodsInfo.minPrice }}<text v-if='goodsInfo.minPrice'>~</text> {{ goodsInfo.maxPrice }}</view>
				</view>
				
				<view class="dp-f jc-sb pt-8">
					<view class="t-ohs fs-28 f-1">{{ goodsInfo.name || '' }}</view>
					<view class="dp-f fd-c ai-c ml-50" @click="setLike">
						<image
							:src="isLike ? '../../static/icon/order9.png' : '../../static/icon/order1.png'"
							mode=""
							class="w-36 h-32"
							:class="{ 'jello-vertical': isLike }"
						></image>
						<!-- <image src="../../static/icon/order1.png" mode="" class="w-26 h-22"></image> -->
						<view class="fs-22 color-5d pt-10">收藏</view>
					</view>
				</view>
				<view class="t-oh fs-28 f-1 color-8f" v-if='goodsInfo.subTitle '>{{ goodsInfo.subTitle}}</view>
				<view class="dp-f">
					<view class="w-160 h-40 lh-40 ta-c fs-24 tit-tag mt-16 mr-20" v-for="(item, index) in goodsInfo.tags" :key="index">{{ item }}</view>
				</view>
			</view>
			<!-- 优惠 未完成功能-->
			<!-- <view class="list-box  bg-fff mt-14 p-0-30 dp-f jc-sb pb-20" @tap="show">
				<view class="fs-30 fw-b pr-40 pt-20">优惠</view>
				<view class="f-1">
					<view class="dp-f jc-sb ai-c pt-20">
						<view class="fs-30">
							<text class="color-a29">【积分】</text>
							活动一
						</view>
						<view class="iconfont color-333 fs-30">
							&#xe601;
						</view>
					</view>
					<view class="dp-f jc-sb ai-c pt-20">
						<view class="fs-30">
							<text class="color-a29">【积分】</text>
							活动二
						</view>
							<view class="iconfont color-333 fs-30">
							&#xe601;
						</view>
					</view>
				</view>
			</view> -->
			<!-- 规格 -->
			<view class="list-box h-77 bg-fff mt-14 p-0-30 dp-f ai-c jc-sb" @click="showPop" v-if='goodsInfo.isPackage'>
				<view class="dp-f ai-c">
					<view class="fs-30 fw-b pr-40">规格</view>
					<view class="fs-30" >已选 {{ goodsInfo.packageSkuInfo.otherName }}</view>
				</view>
				<view class="dp-f ai-c">
					<view class="iconfont color-333 fs-30">&#xe601;</view>
				</view>
			</view>
			<view class="list-box h-77 bg-fff mt-14 p-0-30 dp-f ai-c jc-sb" @click="showPop" v-else-if='goodsInfo.skuList.length == 1'>
				<view class="dp-f ai-c">
					<view class="fs-30 fw-b pr-40">规格</view>
					<view class="fs-30" >已选 {{ goodsInfo.skuList[0].name }}</view>
				</view>
				<view class="dp-f ai-c">
					<view class="iconfont color-333 fs-30">&#xe601;</view>
				</view>
			</view>
			<view class="list-box h-77 bg-fff mt-14 p-0-30 dp-f ai-c jc-sb" @click="showPop" v-else>
				<view class="dp-f ai-c">
					<view class="fs-30 fw-b pr-40">规格</view>
					<view class="fs-30" v-if="activeInfo.name">已选 {{ activeInfo.name }}</view>
				</view>
				<view class="dp-f ai-c">
					<view class="fs-30 " v-if="!activeInfo.name">未选择</view>
					<view class="iconfont color-333 fs-30">&#xe601;</view>
				</view>
			</view>
			<!-- 积分 -->
			<view class="list-box h-77 bg-fff mt-14 p-0-30 lh-77 fs-26 fs-30 fw-b" @click="shwoIntegral(true)" v-if="goodsInfo.giftPoint">积分 下单送积分</view>
			<!-- 服务 -->
			<view class="list-box h-77 bg-fff mt-14 p-0-30 dp-f ai-c jc-sb" @tap="show">
				<view class="dp-f ai-c">
					<view class="fs-30 fw-b pr-40">服务</view>
					<view class=" dp-f ai-c">
						<view class="dp-f ai-c mr-42">
							<image src="../../static/icon/order3.png" mode="" class="w-18 h-20 mr-6"></image>
							<view class="fs-24 pl-4">正品保障</view>
						</view>
						<view class="dp-f ai-c mr-42">
							<image src="../../static/icon/order4.png" mode="" class="w-22 h-20 mr-6"></image>
							<view class="fs-24 pl-4">下单积分</view>
						</view>
						<view class="dp-f ai-c">
							<image src="../../static/icon/order5.png" mode="" class="w-18 h-20 mr-6"></image>
							<view class="fs-24 pl-4">包邮条件</view>
						</view>
					</view>
				</view>

				<view class="iconfont color-333 fs-30">&#xe601;</view>
			</view>
			<!-- 须知 -->
			<view class="list-box h-77 bg-fff mt-14 p-0-30 dp-f ai-c jc-sb" @tap="notice">
				<view class="dp-f ai-c">
					<view class="fs-30 fw-b pr-40">须知</view>
					<view class=" dp-f ai-c">
						<view class="dp-f ai-c mr-42">
							<image src="../../static/icon/orders1.png" mode="" class="w-18 h-20 mr-6"></image>
							<view class="fs-24 pl-4">发货时间</view>
						</view>
						<view class="dp-f ai-c mr-42">
							<image src="../../static/icon/orders2.png" mode="" class="w-22 h-20 mr-6"></image>
							<view class="fs-24 pl-4">关于快递</view>
						</view>
						<view class="dp-f ai-c">
							<image src="../../static/icon/orders3.png" mode="" class="w-18 h-20 mr-6"></image>
							<view class="fs-24 pl-4">关于售后</view>
						</view>
					</view>
				</view>
				<view class="iconfont color-333 fs-30">&#xe601;</view>
			</view>
			<!-- 商品评价 -->
		<!-- 	<view class="list-box h-77 bg-fff mt-14 p-0-30 dp-f ai-c jc-sb" v-if="false">
				<view class="fs-30 fw-b">商品评价</view>
				<view class="iconfont color-8f fs-22">暂无评价</view>
			</view>
			<view class="bg-fff mt-14 p-0-30 " v-else>
				<view class=" box-bd dp-f jc-sb pt-20 bs-bb ai-c pb-49">
					<view class="fs-30 fw-b lh-30">商品评价</view>
					<view class="dp-f ai-c" @click="$outerHref('/pagesA/allcomment/allcomment')">
						<view class="color-8f fs-24  lh-24">更多</view>
						<view class="iconfont color-8f fs-30 lh30">&#xe601;</view>
					</view>
				</view>
				<view class="bs-bb user-bb">
					<view class="dp-f ai-c">
						<image src="https://source.unsplash.com/random" mode="" class="w-64 h-64 br50 ov-h"></image>
						<view class="pl-15">
							<view class="fs-24">香味</view>
							<view class="fs-22 color-cb">0.2ml</view>
						</view>
					</view>
					<view class="mt-20 t-ohs fs-24">
						文案文案文案文案文案文案文案文案文案文案文案文案文案文案
						文案文案文案文案文案文案文案文案文案文案文案文案文案文文案文案文案文案文案文案文案文案文案文案文案文
					</view>
					<view class="dp-f mt-7"><image :src="item" mode="" class="w-120 h-120 mr-20 " v-for="(item, index) in ImgListt" @click="previewImgto(index)" :key='index'></image></view>
				</view>
			</view> -->
			<!-- 精选推荐 -->
			<view class="list-box h-77 bg-fff mt-14 p-0-30 lh-77 fs-30 fw-b">精选推荐</view>
			<view class="skill-sequence-panel-content-wrapper pl-30 bg-fff pb-40">
				<!--横向滚动-->
				<scroll-view class="skill-sequence-panel-content" scroll-x show-scrollbar="false">
					<view class="skill-sequence-skill-wrapper" v-for="(item, index) in recommendList" :key="index"><goods-module :item='item'></goods-module></view>
				</scroll-view>
				<!-- 	<view class="pr-30">
					<view class="w100 bg-fff lock-more fs-28 h-80 lh-80 ta-c">
						选购全部商品
					</view>
				</view> -->
			</view>
			<!-- 品牌 -->
			<view class="bg-fff bs-bb mt-14" style="padding: 30rpx 40rpx;" v-if='!goodsInfo.isPackage'>
				<view class="dp-f ai-c jc-sb">
					<view class="dp-f ai-c">
						<image :src="brandInfo.logoUrl" mode="" class="w-100 h-100 br50"></image>
						<view class="pl-38">
							<view class="fs-32 fw-b">{{brandInfo.titleEn}}</view>
							<view class="fs-26 color-9">{{brandInfo.title}}</view>
						</view>
					</view>
					<view class="bg-000 w-150 h-48 dp-fc">
						<view class="dp-f ai-c " @click="$outerHref(`/pages/classifydet/classifydet?id=${goodsInfo.brandId}`,true)">
							<view class="fs-24 color-fff">进入品牌</view>
							<view class="iconfont color-fff fs-20">&#xe601;</view>
						</view>
					</view>
				</view>
				<view class="fs-26 color-6 pt-20 t-ohs">
					{{brandInfo.story}}
				</view>
			</view>
			
			<view class="skill-sequence-panel-content-wrapper pl-30 bg-fff pb-40">
				<!--横向滚动-->
				<scroll-view class="skill-sequence-panel-content" scroll-x show-scrollbar="false">
					<view class="skill-sequence-skill-wrapper" v-for="(item,index) in brandInfo.productList" :key='index' ><goods-module :item='item'></goods-module></view>
				</scroll-view>
				<!-- 	<view class="pr-30">
					<view class="w100 bg-fff lock-more fs-28 h-80 lh-80 ta-c">
						选购全部商品
					</view>
				</view> -->
			</view>
			<!-- 商品详情 -->
			<view class="list-box h-77 bg-fff mt-14 p-0-30 lh-77 fs-30 fw-b">商品详情</view>
			<view class="bg-fff html-box"><rich-text class="content" :nodes="goodsInfo.detailMobileHtml"></rich-text></view>
			<!-- 底部tabbar -->
			<view class="pt-f bot-0 w100"><goods-tabbar @showPop="showPop"></goods-tabbar></view>
			<!-- 积分说明 -->
			<popup-layer ref="jfpopupRef" :direction="'top'" :autoClose="false">
				<view class="box-pop bg-fff w100 bs-bb p-0-40">
					<view class="dp-f ai-c jc-sb pt-46 pb-20">
						<view class="fs-30 fw-b">积分说明</view>
						<view class="iconfont color-333 clearIcon fs-22 fw-w fw-b" @tap="shwoIntegral(false)">&#xe66b;</view>
					</view>
					<view class="fs-24 color-333 pb-10">-文案文案文案文案文案文案文案文案文案文案文案文案</view>
					<view class="fs-24 color-333 pb-10">-文案文案文案文案文案文案文案文案文案文案文案文案</view>
				</view>
			</popup-layer>
			<!--须知-->
			<popup-layer ref="jfpopupRefs" :direction="'top'" :autoClose="false">
					<view class="box-pop bg-fff w100  bs-bb p-0-40" style="height: 952rpx;">
						<view class="dp-f ai-c jc-sb pt-40 pb-20">
							<view class="fs-36 fw-b">
								购物须知
							</view>
							<view class="iconfont color-333 clearIcon fs-22 fw-w fw-b" @tap="notice(false)">
								&#xe66b;
							</view>
						</view>
						<view class="mt-30">
							<view>
								<view class="fs-30 fw-b c-15">发货时间</view>
								<view class="c-333 fs-24 mt-10">包裹将于付款后的3个工作日内发出，发货后预计2~5个工作日左右配送到您的地址。遇到节假日可能会有延迟，但我们会尽力保证您的包裹安全快速送达。</view>
							</view>
							<view  class="mt-20">
								<view class="fs-30 fw-b c-15">关于快递</view>
								<view class="c-333 fs-24 mt-10">默认发中通快递，若需其他快递，请咨询客服。如需顺丰快递则需补相应的差价，具体请咨询客服；
包裹将于付款后的3个工作日内发出，发货后预计2~5个工作日左右配送到您的地址。遇到节假日可能会有延迟，但我们会尽力保证您的包裹安全快速送达。</view>
							</view>
							<view  class="mt-20">
								<view class="fs-30 fw-b c-15">关于售后</view>
								<view class="c-333 fs-24 mt-10">由于香水产品的特殊性，除质量问题外本网站所售商品均不支持各种主观原因的无理由退换货。请您在签收前务必当面拆开并验货，检查货品是否完好无损、数量正确，确认无误后再签收。</view>
							</view>
							<view class="mt-20">
								<view class="fs-30 fw-b c-15">温馨提示</view>
								<view class="c-333 fs-24 mt-10">因香水是酒精液体只能走汽车运输，物流速度较慢，请您耐心等待哦！在您的寻香之旅中，我们是最贴心的陪伴！</view>
							</view>
						</view>
					</view>
			</popup-layer>
			<!-- 保障详情 -->
			<popup-layer ref="popupRef" :direction="'top'" :autoClose="false">
				<view class="box-pop bg-fff w100 ">
					<view class="pop-text">
						<view class="pop-tit color-15 fs-24 pt-10">正品保障</view>
						<view class="fs-24 color-333 pb-30">是的，本平台所有在售香水分装除品牌原装试管以外均由原装正品香水机械分装而成，保证原液分装。</view>
						<view class="pop-tit color-15 fs-24 pt-10">下单积分</view>
						<view class="fs-24 color-333  pb-30">购买商品会自动获取积分，可以兑换丰厚商品。</view>
						<view class="pop-tit color-15 fs-24 pt-10">包邮条件</view>
						<view class="fs-24 color-333  pb-30">网站全场订单单笔满58元即享受免运费服务（新疆、西藏、甘肃、内蒙古、青海、宁夏以及疫情影响地区暂不发货），详情咨询客服，带来不便敬请谅解。</view>
					</view>
					<view class="ok-btn" @tap="close">确定</view>
				</view>
			</popup-layer>
			<!-- 规格弹窗 -->
			<specification ref="cartPopupRef" :goodsInfo="goodsInfo" @changeSize="changeSize" @purchase='purchase' :activeInfo='activeInfo'></specification>
		</view>
	</view>
</template>

<script>
import goodsModule from '@/components/goodsModule/goodsModule.vue';
import goodsTabbar from '@/components/goodsTabbar/goodsTabbar.vue';
import popupLayer from '@/components/popup/popup-layer.vue';
import specification from '@/components/specification/specification.vue';
import navBar from '@/components/zhouWei-navBar';
import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue';
export default {
	components: {
		goodsModule,
		goodsTabbar,
		popupLayer,
		navBar,
		cusPreviewImg,
		specification
	},
	data() {
		return {
			brandInfo:{},//品牌详情
			swiperImg:[],
			activeInfo: {}, //选中规格
			goodsInfo: {
				minPrice:'',//最新价格
				maxPrice:'',//最大价格
			}, //商品数据
			isLike: false,
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			boolShow: true,
			swiperIndex: 1,
			recommendList: [], //推荐列表
			ImgList: ['https://source.unsplash.com/random', 'https://source.unsplash.com/random', 'https://source.unsplash.com/random'], // 图片列表
			bigList: [], // 图片列表
			ImgListt: [
				'https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/image001.png',
				'https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/shopping_info_b.png',
				'https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/trace.png'
			] // 图片列表
		};
	},
	onLoad(e) {
		this.$refs.loading.open();
		this.$http.getGoodsInfo({ id: e.id }).then(res => {
			this.goodsInfo = res.data.data;
			this.goodsInfo.detailMobileHtml = this.goodsInfo.detailMobileHtml.replace(/\<img/g,'<img style="width:100%;height:auto;display:block"');
			this.goodsInfo.detailMobileHtml = this.goodsInfo.detailMobileHtml.replace(/\<p/g,'<p style="padding:0 10px"');
			this.swiperImg.push(this.goodsInfo.coverImage)
			this.goodsInfo.images.forEach(item=>{
				this.swiperImg.push(item)
			})
			this.isLike = this.goodsInfo.hasLike;
			this.goodsInfo.images.unshift(this.goodsInfo.coverImage)
			this.$http.getBrandRecommend({id:this.goodsInfo.id}).then(res => {
				this.brandInfo = res.data.data
			});
			
			this.$refs.loading.close();
		});
		this.$http.getRecommend({pageIndex:1,pageSize:10,type:5}).then(res => {
			this.recommendList = res.data.data.records;
		});
		
		
	},
	onShow() {},
	watch: {},
	computed: {},
	methods: {
		//立即购买
		purchase(skuId){
			if(!skuId){
				uni.showToast({
					title:'请选择购买规格',
					icon:'none'
				})
				return
			}
			this.$http.purchase({ skuId }).then(res => {
				const orderInfo = res.data.data;
				let parameter = {
					amount:orderInfo.calcAmount,//商品合计
					goodsList:orderInfo.cartPromotionItemList,//商品列表
					address: null,//默认地址
					Available:orderInfo.couponHistoryDetailList,//可用优惠券
					noAvailable:orderInfo.disableCouponList,//不可用优惠券
					cartIds:orderInfo.ids//购物车id
				};
				orderInfo.memberReceiveAddressList.forEach((item, index) => {
					if (item.defaultStatus == 1) {
						parameter.address = item;
					}
				});
				uni.navigateTo({
					url: '/pages/affirmOrder/affirmOrder?data=' + JSON.stringify(parameter)
				});
			})
		},
		// 收藏
		setLike() {
			// this.$refs.loading.open();
			this.$http.setGoodsLike({ productId: this.goodsInfo.id }).then(res => {
				// this.$refs.loading.close();
				this.isLike = !this.isLike;
			});
		},
		changeSize(item) {
			this.activeInfo = item;
		},
		previewImgto(index) {
			this.bigList = this.ImgListt;
			setTimeout(() => {
				this.$refs.cusPreviewImg.open(index); // 传入当前选中的图片地址
			}, 100);
		},
		previewImg(index) {
			// 点击预览图片
			this.bigList = this.ImgList;
			setTimeout(() => {
				this.$refs.cusPreviewImg.open(index); // 传入当前选中的图片地址
			}, 100);
		},
		swiperChange(e) {
			this.swiperIndex = e.detail.current + 1;
		},
		shwoIntegral(type) {
			if (type) {
				this.$refs.jfpopupRef.show(); // 或者 boolShow = rue
				return;
			}
			this.$refs.jfpopupRef.close(); // 或者 boolShow = rue
		},
		showPop() {
			this.$refs.cartPopupRef.showPop(); // 或者 boolShow = rue
		},
		show() {
			this.$refs.popupRef.show(); // 或者 boolShow = rue
		},
		close() {
			this.$refs.popupRef.close(); // 或者 boolShow = false
		},
		notice(type) {
			if (type) {
				this.$refs.jfpopupRefs.show(); // 或者 boolShow = rue
				return
			}
			this.$refs.jfpopupRefs.close(); // 或者 boolShow = rue
		},
		
	}
};
</script>

<style lang="scss">
page {
	background: #f8f8f8;
	padding-bottom: 100px;
}
.content{
	// text-align: center;
	p{
		box-sizing: border-box;
		padding: 0 40rpx;
	}
}
.goods-details {
	.html-box {
		box-sizing: border-box;
		// padding: 30rpx 0;
	}
	.tag-box {
		position: absolute;
		right: 30rpx;
		bottom: 20rpx;
		width: 80rpx;
		height: 30rpx;
		line-height: 30rpx;
		border: 1px solid #a2925c;
		color: #a2925c;
		text-align: center;
		font-size: 22rpx;
	}

	.tit-tag {
		border: 1px solid #222;
	}

	.swiperItem {
		width: 100%;
		height: 750rpx;
		// background: #fff;
	}

	.goods-desc-box {
		background: #fff;
		padding: 0 30rpx;
		padding-bottom: 30rpx;
	}

	.box-bd {
		border-bottom: 1px solid #f1f1f1;
	}

	.user-bb {
		padding: 20rpx 0rpx 30rpx 0rpx;
	}

	/*scroll-view外层*/
	.skill-sequence-panel-content-wrapper {
		white-space: nowrap;
	}

	/*scroll-view本身*/
	.skill-sequence-panel-content {
		min-width: 100%;
	}

	/*scroll-view内层*/
	.skill-sequence-skill-wrapper {
		margin-right: 18rpx;
		display: inline-block;
	}

	.lock-more {
		border: 1px solid #222222;
		margin-top: 60rpx;
	}

	.box-pop {
		height: 630rpx;
		position: relative;

		.pop-text {
			padding: 40rpx 30rpx 0 30rpx;
		}

		.ok-btn {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			background: #222;
			text-align: center;
			font-size: 26rpx;
			color: #ffffff;
		}
	}

	.cart-pop {
		position: relative;
		box-sizing: border-box;

		.goods-size {
			margin-top: 15rpx;
			border: 2rpx solid #e6e6e6;
			text-align: center;
			// margin-right: 30rpx;
			padding: 0 20rpx;
			width: 42%;
		}

		.btn-box {
			position: absolute;
			bottom: -46rpx;
			// height: 100rpx;
			background: #fff;
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			padding-top: 20rpx;
			padding-bottom: 60rpx;
		}

		.clearIcon {
			position: absolute;
			top: 30rpx;
			right: 30rpx;
		}

		.btn-bd {
			border: 2rpx solid #222;
		}

		.btn-bd-0 {
			border: 2rpx solid #222;
		}
	}
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
</style>
