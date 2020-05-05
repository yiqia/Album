<template>
	<view class="content">
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="item in banner" :key="item">
				<img :src="item" alt="">
			</swiper-item>
		</swiper>
		<view class="Limit">
			<view class="albumList">
				<view class="albumListLi" v-for="(item,index) in alibumList" :key="index" @click="showPic" :data-id="item.Id">
					<img :src="item.img" alt="" mode="aspectFill">
					<view class="Limit">
						<view class="alibumTitle">
							<p>{{item.title}}</p>
						</view>
						<p class="alibumInfo">{{item.num}}张图片</p>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	let Ajax = require("../util/Ajax.js");
	export default {
		data() {
			return {
				isLoading:false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				banner:[],
				alibumList:[
				],
				page:1
			}
		},
		onLoad() {
			this.getAlbum(this.page);
			var that = this;
			Ajax.get({url:'album/getBanner',data:{
			}})
			  .then((res)=>{//请求成功的回调函数
				that.banner=res.data;
			  }).catch((res)=>{//捕获请求失败时的回调函数
			    console.log(res)
			  })
		},
		onShow(){
			if(uni.getStorageSync("isF5Index")==true){
				this.alibumList=[];
				this.page=1;
				this.getAlbum(this.page);
				uni.setStorageSync("isF5Index",false);
			}
		},
		onPullDownRefresh(){
			this.alibumList=[];
			this.page=1;
			this.getAlbum(this.page);
			
		},
		methods: {
			showPic(e){
				var id=e.currentTarget.dataset.id;
				console.log(id);
				uni.navigateTo({
					url:"../pic/pic?id="+id
				})
			},
			//加载首页数据
			getAlbum(e){
				var that = this;
				Ajax.get({url:'album/getalbum',data:{
					page:e
				}})
				  .then((res)=>{//请求成功的回调函数
					that.alibumList=that.alibumList.concat(res.data);
					if(res.data!=""){that.page+=1};
					uni.stopPullDownRefresh();
					uni.hideLoading();
				  }).catch((res)=>{//捕获请求失败时的回调函数
				    console.log(res)
				  })
			}
		},
		onReachBottom(e){
			uni.showLoading({
				mask:true,
				title:"加载更多"
			})
			this.getAlbum(this.page);
			
		},
		
	}
</script>

<style>
	page{
		background-color:#f5f5f5;
	}
	.swiper {
		width: 100%;
		height: 30vh;
	}

	.swiper img {
		width: 100%;
		height: 100%;
	}

	.albumList {
		display: flex;
		flex-wrap: wrap;
		margin-top: 0.5rem;
		
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.albumListLi {
		width: 48%;
		background-color: #fff;
		box-shadow: 1px 2px 3px #f2f6f8;
		height: 14rem;
		margin-bottom: 0.5rem;	
	}
	.albumListLi img{
		width: 100%;
		height: 65%;
	}
	.albumListLi:nth-child(2n-1) {
		margin-right: 2%;
	}
	.alibumTitle{
		color: #444;
		height: 20%;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.alibumInfo{
		color: #c1c1c1;
		font-size: 0.8rem;
		line-height: 1.5rem;
	}
	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
