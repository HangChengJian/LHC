<!--常见问题-->
<template>
	<view class="con">
		<view class="w-750 h-100 btss bbss dp-f ai-c jc-sb">
			<view class="ml-30 c-15 fw-b fs-28">订单问题</view>
			<view class="iconfont mr-30">&#xe62b;</view>
		</view>
		<view v-for="(item,i) in xxlist" :key="i">
			<view class="w-750 h-100  bbss dp-f ai-c jc-sb">
				<view class="ml-30 c-15 fw-b fs-28">{{item.name}}</view>
				<view class="iconfont mr-30">&#xe62b;</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xxlist:[
					{
						name:'支付问题'
					},
					{
						name:'物流问题'
					},
					{
						name:'积分问题'
					},
					{
						name:'正品问题'
					},
					{
						name:'评价晒单规则'
					},
					{
						name:'账号管理问题'
					},
					{
						name:'联系客服'
					},
					{
						name:'售后问题'
					}
					
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.btss{
	 border-top: 1px solid #EAEAEA;
}
.bbss{
	 border-bottom: 1px solid #EAEAEA;
}
</style>
