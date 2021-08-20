<template>
	<view class="previewImg" v-if="showBox" @touchmove.stop.prevent>
		<view class="mask" @click="close">
			<swiper @change="changeSwiper" class="mask-swiper" :current="currentIndex" :circular="circular" :duration="duration">
				<swiper-item v-for="(src, i) in imgList" :key="i"> 
					<image class="mask-swiper-img" :src="src" mode="aspectFit" />
				</swiper-item> 
			</swiper>
			<!-- <image class="mask-swiper-img" :src="src" mode="aspectFit" v-for="(src, i) in list" :key="i"/> -->
		</view>
		<view class="pagebox" v-if="imgList.length>0">{{ Number(currentIndex) + 1 }} / {{ imgList.length }}</view>
	</view>
</template>

<script>
	export default {
		name: 'cus-previewImg',
		props: {
			list: {
				type: Array,
				required: true,
				default: () => {
					return [];
				}
			},
			circular: {
				type: Boolean,
				default: true
			},
			duration: {
				type: Number,
				default: 200
			}
		},
		data() {
			return {
				currentIndex: 0,
				showBox: false,
				imgList:[]
			};
		},
		watch: {
			list(val) {
				this.imgList = val
				this.showBox = false;
			}
		},
		methods: {
			// 左右切换
			changeSwiper(e) {
				this.currentIndex = e.target.current;
			},
			open(current) {
				if (!this.imgList.length) return;
				// this.currentIndex = this.imgList.indexOf(current)
				this.currentIndex = current
				this.showBox = true;
			},
			close() {
				this.showBox = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
@mixin full {
	width: 100%;
	height: 100%;
}

.previewImg {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	@include full;
	.mask {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000;
		z-index: 5;
		@include full;
		&-swiper {
			@include full;
			&-img {
				@include full;
			}
		}
	}
	.pagebox{
		position: absolute;
		width: 100%;
		bottom: 20rpx;
		z-index: 6;
		color: #fff;
		text-align: center;
	}
}
</style>
