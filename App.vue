<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
				});
				updateManager.onUpdateReady(function() {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
							if (res.confirm) {
								updateManager.applyUpdate();
							}
						}
					});
				});
				updateManager.onUpdateFailed(function() {
					// 新的版本下载失败
					uni.showModal({
						title: '已经有新版本了哟~',
						content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
					});
				});
			}
			   //  wx.loadFontFace({
				  // global:true,
			   //    family: 'kt',// 自定义字体的名字 随便起就可以
			   //    source: 'url("https://beautinow-cdn.oss-cn-hangzhou.aliyuncs.com/font/hy.ttf")',//这里填写第二步获取的下载地址
			   //    success(res) {
			   //      console.log(res.status)
			   //    },
			   //    fail: function(res) {
			   //      console.log(res.status)
			   //    },
			   //    complete: function(res) {
			   //     console.log(res.status)
			   //    }
			   //  });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/css/common.css';
	@import './common/css/markrgba-css-rpx/index.css';
	::-webkit-scrollbar {
	  width: 0;
	  height: 0;
	  color: transparent;
	}
</style>
