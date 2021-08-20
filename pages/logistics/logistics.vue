<template>
	<view class="logistics-box">
		<view class="wuliu-box " :class="{'wlBd':index !== list.length - 1}" v-for='(item,index) in list' :key='index'>
			<view class="fs-28 pt-30" :class="{'colro9':index !== 0}">
				{{item.AcceptStation}}
			</view>
			<view class="fs-24 pt-16" :class="{'colro9':index !== 0}">
				{{item.AcceptTime}}
			</view>
			<view class="solid dp-f fd-c ai-c">
				<view class="w-20 h-20 br50 bg-d">
					
				</view>
				<view class="xian" v-if='index !== list.length - 1'>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				list:[],
				wlInfo: {
				    delivery_status: 2, //快递状态 1已签收 2配送中
				    post_name: '韵达快递', //快递名称
				    logo: 'https://cdn.kuaidi100.com/images/all/56/yunda.png', //快递logo
				    exp_phone: '95546', //快递电话
				    post_no: '4304678557725', //快递单号
				    addr: '江西省南昌市青云谱区', //收货地址
				    //物流信息
				    list: [{
				            "time": "2020-04-12 13:00:57",
				            "timeArr": ['2020-04-12', '13:00:57'],
				            "context": "江西南昌青云谱区 快件已被 丰巢智能柜 代签收。",
				            "location": ""
				        },
				        {
				            "time": "2020-04-12 12:58:53",
				            "timeArr": ['2020-04-12', '12:58:53'],
				            "context": "江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888",
				            "location": ""
				        },
				        {
				            "time": "2020-04-11 15:45:44",
				            "timeArr": ['2020-04-11', '15:45:44'],
				            "context": "江西南昌分拨中心 从站点发出，本次转运目的地：江西南昌青云谱区",
				            "location": ""
				        },
				        {
				            "time": "2020-04-11 15:08:45",
				            "timeArr": ['2020-04-11', '15:08:45'],
				            "context": "江西南昌分拨中心 在分拨中心进行卸车扫描",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 17:42:41",
				            "timeArr": ['2020-04-10', '17:42:41'],
				            "context": "浙江义乌分拨中心 进行装车扫描，发往：江西南昌分拨中心",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 17:39:38",
				            "timeArr": ['2020-04-10', '17:39:38'],
				            "context": "浙江义乌分拨中心 在分拨中心进行称重扫描",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 16:02:46",
				            "timeArr": ['2020-04-10', '16:02:46'],
				            "context": "浙江义乌城浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包西公司 进行下级地点扫描，发往：江西南昌地区包",
				            "location": ""
				        },
				        {
				            "time": "2020-04-10 15:48:42",
				            "timeArr": ['2020-04-10', '15:48:42'],
				            "context": "浙江义乌城西公司城西营销部 进行揽件扫描",
				            "location": ""
				        }
				    ]
				}
			}
		},
		onLoad(e){
			this.$http.expressOrder(e.orderId).then(res=>{
				console.log(res.data.data.Traces)
				this.list = res.data.data.Traces
				this.list = this.list.reverse()
			})
		},
		onShow() {},
		watch:{},
		computed:{},
		methods:{},
	}
</script>

<style lang="scss" >
	page{
		background: #F6F6F6;
	}
	.logistics-box{
		box-sizing: border-box;
		padding: 0 110rpx 0 60rpx;
		margin-top: 14rpx;
		background-color: #fff;
	}
	.wlBd{
		position: relative;
		&::after{
			content: '';
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 2rpx;
			background: #ddd;
		}
	}
	.colro9{
		color:#999 ;
	}
	.wuliu-box{
		position: relative;
		padding-left: 40rpx;
		padding-bottom: 30rpx;
		.solid{
			position: absolute;
			height: 100%;
			top: 40rpx;
			left: -20rpx;
			.xian{
				width: 2rpx;
				background: #ddd;
				height: 100%;
			}
		}
	}
</style>
