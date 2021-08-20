<template>
	<view class="">
		<view class="mt-30 w100 h-520  ">
			<swiper class="swiper h-520 w100" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500" :circular="true" >
				<swiper-item v-for="(item,index) in data.date.dateArr" :key='index' @click="$outerHref(item.url,false)">
					<image :src="item.img" class="w100 h-520"></image>
				</swiper-item>
				
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props:['data'],
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad(){},
		onShow() {},
		watch:{},
		computed:{},
		methods:{},
	}
</script>

<style lang="scss" scoped>
	
</style>
