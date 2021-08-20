import https from './interface'

export const addCart = (data) => {
	return https({
		url: '/cart/add',
		// method: 'GET',
		data,
		// handle:true
	})
}
export const getCart = (data) => {
	return https({
		url: '/cart/list',
		method: 'GET',
		data,
		// handle:true
	})
}
export const delCart = (data) => {
	return https({
		url: '/cart/delete',
		// method: 'GET',
		data,
		header: {
		      'Authorization': "Bearer " + uni.getStorageSync('Token'),
		      'Content-Type': 'application/x-www-form-urlencoded',
		    },
		// handle:true
	})
}
// 修改规格
export const setAttr = (data) => {
	return https({
		url: '/cart/update/attr',
		// method: 'GET',
		data,
		// handle:true
	})
}
// 修改数量
export const setQuantity = (data) => {
	return https({
		url: '/cart/update/quantity',
		method: 'GET',
		data,
		// handle:true
	})
}
// 根据购物车信息生成确认单信息
export const createOrder = (data) => {
	return https({
		url: '/order/generateConfirmOrder',
		// method: 'GET',
		data,
		// handle:true
	})
}

// 根据购物车信息生成订单
export const generateOrder = (data) => {
	return https({
		url: '/order/generateOrder',
		// method: 'GET',
		data,
		// handle:true
	})
}

// 根据购物车信息生成订单
export const submitorder = (data) => {
	return https({
		url: '/order/activityPromotionGenerateOrder',
		// method: 'GET',
		data,
		// handle:true
	})
}

// 微信支付
export const wechatPay = (data) => {
	return https({
		url: '/weiXin/pay',
		// method: 'GET',
		data,
		// handle:true
	})
}
// 订单列表
export const orderList = (data) => {
	return https({
		url: '/order/list',
		method: 'GET',
		data,
		// handle:true
	})
}
// 订单列表
export const deleteOrder = (data) => {
	return https({
		url: '/order/deleteOrder',
		// method: 'GET',
		data,
		// handle:true
	})
}
// 取消订单
export const cancelUserOrder = (data) => {
	return https({
		url: '/order/cancelUserOrder',
		// method: 'GET',
		data,
		// handle:true
	})
}
// 订单详情
export const orderInfo = (data) => {
	return https({
		url: '/order/detail/'+data,
		method: 'GET',
		data,
		// handle:true
	})
}
// 确认收货
export const confirmOrder = (data) => {
	return https({
		url: '/order/confirmReceiveOrder',
		// method: 'GET',
		data,
		// handle:true
	})
}
// 物流查询
export const expressOrder = (data) => {
	return https({
		url: '/express/query/'+data,
		method: 'GET',
		data,
		// handle:true
	})
}
// 立即购买
export const purchase = (data) => {
	return https({
		url: '/order/generateOrderBySkuId',
		method: 'GET',
		data,
		// handle:true
	})
}
// 支付回调
export const paySuccess = (data) => {
	return https({
		url: '/order/paySuccess',
		method: 'GET',
		data,
		// handle:true
	})
}