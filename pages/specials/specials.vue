<!--首页 香水专题页-->
<template>
	<view>
		<view v-for="(item,index) in list" :key='index' class="mt-40">
			<specialitem :data='item'></specialitem>
		</view>
	</view>
</template>

<script>
	import specialitem from '@/components/specialitem/specialitem.vue'
	export default {
		components: {
			specialitem
		},
		onLoad() {
			this.$http.getSubjectList().then((res)=>{
				console.log(res.data.data)
				this.list = res.data.data
			})
		},
		data() {
			return {
				list:[]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
page{
	background: #F8F8F8;
}
</style>
