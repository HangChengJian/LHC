exports.install = function(Vue, options) {
	//显示loading
	Vue.prototype.$showLoading = function(_this) {
		_this.$refs.loading.open()
	};
	//隐藏loading
	Vue.prototype.$closeLoading = function(_this) {
		_this.$refs.loading.close()
	};
	// 路由跳转 验证登录
	Vue.prototype.$outerHref = function(url, loginType = false) {
		if (loginType) {
			if (uni.getStorageSync('Token')) {
				uni.navigateTo({
					url: url,
					success: () => {}
				})
			} else {
				uni.navigateTo({
					url: '/pages/wxlogin/wxlogin'
				});
			}
		} else {
			uni.navigateTo({
				url: url,
				success: () => {}
			})
		}
	};
	// 返回首页
	Vue.prototype.$goHome = function() {
		uni.switchTab({
			url:'/pages/index/index'
		})
	};
	// 返回上一页
	Vue.prototype.$goBack = function() {
		uni.navigateBack({
			delta:1
		})
	};
	// 添加搜索历史
	Vue.prototype.$setSearch = function(text) {
		let list = uni.getStorageSync('Search')
		if(!list){
			let arr = []
			arr.push(text)
			uni.setStorageSync('Search', arr);
		}else{
			list.forEach((item,index)=>{
				if(item === text){
					list.splice(index,1)
				}
			})
			if(list.length >= 10){
				list.splice(0,1)
			}
			list.push(text)
			uni.setStorageSync('Search', list);
		}
	};
	// 订单状态
	Vue.prototype.$orderStatus = function(status) {
		let text = ''
		// 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单
		switch (status) {
			case 0:
				text = '待付款';
				break;
			case 1:
				text = '待发货';
				break;
			case 2:
				text = '已发货';
				break;
			case 3:
				text = '交易完成';
				break;
			case 4:
				text = '已关闭';
				break;
		}
		return text
	};
	//乘法 
	Vue.prototype.$accMul = function(arg1, arg2) {
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {}
		try {
			m += s2.split(".")[1].length
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	}
	//加法 
	Vue.prototype.$accAdd = function(arg1, arg2) {
		var r1, r2, m;
		try {
			r1 = arg1.toString().split(".")[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split(".")[1].length
		} catch (e) {
			r2 = 0
		}
		m = Math.pow(10, Math.max(r1, r2))
		return (arg1 * m + arg2 * m) / m
	}
	//减法 
	Vue.prototype.$Subtr = function(arg1, arg2) {
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split(".")[1].length
		} catch (e) {
			r2 = 0
		}
		m = Math.pow(10, Math.max(r1, r2));
		n = (r1 >= r2) ? r1 : r2;
		return ((arg1 * m - arg2 * m) / m).toFixed(n);
	}
};
