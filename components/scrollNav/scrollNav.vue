<template>
	<view class="ov-h">
		<view class="mt-30 dp-f ml-40 h-140 w100 ">
			<scroll-view :scroll-x="true" show-scrollbar="false">
				<view class="dp-f">
					<view class="dp-f" v-for="(item, index) in data.date.dateArr" :key="index" @click="$outerHref(item.url,false)">
						<view class="w-100 dp-f jc-c ai-c ficat" style="margin-right: 66rpx;">
							<view class="w-68 h-68"><image :src="item.img" class="w-68 h-68"></image></view>
							<view class="fs-24 fw-b mt-14 color-15">{{ item.text }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['data']
	}
</script>

<style>
</style>
