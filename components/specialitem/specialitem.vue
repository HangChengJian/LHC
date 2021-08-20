<template>
	<view>
		<view class="w-690 m-0-a bg-fff mb-30">
			<!--专题列表-->
			<view class="w-690 h-420 m-0-a">
				<image :src="data.coverImage" class="w-690 h-420 m-0-a"></image>
			</view>
			<view class="mt-20 w-608 fw-b fs-32 ml-30">{{data.title}}</view>
			<view class="mt-20 w-624 h-73 fs-24 c-666 t-ohs ml-30">{{data.subtitle}}</view>
			<!-- <view class="dp-f  ml-30 mt-20" >
				<view class="dp-f ">
					<image src="../../static/icon/like.png" class="w-30 h-28"></image>
					<view class="fs-22 c-666 ml-4" >999</view>
				</view>
				<view class="dp-f ml-30">
					<image src="../../static/icon/evaluate.png" class="w-30 h-28"></image>
					<view class="fs-22 c-666 ml-4" >999</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		props:['data'],
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
