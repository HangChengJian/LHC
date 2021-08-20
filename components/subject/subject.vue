<template>
	<view class="w100" style="margin-top: 60rpx;">
		<view class=" h-52 dp-f jc-sb ai-c  p-0-30 bs-bb">
			<view class="fs-38 fw-b" style="color: #151515;">本期专题</view>
			<view class=" dp-f  ai-c" @click="$outerHref('/pages/specials/specials',true)">
				<view class="fs-24 dp-f ai-c color-15">查看更多</view>
				<text class="iconfont fs-22 color-000">&#xe601;</text>
			</view>
			<!-- <image src="../../static/icon/load.png" class="w-8 h-12" style="margin-left: 10rpx;"> -->
		</view>
		<topicelist :setsplist="data.date.dateArr"></topicelist>
	</view>
</template>

<script>
import topicelist from '@/components/topicelist/topicelist.vue';
export default {
	props: ['data'],
	components: {
		topicelist
	},
	data() {
		return {};
	}
};
</script>

<style></style>
