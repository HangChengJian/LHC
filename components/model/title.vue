<template>
  <div>
    <div v-if="date.more" class="right" @click="$outerHref(date.url,true)">
      查看更多
			<text class="iconfont fs-22 color-000">&#xe601;</text>
    </div>
    <div class="left" @tap='console'>
      {{ date.title }} <span>{{ date.titleCenter }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  components: {},
  props: {
    date: {
      type: Object,
      default() {
        return {}
      }
    }
  },
	 methods: {
		 console(){
			 console.log(this.date)
		 }
	 }
}
</script>
<style lang="scss" scoped>
.left {
  font-size: 38rpx;
  font-weight: bold;
  span {
    color: #585858;
       font-size: 24rpx;
    font-weight: 400;
  }
}
.right {
  color: #585858;
  font-size: 24rpx;
  float: right;
  line-height: 20pt;
}
</style>
