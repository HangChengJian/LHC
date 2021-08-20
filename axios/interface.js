import _config from './config'; // 导入私有配置

export default function $http(options) {
	// console.log(_config.url, options.url)
	options.url = _config.url + options.url;
	return new Promise((resolve, reject) => {
		// 进行url字符串拼接
		// 拦截请求
		_config.complete = (response) => {
			//  request請求访问成功
			if (response.statusCode === 200) {
				// 接口请求成功
				if (response.data.code !== 200) {
					_error(response.data.code, response.data.message);
				}
				resolve(response);
			} else {
				// 处理catch 请求，不在本页面之外处理，统一在这里处理
				if (options.handle) {
					reject(response)
				} else {
					try {
						Promise.reject(response).catch(err => {
							// console.error(err);  
							_page_error(response.statusCode || response.errMsg);
						});
					} catch (e) {
						console.log(e)
					}
				}
			}

		}
		const Token = uni.getStorageSync('Token')
		_config.header.Authorization = Token ? "Bearer " + Token : ''
		// 开始请求
		uni.request(Object.assign({}, _config, options));
	})
}

// 接口錯誤
function _error(err, msg = '') {
	console.log('err',err)
	switch (err) {
		case 401:
			// 错误码401的处理方式
			uni.navigateTo({
				url: '/pages/wxlogin/wxlogin'
			});
			break;
		default:
		uni.showToast({
			title: msg,
			icon: 'none'
		})
	}
}
// request 錯誤
function _page_error(err, msg) {
	switch (err) {
		case 401:
			// 错误码404的处理方式
			console.error("请求背拒绝")
			uni.showToast({
				title: msg,
				icon: 'none'
			})
			break;
		case 404:
			// 错误码404的处理方式
			console.error("没有找到页面")
			break;
		case 405:
			console.error("错误的请求", msg)
			uni.showToast({
				title: msg,
				icon: 'none'
			})
			break;
		case 500:
			console.error("错误的请求", msg)
			uni.showToast({
				title: '请求错误',
				icon: 'none'
			})
			break;
	}
}
