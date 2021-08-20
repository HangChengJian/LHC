<template>
	<view class="content" v-show="advertisingShow" @touchmove.stop.prevent="moveHandle">
		<view class="img" @tap.stop>
			<image
				@tap="toHyperlink"
				:style="'width: ' + (advertising.width ? advertising.width : 200) + 'px; height: ' + (advertising.height ? advertising.height : 200) + 'px;'"
				mode="scaleToFill"
				:src="advertising.imageUrl"
			></image>
			<image src="https://cdn.beautinow.com/images/icon/big_clear.png" @tap="$emit('close')" class="clear-icon" />
		</view>
	</view>
</template>

<script>
export default {
	props: {
		advertising: {
			//图片路径
			type: Object,
			default: null
		},
		advertisingShow: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			moveHandle() {}, //静止遮罩底层滑动
			src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
		};
	},
	methods: {
		// close(){
		// 	this.$emit("close");
		// }
		toHyperlink() {
			if (uni.getStorageSync('Token')) {
				uni.navigateTo({
					url: this.advertising.hyperlink,
					success: () => {}
				});
				this.$emit('close')
			} else {
				uni.navigateTo({
					url: '/pages/wxlogin/wxlogin'
				});
			}
		}
	}
};
</script>

<style scoped>
.content {
	height: 100vh;
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 500;
}
.img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.but {
	margin: 10px auto;
	text-align: center;
	color: #fff;
	border: 1px solid #fff;
	width: 30px;
	height: 30px;
	line-height: 30px;
	font-size: 20px;
	border-radius: 50%;
}
.clear-icon {
	width: 30px;
	height: 30px;
	margin: 0 auto;
	margin-top: 40rpx;
	display: block;
}
</style>
