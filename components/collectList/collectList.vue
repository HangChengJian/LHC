<template>
	<view class="car-count">
		<view class="cart-box" v-if="carts.length > 0">
			<view
				class="touch-item mt-20"
				v-for="(item, index) in carts"
				:class="item.isTouchMove == true ? 'touch-move-active' : ''"
				:key="item.id"
				@touchstart="touchstart"
				@touchmove="touchmove"
				@click.stop="onLock(item.id)"
				:data-index="index"
				style="position: relative;"
			>
				<view class="cartList clearfix">
					<view class="dp-f">
						<view class="goods-cover-box">
							<view class="cartImg "><image :src="item.coverImage" mode="aspectFit" class="w100 h100"></image></view>
						</view>
						<view style="min-width: 426rpx;" class="bs-bb pr-10">
							<view class="fs-28 fw-b t-ohs c-15 pt-30" style="height: 80rpx;">{{ item.name }}</view>
							<view class="mt-16 "><view class="ta-c bd-15 color-a29 il-box p-0-32 bd-a2 fs-24 ">标签</view></view>
							<view class="dp-f ai-c jc-sb pt-22">
								<view class="fs-32 fw-b  c-15">￥{{ item.price }}</view>
								<view class="iconfont pr-18">&#xe696;</view>
							</view>
						</view>
					</view>
					<text class="dleBtn" @click.stop="deleteList(index, item.id)">删除</text>
				</view>
			</view>
		</view>
		<view class=" h-700 bg-fff" v-if="carts.length == 0 && isLoading" >
			<view class="hint-box dp-f fd-c ai-c">
				<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/xxsx/image/qs4.jpg" mode="widthFix" style="margin-top: 122rpx;"></image>
				<text class="fs-32 c-333 " style="padding: 60rpx 0 80rpx 0;">您未有收藏商品</text>
				<view class="w-220 h-80 lh-80 color-fff bg-000 ta-c" @click="goHome">去逛逛</view>
			</view>
		</view>
	</view>
</template>
<script>
import cartSelect from '@/components/cartSelect/cartSelect.vue';
export default {
	components: {
		cartSelect
	},
	props: {
		carts: {
			//列表
			type: Array,
			default() {
				return [];
			}
		},
		isLoading: {
			//数据是否加载完成
			type: Boolean,
			default:false
		},
	},
	data() {
		return {
			totalPrice: 0, // 总价，初始为0
			selectAll: false, // 全选状态，默认全选
			startX: 0, //开始坐标
			startY: 0,
			totalNum: 0,
			selectIndex: 99
		};
	},
	mounted() {
		this.allSelBtn();
		this.getTotalPrice();
	},
	created() {},
	computed: {},
	methods: {
		goHome(){
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		onLock(id){
				uni.navigateTo({
					url:'/pages/goodsDetails/goodsDetails?id='+id
				})
		},
		showSelect(index) {
			if (index == this.selectIndex) return;
			this.selectIndex = index;
		},
		onknow() {
			this.$emit('show');
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
				});
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
			this.$emit('delBtn', carts, ids, index);
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
			for (var i = 0; i < carts.length; i++) {
				// 循环列表得到每个数据
				if (carts[i].selected) {
					// 判断选中才会计算价格
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
			this.selectIndex = 999;
			//开始触摸时 重置所有删除
			carts.forEach(function(v, i) {
				0;
				if (v.isTouchMove)
					//只操作为true的
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
				angle = that.angle(
					{
						X: startX,
						Y: startY
					},
					{
						X: touchMoveX,
						Y: touchMoveY
					}
				);
			carts.forEach(function(v, i) {
				v.isTouchMove = false;
				//滑动超过30度角 return
				if (Math.abs(angle) > 30) return;
				if (i == index) {
					if (touchMoveX > startX)
						//右滑
						v.isTouchMove = false;
					//左滑
					else v.isTouchMove = true;
				}
			});
			//更新数据
			this.$emit('touchEv', carts);
		},
		angle: function(start, end) {
			var _X = end.X - start.X,
				_Y = end.Y - start.Y;
			//返回角度 /Math.atan()返回数字的反正切值
			return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-cover-box {
	margin-left: 30rpx;
}

.activer {
	border: 1px solid #222;
	position: relative;
}

.acitve-gs {
	/* transform: scale(.8); */
	color: #ffffff;
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
	height: 260rpx;
	width: 100%;
	font-size: 26rpx;
	-webkit-transition: all 0.3s;
	transition: all 0.3s;
	-webkit-transform: translateX(132rpx);
	transform: translateX(132rpx);
	margin-left: -132rpx;
	background: #fff;
	z-index: 1;
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
	height: 260rpx;
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
	border: 1px solid #e7e7e7;
}

.cartNum {
	height: 50rpx;
	text-align: center;
	line-height: 50rpx;
	font-size: 24rpx;
	color: #151515;
	border-left: 1px solid #e7e7e7;
	border-right: 1px solid #e7e7e7;
}

.dleBtn {
	position: absolute;
	right: 0;
	top: 0;
	width: 134rpx;
	height: 100%;
	line-height: 260rpx;
	text-align: center;
	background: #222;
	color: #ffffff;
	font-size: 30rpx;
	z-index: 9999;
	-webkit-transition: all 0.3s;
	transition: all 0.3s;
	-webkit-transform: translateX(148rpx);
	transform: translateX(148rpx);
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
	line-height: 260rpx;
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
	background: #ffffff;
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
	color: #ffffff;
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
