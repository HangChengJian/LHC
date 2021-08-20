import Vue from 'vue'
import App from './App'
//接口集合
import Http from './axios/index.js'
// 绑定到 Vue 的实例上
Vue.prototype.$http = Http

//全局注入w-loading组件
import wLoading from "@/components/w-loading.vue";
Vue.component('w-loading',wLoading)
// 注册节流防抖
import jiuaiDebounce from './common/js/jiuai-debounce.js'
Vue.prototype.$jiuaiDebounce=jiuaiDebounce;
//注入全局函数
import all from './common/js/common.js';
//将全局函数当做插件来进行注册
Vue.use(all);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
