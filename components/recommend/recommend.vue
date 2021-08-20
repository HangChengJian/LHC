<template>
	<view >
		<view class="w-710 h-220 dp-f m-0-a  jc-sb" style="margin-top: 40rpx;" >
			<view class="w-340 h-220 dp-f jc-c ai-c" v-for="(item, i) in data.date.dateArr" :key="i" @click="$outerHref(item.url)">
				<view class="fs-32 c-fff fw-b" style="position: absolute;">{{ item.title }}</view>
				<image :src="item.img" class="w-340 h-220"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['data']
	}
</script>

<style scoped>
	
</style>
