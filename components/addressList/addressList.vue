<template>
	<view class="car-count">
		<view class="cart-box" v-if='carts.length>0 '>
			<view class="touch-item " v-for='(item,index) in carts' :class="item.isTouchMove == true?'touch-move-active':''" :key='item.id'
			 @touchstart="touchstart" @touchmove="touchmove" :data-index='index'  @click.stop="onClick(item)"    style="position: relative;">
				<view class="cartList dp-f clearfix" v-if='item.id'>
					<view class="dp-f ai-c jc-sb w100">
						<view class="f-1">
							<view class="dp-f bs-bb pl-30">
								<view class=" dp-f ai-c">
									<text class="fs-32 c-15 pr-20">{{item.name}}</text>
									<text class="fs-28 color-9">{{item.phoneNumber.slice(0,3)}}****{{item.phoneNumber.slice(7,11)}}</text>
									<view class="bg-222 c-fff fs-22 p-0-12 ml-20" v-if='item.defaultStatus'>
										默认
									</view>
								</view>
							</view>
							<view class="fs-28 c-15 bs-bb pl-30  ov-h t-ohs pt-10">
								{{item.provinceName}}{{item.cityName}}{{item.regionName}}{{item.detailAddress}}
							</view>
						</view>
						<view class="pl-47 pr-30 iconfont color-9 mt-16" @click.stop="goAdd(item)">
							&#xec88;
						</view>
					</view>
					<text class="dleBtn iconfont" @click.stop="deleteList(index,item.id)">&#xe655;</text>
				</view>
			</view>
			<view class="h-200">
				
			</view>
		</view>
		<view class=" h-700 bg-fff" v-else>
			<view class="hint-box dp-f fd-c ai-c">
				<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/xxsx/image/qs2.jpg" mode="widthFix" style="margin-top: 122rpx;"></image>
				<text class="fs-32 c-333 " style="padding: 60rpx 0 80rpx 0;">您还未添加收货地址</text>
				<!-- <view class="w-220 h-80 lh-80 color-fff bg-000 ta-c">
					去逛逛
				</view> -->
			</view>
		</view>
	</view>
</template>
<script>
	import cartSelect from '@/components/cartSelect/cartSelect.vue'
	export default {
		components: {
			cartSelect
		},
		props: {
			carts: { 
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				totalPrice: 0, // 总价，初始为0
				selectAll: false, // 全选状态，默认全选
				startX: 0, //开始坐标
				startY: 0,
				totalNum: 0,
				selectIndex:99
			}
		},
		mounted() {
			this.allSelBtn();
			this.getTotalPrice();
		},
		created() {

		},
		computed: {

		},
		methods: {
			// 点击地址
			onClick(item){
					this.$emit('onClick',item)
			},
			// 修改地址
			goAdd(item){
				uni.navigateTo({
					url:'/pages/addressUpdate/addressUpdate?Data='+JSON.stringify(item)
				})
			},
			showSelect(index){
				if(index == this.selectIndex) return
					this.selectIndex = index
			},
			onknow(){
				this.$emit('show')
			},
			jiesuan: function() {
				var that = this;
				var idArr = [];
				var carId = that.carts;
				for (var i = 0; i < carId.length; i++) {
					if (carId[i].selected == true) {
						idArr.push(carId[i].id);
					}
				}

				if (idArr.length <= 0) {
					uni.showToast({
						title: '请选择要结算的商品',
						icon: 'none'
					})
					return false;
				}
				var ids = idArr.toString(',');
				this.$emit('jsBtn', ids);
			},
			/**
			 * 修改商品数量
			 */
			changeNum: function(index, id, type) {
				var that = this;
				var carts = that.carts;
				var number = parseInt(carts[index].number);
				if (type == 0) {
					number = number - 1;
					if (number <= 1) {
						number = 1;
					}
				} else {
					number = number + 1;
				}
				carts[index].number = number;
				this.$emit('changeNum', carts);
			},
			/**
			 * 删除购物车当前商品
			 */
			deleteList(index, ids) {
				var that = this;
				let carts = that.carts;
				this.$emit('delBtn', carts, ids, index)
			},
			/**
			 * 当前商品选中事件
			 */
			selectList: function(index) {
				var leng = 0;
				var that = this;
				var carts = that.carts;
				var selected = carts[index].selected;
				carts[index].selected = !selected;

				for (var i = 0; i < carts.length; i++) {
					if (carts[i].selected == false) {
						that.selectAll = false;
					}
					if (carts[i].selected == true) {
						leng = leng + 1;
					}
				}
				if (leng == carts.length) {
					that.selectAll = true;
				}
				this.$emit('selThis', carts);
			},
			allSelBtn: function(e) {
				var that = this;
				var selectAll = that.selectAll;
				selectAll = !selectAll;
				var carts = that.carts;

				for (var i = 0; i < carts.length; i++) {
					carts[i].selected = selectAll;
				}
				that.selectAll = selectAll;
				this.$emit('selAllBtn', carts);
			},
			/**
			 * 计算总价
			 */
			getTotalPrice: function() {
				var that = this;
				var carts = that.carts; // 获取购物车列表
				var total = 0;
				var totalnum = 0;
				for (var i = 0; i < carts.length; i++) { // 循环列表得到每个数据
					if (carts[i].selected) { // 判断选中才会计算价格
						total += carts[i].number * carts[i].price; // 所有价格加起来
						totalnum = totalnum + parseInt(carts[i].number);
					}
				}
				that.totalNum = totalnum;
				that.totalPrice = total.toFixed(2);
			},
			touchstart: function(e) {
				var that = this;
				var carts = that.carts;
				//重置规格下拉
				this.selectIndex = 999
				//开始触摸时 重置所有删除
				carts.forEach(function(v, i) {
					0
					if (v.isTouchMove) //只操作为true的
						v.isTouchMove = false;
				});
				that.startX = e.changedTouches[0].clientX;
				that.startY = e.changedTouches[0].clientY;
				this.$emit('touchEv', carts);
			},
			//滑动事件处理
			touchmove: function(e) {
				var that = this;
				var carts = that.carts;
				var index = e.currentTarget.dataset.index, //当前索引
					startX = that.startX, //开始X坐标
					startY = that.startY, //开始Y坐标
					touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
					touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
					//获取滑动角度
					angle = that.angle({
						X: startX,
						Y: startY
					}, {
						X: touchMoveX,
						Y: touchMoveY
					});
				carts.forEach(function(v, i) {
					v.isTouchMove = false
					//滑动超过30度角 return
					if (Math.abs(angle) > 30) return;
					if (i == index) {
						if (touchMoveX > startX) //右滑
							v.isTouchMove = false
						else //左滑
							v.isTouchMove = true
					}
				})
				//更新数据
				this.$emit('touchEv', carts);
			},
			angle: function(start, end) {
				var _X = end.X - start.X,
					_Y = end.Y - start.Y
				//返回角度 /Math.atan()返回数字的反正切值
				return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-cover-box{
		margin-left:30rpx ;
	}
	
	.activer {
		border: 1px solid #222;
		position: relative;
	}

	.acitve-gs {
		/* transform: scale(.8); */
		color: #FFFFFF;
		position: absolute;
		width: 34rpx;
		height: 34rpx;
		top: -2rpx;
		left: 0rpx;
	}

	/*有商品时*/
	.car-count {
		width: 100%;
		background-color: #fff;
	}

	.cart-box {
		width: 100%;
	}

	.cartList {
		height: 212rpx;
		width: 100%;
		font-size: 26rpx;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
		-webkit-transform: translateX(132rpx);
		transform: translateX(132rpx);
		margin-left: -132rpx;
		background: #fff;
		z-index: 1;
		border-bottom: 1px solid #EAEAEA;
	}

	.boxCount {
		float: left;
	}

	.boxCount .gname {
		font-size: 32rpx;
		color: #333333;
	}

	.boxCount .gtitle {
		margin: 5rpx 0 15rpx 0;
		font-size: 24rpx;
		color: #999999;
	}

	.gprice {
		color: #e60012;
		font-size: 34rpx;
	}

	.gprice text {
		font-size: 24rpx;
	}

	.cartList .selBtn {
		width: 50rpx;
		position: relative;
		left: 30rpx;
		top: 129rpx;
	}

	.cartList .selBtn image {
		width: 32rpx;
		height: 32rpx;
	}

	.cartList .cartImg {
		width: 260rpx;
		height: 212rpx;
		background: #fff;
		border-radius: 5rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.countBox {
		/* position: absolute;
		right: 140rpx;
		bottom: 25rpx;
		right: 10rpx;
		bottom: 20rpx; */
		border: 1px solid #E7E7E7;
	}



	.cartNum {
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 24rpx;
		color: #151515;
		border-left: 1px solid #E7E7E7;
		border-right: 1px solid #E7E7E7;
	}

	.dleBtn {
		position: absolute;
		right: 0;
		top: 0;
		width: 134rpx;
		height: 100%;
		line-height: 212rpx;
		text-align: center;
		background: #D2D2D2;
		color: #ffffff;
		font-size: 40rpx;
		z-index: 9999;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
		-webkit-transform: translateX(148rpx);
		transform: translateX(148rpx);
		border-bottom: 1px solid #EAEAEA;
	}

	.touch-move-active .cartList,
	.touch-move-active .dleBtn {
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}

	.touch-move-active .dleBtn {
		right: -134rpx;
	}

	.dleBtn-to {
		position: absolute;
		right: -134rpx;
		top: 0;
		width: 134rpx;
		height: 100%;
		line-height: 212rpx;
		text-align: center;
		background: #000;
		color: #ffffff;
		font-size: 30rpx;
		z-index: 9999;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
		-webkit-transform: translateX(128rpx);
		transform: translateX(128rpx);
	}

	.touch-move-active .dleBtn-to {
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}

	.touch-move-active .dleBtn-to {
		right: -266rpx;
	}

	.botomBtn {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		/* box-shadow: #f3f3f3 0rpx -5rpx 10rpx; */
		box-sizing: border-box;
		height: 130rpx;
		padding: 0 30rpx 0 30rpx;
		z-index: 99;
		display: flex;
		align-items: center;
	}

	.botomBtn .price {
		float: right;
		line-height: 98rpx;
		font-size: 28rpx;
		color: #333333;
	}

	.botomBtn .price text {
		font-size: 24rpx;
		color: #e60012;
	}

	.botomBtn .price .num {
		font-size: 30rpx;
		font-weight: bold;
	}

	.botomBtn .yyBtn {
		width: 180rpx;
		height: 86rpx;
		font-size: 28rpx;
		background: #222;
		color: #FFFFFF;
		text-align: center;
		line-height: 86rpx;
		font-weight: 600;
	}

	.botomBtn .selBtn {
		position: absolute;
		height: 100%;
		float: left;
	}

	.botomBtn .selBtn image {
		width: 32rpx;
		height: 32rpx;
		margin: 0 10rpx;
	}
</style>
