<template>
	<view class="h100">
		<view class="box-pop bg-fff bs-bb p-0-30">
			<scroll-view style="height: 100vh" scroll-y="true" scroll-with-animation :catchtouchmove="false">
				<view class="" v-for="(item, index) in list" :key="index">
					<view class="fs-26 fw-b color-15 pt-20 pb-10">{{ item.title }}</view>
					<view class="dp-f fw-w jc-sb main">
						<view
							class="w-146 h-56 lh-56 ta-c fs-22 color-15 bd-bc mb-20"
							v-for="(items, i) in item.list"
							:class="{ activeTag: items.isActive }"
							:key="i"
							@click="onTag(index, i, items.id)"
						>
						{{ items.name }}
						</view>
					</view>
				</view>
				<view class="h-200"></view>
			</scroll-view>
			<view class="pop-footer">
				<view class="w-224 h-56 lh-56 c-15 ta-c fs-22 color-15 bs-bb bd-15" @click="init">重置</view>
				<view class="w-224 h-56 lh-56 bg-000 c-fff ta-c fs-22 color-fff" @click="showScreen">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
import popupLayer from '@/components/popup/popup-layer';
export default {
	components: {
		popupLayer
	},
	props: {
		filtrateList: {
			type: Array,
			default: [
				{
					title: '风格',
					list: [{ name: '干净', id: '10' }, { name: '文艺', id: '20' }, { name: '开朗', id: '30' }, { name: '温柔', id: '40' }]
				},
				{
					title: '香调',
					list: [{ name: '木质', id: '50' }, { name: '花香', id: '60' }, { name: '柑橘', id: '70' }, { name: '果香', id: '80' }]
				},
				{
					title: '规格',
					list: [{ name: '试香', id: '90' }, { name: '合辑', id: '100' }]
				},
				{
					title: '品牌',
					list: [{ name: '帕尔马', id: '11' }, { name: '宝格丽', id: '12' }, { name: '爱马仕', id: '13' }, { name: '六神', id: '14' }]
				}
			]
		}
	},
	watch: {
		filtrateList(newval, oldval) {
			this.list = newval
			newval.forEach((item, index) => {
				this.activeList[index] = [];
			});
		}
	},
	data() {
		return {
			activeList: [],
			list: {},
			filtrateId:[],//筛选id
		};
	},
	onLoad() {},
	onShow() {},
	
	methods: {
		onTag(index, i, id) {
			const newList = this.filtrateList
			if(newList[index].list[i].isActive){
				newList[index].list[i].isActive = ''
				this.filtrateId.forEach((item,index)=>{
					if(item == id){
						this.filtrateId.splice(index,1);
					}
				})
			}else{
				newList[index].list[i].isActive = id
				this.filtrateId.push(id)
			}
			console.log(this.filtrateId)
			this.$emit('changeTag',newList)
		},
		init(){
			this.filtrateId = []
			const newList = this.filtrateList
			 newList.forEach((item,index)=>{
				 item.list.forEach((items,i)=>{
					 items.isActive = ''
				 })
			 })
			 this.$emit('changeTag',newList)
		},
		showScreen() {
			this.$emit('showScreen');
		}
	}
};
</script>

<style lang="scss" scoped>
.activeTag {
	border: 1px solid #222 !important;
}
.main:after {
	content: '';
	width: 146rpx;
}
.box-pop {
	width: 538rpx;
	padding-top: 20rpx;
	position: relative;
	height: 100%;
}
.pop-footer {
	background: #fff;
	position: absolute;
	bottom: 0rpx;
	left: 0;
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 30rpx;
}
</style>
