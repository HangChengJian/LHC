import https from './interface'

export const wxLoadin = (data) => {
	return https({
		url: '/sso/wxapp/auth',
		// method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
export const binding = (data) => {
	return https({
		url: '/sso/wxapp/binding',
		// method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
export const getAuthCode = (data) => {
	return https({
		url: '/sso/getAuthCode',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
export const bindPhone = (data) => {
	return https({
		url: '/sso/wxapp/bindPhone',
		// method: 'GET', // 默认POST
		data,
		// handle:true
	})
}
export const bindingPhone = (data) => {
	return https({
		url: '/sso/wxapp/getPhone',
		// method: 'GET', // 默认POST
		data,
		// handle:true
	})
}