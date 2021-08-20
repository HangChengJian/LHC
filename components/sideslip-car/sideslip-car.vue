<template>
	<view class="car-count" @click="selectIndex = 999">
		<view class="cart-box" v-if="cartList.length > 0">
			<view
				class="touch-item"
				v-for="(item, index) in cartList"
				:class="item.isTouchMove == true ? 'touch-move-active' : ''"
				:key="index"
				@touchstart="touchstart"
				@touchmove="touchmove"
				:data-index="index"
				style="position: relative;"
			>
				<!-- 规格列表 -->
				<view v-if='item.isPackage'>
					<view class="select-list" v-show="index == selectIndex">
						<view class="list t-oh" >{{ item.packageSkuInfo.otherName }}</view>
					</view>
				</view>
				<view >
					<view class="select-list" v-show="index == selectIndex">
						<view  class="list t-oh" v-for="(items, i) in item.skuList" :key='i' @click="onSize(items,index,item)">{{ item.activityCarIds.length==0?items.name :items.productName }}</view>
					</view>
				</view>
				<view class="cartList clearfix">
					<view @click="selectList(index)" class="selBtn">
						<view class="w-34 h-34 activer " :class="{ 'bg-000': item.selected }">
							<image v-show="item.selected" src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/images/newPage/gou.png" mode="" class="acitve-gs"></image>
						</view>
					</view>
					<view class="dp-f">
						<view class="goods-cover-box" style="margin-left: 84rpx;">
							<view class="cartImg "  @click.stop="lockGoods(item.productId,item)"><image :src="item.productPic" mode="aspectFit" class="w100 h100"></image></view>
						</view>
						<view style="min-width: 426rpx;">
							<view class="fs-26 fw-b t-ohs">{{ item.productName }}</view>
							<!-- <view class="fs-28 t-oh color-333 bs-bb pr-10">副标题</view> -->
							<!-- 规格显示 -->
							<view class="mt-8" style=""><cart-select @showSelect="showSelect(index)" :sku="item.sku" :data='item'></cart-select></view>
							<view class="fs-22 color-a29 pt-10 h-20">{{ item.promotionName }}</view>
							<view class="dp-f jc-sb ai-fe">
								<view class="fs-30 fw-b pt-13">￥{{ item.price }}</view>
								<view class="countBox centerboth mr-30" v-if='item.activityCarIds.length==0'>
									<view class="carSub w-60 dp-fc" @click="changeNum(index, item.id, 0)"><text class="iconfont fs-24">&#xe60b;</text></view>
									<!-- <view class="cartNum w-60">{{item.number}}</view> -->
									<input
										type="number"
										class="cartNum"
										maxlength="2"
										confirm-type="确定"
										:auto-blur="true"
										@focus="inputFocus(index)"
										@blur="inputBlur"
										v-model="item.quantity"
									/>
									<view class="carAdd w-60  dp-fc" @click="changeNum(index, item.id, 1)"><text class="iconfont fs-24">&#xe624;</text></view>
								</view>
							</view>
						</view>
					</view>

					<!-- 	<view class="gmes">
						<view class='cartImg centerboth'>
							<image src="../../static/test/737052294636.png" mode="aspectFit"></image>
						</view>
						<view class="boxCount clearfix">
							<text class="gname line1">{{item.name}}</text>
							<view class="gtitle line1">{{item.spec_key_name}}</view>
							<view class="gprice"><text>￥</text>{{item.price}}</view>
						</view>
					</view> -->
					<!-- <view class="countBox centerboth">
						<view class="carSub" @click="changeNum(index,item.id,0)">
							<text class="iconfont car-sub"></text>
						</view>
						<view class="cartNum">{{item.number}}</view>
						<view class="carAdd" @click="changeNum(index,item.id,1)">
							<text class="iconfont car-add"></text>
						</view>
					</view> -->
					<view class="dleBtn dp-fc" @click="setLike(index, item)">
						<view class="">
							<view class="fs-28 color-fff">移入</view>
							<view class="fs-28 color-fff">收藏</view>
						</view>
					</view>
					<text class="dleBtn-to" @click="deleteList(index, item)">删除</text>
				</view>
			</view>
		</view>
		<view class=" h-700 bg-fff" v-else>
			<view class="hint-box dp-f fd-c ai-c">
				<image src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/xxsx/image/qs3.jpg" mode="widthFix" ></image>
				<text class="fs-32 c-333 " style="padding: 60rpx 0 80rpx 0;">您的购物车还没有添加商品</text>
				<view class="w-220 h-80 lh-80 color-fff bg-000 ta-c" @click="$goHome">去逛逛</view>
			</view>
		</view>
		<view class="botomBtn jc-sb">
			<view @click="allSelBtn" class="dp-f ">
				<view class="w-34 h-34 activer " :class="{ 'bg-000': selectAll }">
					<image v-show="selectAll" src="https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/images/newPage/gou.png" mode="" class="acitve-gs"></image>
				</view>
				<text class="fs-22 ml-14">全选</text>
			</view>
			<view class="dp-f ai-c">
				<!-- <view class="price">合计：<text class="fh">￥</text><text class="num">{{totalPrice}}</text></view> -->
				<view class="mr-17 h-86 ta-r">
					<xwCountup :num="totalPrice" color="#151515" width="14" height="16" fontSize="19"></xwCountup>
					<view class="lh-20" @click="onknow">
						<text class="fs-20 color-9f">优惠价，不含运费</text>
						<text class="fs-20 color-9f iconfont ">&#xe62a;</text>
					</view>
				</view>

				<view @click="jiesuan" class="yyBtn">
					去结算
					<!-- ({{totalNum}}) -->
				</view>
			</view>
		</view>
		<!-- 删除 -->
		<!-- <shade v-show='shwoPop'>
			<view class="w-580 h-282 bg-fff br-6 ov-h">
				<view class="h-200 lh-200 ta-c fs-32 color-9">
					确认要删除该地址吗？
				</view>
				<view class="h-800 bt-ed dp-f">
					<view class="f-1 ta-c lh-80 c-15 fw-b fs-32" @click="shwoPop = false">
						我再想想
					</view>
					<view class="f-1 ta-c lh-80 c-15 fw-b bl-ed fs-32" @click="delBtn">
						确定
					</view>
				</view>
			</view>
		</shade> -->
	</view>
</template>
<script>
import cartSelect from '@/components/cartSelect/cartSelect.vue';
import xwCountup from '@/components/xw-countup/index.vue';
import shade from '@/components/shadeBox/shade.vue';
export default {
	components: {
		cartSelect,
		xwCountup,
		shade
	},
	props: {
		carts: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	watch: {
		carts(newVal, oldVal) {
			this.cartList = newVal;
		}
	},
	data() {
		return {
			cartList: [],
			shwoPop: false, //删除弹窗
			totalPrice: 0, // 总价，初始为0
			selectAll: false, // 全选状态，默认全选
			startX: 0, //开始坐标
			startY: 0,
			totalNum: 0,
			selectIndex: 99,
			inputIndex: 99, //点前输入数量商品下标
			loop: 0
		};
	},
	mounted() {
		// this.allSelBtn();
		this.getTotalPrice();
	},
	computed: {},
	methods: {
		// 查看商品
		
		lockGoods(id,item){
			if(item.activityCode){
				uni.navigateTo({
					url:'/pages/newdiscount/newdiscount?code='+item.activityCode
				})
				return
			}
			this.$http.getGoodsInfo({ id: id}).then(res => {
				if(res.data.code==200){
					uni.navigateTo({
						url:'/pages/goodsDetails/goodsDetails?id='+id
					})
				}else{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
			})
			
		},
		initCart(){
			this.selectIndex = 999
		},
		// 重置选择商品
		initSelect(){
			this.selectAll = false
			this.totalPrice = 0.00
		},
		// 选择规格
		onSize(item,index,items){
			if(items.activityCarIds.length==0){
				const option ={
				  "id": this.carts[index].id,//购物车id
				  "productId": this.carts[index].productId,//商品id
				  "productSkuId": item.id,//规格id
				  "quantity": this.carts[index].quantity,//数量
				}
				if(items.sku.id == option.productSkuId) return
				this.$http.setAttr(option).then(res=>{
					console.log(res.data.code)
					if(res.data.code == 200){
						this.$emit('changeSize',item,index)
						this.selectIndex = 999;
					}
				})
			}
			
		},
		inputBlur(e) {
			var that = this;
			var carts = that.carts;
			let option = {
				id:carts[this.inputIndex].id,
				quantity:1
			}
			if (e.detail.value !== '0' && e.detail.value) {
				carts[this.inputIndex].quantity = e.detail.value;
				option.quantity = e.detail.value
			} else {
				this.$set(carts[this.inputIndex], 'quantity', 0);
				this.changeNum(this.inputIndex, '', 1);
			}
			this.$http.setQuantity(option).then(res=>{
				this.$emit('changeNum', carts);
			})
		},
		inputFocus(index) {
			console.log(index);
			this.inputIndex = index;
		},
		showSelect(index) {
			if (this.selectIndex == index) {
				this.selectIndex = 999;
			} else {
				this.selectIndex = index;
			}
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
					if(carId[i].id==''){
						// idArr=idArr.concat(carId[i].activityCarIds);
						idArr.push(...carId[i].activityCarIds);
					}else{
						idArr.push(carId[i].id);
					}
					
				}
			}

			if (idArr.length <= 0) {
				uni.showToast({
					title: '请选择要结算的商品',
					icon: 'none'
				});
				return false;
			}
			// var ids = idArr.toString(',');
			this.$emit('jsBtn', idArr);
			
		},
		/**
		 * 修改商品数量
		 */
		changeNum: function(index, id, type) {
			var that = this;
			var carts = that.carts;
			var number = parseInt(carts[index].quantity);
			if (type == 0) {
				number = number - 1;
				if (number <= 1) {
					number = 1;
				}
			} else {
				number = number + 1;
			}
			
			const option = {
				id:this.carts[index].id,
				quantity:number
			}
			//一定时间内禁止重复调用模式
			this.$jiuaiDebounce.canDoFunction({
				key: 'click', //基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
				// time: 1000, //如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
				success: () => {
					//成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
					this.$http.setQuantity(option).then(res=>{
						this.$jiuaiDebounce.releaseKey("click")
						if(res.data.code == 400) return
						carts[index].quantity = number;
						this.$emit('changeNum', carts);
					})
				}
			});
		},
		/**
		 * 收藏购物车当前商品
		 */
		setLike(index, item) {
			if(item.activityCarIds.length > 0){
				uni.showToast({
					title:'无法收藏活动商品',
					icon:'none'
				})
			}else{
				this.$http.setGoodsLike({ productId: item.productId ,isLike:true}).then(res => {
					uni.showToast({
						title:'收藏成功',
						icon:'none'
					})
				});
			}
		},
		/**
		 * 删除购物车当前商品
		 */
		deleteList(index, item) {
			var that = this;
			let carts = that.carts;
			if(item.activityCarIds.length > 0){
				this.$emit('delBtn', carts, item.activityCarIds, index);
			}else{
				this.$emit('delBtn', carts, item.id, index);
			}
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
			
			if(carts.length == 0){
				uni.showToast({
					title:'购物车未有商品',
					icon:'none'
				})
				return
			}
			
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
			var selectNum = 0
			for (var i = 0; i < carts.length; i++) {
				// 循环列表得到每个数据
				if (carts[i].selected) {
					selectNum++
					// 判断选中才会计算价格
					total += carts[i].quantity * carts[i].price; // 所有价格加起来

					totalnum = totalnum + parseInt(carts[i].quantity); //所有商品数量
				}
			}
			if(carts.length == selectNum && selectNum !==0){
				that.selectAll = true
			}
			// console.log(selectNum)
			that.totalNum = totalnum;
			that.totalPrice = total.toFixed(2);
			
		},
		touchstart: function(e) {
			var that = this;
			var carts = that.carts;
			//重置规格下拉

			//开始触摸时 重置所有删除
			carts.forEach(function(v, i) {
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
					if (touchMoveX > startX) {
						//右滑
						v.isTouchMove = false;
					} else {
						//左滑
						v.isTouchMove = true;
						that.selectIndex = 999;
					}
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
.cartNum {
	width: 60rpx;
	border-left: 1px solid #e7e7e7;
	border-right: 1px solid #e7e7e7;
}
.yy {
	width: 100rpx;
	height: 200rpx;
	position: absolute;
	background-color: #007aff;
	z-index: 999;
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
	// overflow: hidden;
}

.cart-box {
	width: 100%;
}

.cartList {
	height: 310rpx;
	width: 100%;
	font-size: 26rpx;
	-webkit-transition: all 0.3s;
	transition: all 0.3s;
	-webkit-transform: translateX(264rpx);
	transform: translateX(264rpx);
	margin-left: -264rpx;
	background: #fff;
	margin-bottom: 14rpx;
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
	width: 220rpx;
	height: 220rpx;
	background: #f5f5f5;
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
	height: 310rpx;
	// line-height: 310rpx;
	text-align: center;
	background: #bfbfbf;
	color: #ffffff;
	// font-size: 30rpx;
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
	line-height: 310rpx;
	text-align: center;
	background: #000;
	color: #ffffff;
	font-size: 28rpx;
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

.select-list {
	position: absolute;
	top: 120rpx;
	left: 324rpx;
	border: 1px solid #e7e7e7;
	// width: 100rpx;
	overflow: hidden;
	z-index: 999;
	background: #fff;
	box-sizing: border-box;
	transform: translateZ(999);

	.list {
		box-sizing: border-box;
		height: 45rpx;
		line-height: 45rpx;
		padding: 0 10rpx;
		border-bottom: 1px solid #e7e7e7;
		font-size: 24rpx;
		transform: translateZ(999);
		z-index: 999;
		min-width: 90rpx;
		max-width: 400rpx;
	}
}
</style>
