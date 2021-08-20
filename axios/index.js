import https from './interface'
import * as main from "./user.js"
import * as login from "./login.js"
import * as goods from "./goodsDetails.js"
import * as order from "./order.js"
import * as subject from "./subject.js"

/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * handle [boolean] 如果需要自己处理 catch 请求 ，传入 true ，交给接口统一处理 ，请传如 false或不传
 */

// 单独导出
// 首页banner
export const banner = (data) => {
	// console.log('data',data)
	return https({
		url: '/banner/index',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 首页活动
export const activities = (data) => {
	// console.log('data',data)
	return https({
		url: '/home/activities',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 快捷入口
export const menus = (data) => {
	// console.log('data',data)
	return https({
		url: '/home/menus',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 专题
export const special = (data) => {
	// console.log('data',data)
	return https({
		url: '/home/special',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 首页热门tab
// export const getIndexHot = (data) => {
// 	return https({
// 		url: '/product/hottestPageList',
// 		method: 'GET', // 默认POST
// 		data,
// 		// handle:true
// 	})
// }
// 首页新品tab
export const getIndxNewProduct = (data) => {
	return https({
		url: '/product/latestPageList',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 首页合辑tab
export const getIndxCollection = (data) => {
	return https({
		url: '/product/collection',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 分类品牌tab
export const getClassifyBrand = (data) => {
	return https({
		url: '/brand/queryBrandCategoryAndBrandList',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 品牌详情tab
export const getClassifyDet = (data) => {
	return https({
		url: '/brand/detail/' + data,
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 分类气味tab
export const getClassifySmell = (data) => {
	return https({
		url: '/category/flavourCategoryList',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 气味详情
export const getSmellDetail = (data) => {
	return https({
		url: '/tag/getItem',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 搜索
export const Sendsearch = (data) => {
	return https({
		url: '/product/search',
		// method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 清空浏览记录
export const clearSearch = (data) => {
	return https({
		url: '/member/readHistory/clear',
		// method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 猜你喜欢
export const guess = (data) => {
	return https({
		url: '/product/guess',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}

// 新首页热门tab
export const getIndexHot = (data) => {
	return https({
		url: '/product/recommend',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 首页模板
export const getIndexModelu = (data) => {
	return https({
		url: '/home/getHomeConfig',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 默认全部导出
export default {
	banner,
	activities,
	menus,
	special,
	getIndexHot,
	getIndxNewProduct,
	getClassifyBrand,
	getClassifySmell,
	getClassifyDet,
	getSmellDetail,
	Sendsearch,
	clearSearch,
	getIndxCollection,
	guess,
	getIndexModelu,
	...main,
	...login,
	...goods,
	...order,
	...subject
}
