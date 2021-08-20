<template>
  <div>
		<image :src="date.img" mode='scaleToFill' style="width:100% ;"  @click="$outerHref(date.url,true)"/>
  </div>
</template>

<script>
export default {
  name: 'BigPicture',
  components: {},
  props: {
    date: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
