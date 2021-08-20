import https from './interface'

export const userHome = (data) => {
	return https({
		url: '/banner/index',
		// method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
export const userInfo = (data) => {
	return https({
		url: '/sso/info',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}

export const setAddress = (data) => {
	return https({
		url: '/member/address/add',
		// method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
export const getAddress = (data) => {
	return https({
		url: '/member/address/list',
		method: 'GET', 
		data,
		// handle:true
	})
}
export const delAddress = (data) => {
	return https({
		url: '/member/address/delete/'+ data,
		// method: 'GET', 
		data,
		// handle:true
	})
}
export const updateAddress = (data) => {
	return https({
		// + data.id
		url: '/member/address/update/',
		// method: 'GET', 
		data,
		// handle:true
	})
}
export const getCoupon = (data) => {
	return https({
		url: '/coupon/queryCouponReceiveHistory',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}

export const getCouponCode = (data) => {
	return https({
		url: '/coupon/receiveByCode',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
export const discountQueryCode = (data) => {
	return https({
		url: '/discount/queryCode',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
//coupon/queryCouponNum
export const couponQueryCouponNum= () => {
	return https({
		url: '/coupon/queryCouponNum',
		method: 'GET'
		// handle:true
	})
}
// 获取优惠券下的商品
export const queryCouponProduct = (data) => {
	return https({
		url: '/product/queryCouponProduct',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
// 服务端 弹窗列表
export const popupListAll = () => {
	return https({
		url: '/popup/listAll',
		method: 'GET'
		// handle:true
	})
}