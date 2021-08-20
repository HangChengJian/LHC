import https from './interface'
//商品详情
export const getGoodsInfo = (data) => {
	return https({
		url: '/product/detail/' + data.id,
		method: 'GET',
		// data,
		// handle:true
	})
}
//商品添加取消收藏
export const setGoodsLike = (data) => {
	return https({
		url: '/product/like',
		// method: 'GET',
		data,
		// handle:true
	})
}
//商品收藏列表
export const getLikeGoods = (data) => {
	return https({
		url: '/collection/productList',
		method: 'GET',
		data,
		// handle:true
	})
}
//品牌收藏列表
export const getLikeBrand = (data) => {
	return https({
		url: '/collection/brandList',
		method: 'GET',
		data,
		// handle:true
	})
}
//品牌收藏
export const setbrandLike = (data) => {
	return https({
		url: '/brand/like',
		// method: 'GET',
		data,
		// handle:true
	})
}
//精品推荐
export const getRecommend = (data) => {
	return https({
		url: '/product/recommend',
		method: 'GET',
		data,
		// handle:true
	})
}
//商品搜索
// export const getLikeGoods = (data) => {
// 	return https({
// 		url: '/collection/productList',
// 		method: 'GET',
// 		data,
// 		// handle:true
// 	})
// }
//商品详情品牌推荐
export const getBrandRecommend = (data) => {
	return https({
		url: '/brand/detailAndRandomProductByproductId/'+data.id,
		method: 'GET',
		// handle:true
	})
}
//
export const getConfig = (data) => {
	return https({
		url: '/newCustomers/getConfig',
		method: 'GET',
		data
		// handle:true
	})
}

// 新人大礼
export const getnewsshop = (data) => {
	return https({
		url: '/promotion/queryPromotionProduct',
		method: 'GET',
		data
		// handle:true
	})
}

// 活动结算
export const buyshops = (data) => {
	return https({
		url: '/order/promotionGenerateConfirmOrder',
		method: 'POST',
		data
		// handle:true
	})
}

//购物车结算
export const goshopcar = (data) => {
	return https({
		url: '/cart/addActivityProduct',
		method: 'POST',
		data
		// handle:true
	})
}

export const getPrefecture = (data) => {
	return https({
		url: '/secondaryPage/getConfig',
		method: 'GET',
		data
		// handle:true
	})
}