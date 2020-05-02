<template>
	<div name="pic">
		<view>
			<view class="Limit">
				<view class="picTitle">
					<p>{{info.title}}</p>
					<text>{{info.info}}</text>
				</view>
			</view>
			<view class="label">
				<view class="Limit" style="display: flex;">
					<view class="lableLi">
						<p>{{info.imgList?info.imgList.length:0}}张图片</p>
					</view>
					<view class="lableLi" @click="changeMode">
						<p>{{isSmall?"小图模式":"大图模式"}}</p>
					</view>
				</view>
			</view>
			<view class="picList">
				
				<view class="picListLi" v-for="(item,index) in info.imgList" :key="index">
					<img @click="showImg" :src="item" alt="" mode="aspectFit" :style="isSmall?'width:25vw;height:25vw':'width: 100vw;height: 100vw;'" :data-index="index">
				</view>
				<view class="picListLi" @click="updataPic" style="background-color: #fff;box-shadow: 1px 2px 3px #a2a4a5;">
					<img src="/static/icon/add.png" alt=""  :style="isSmall?'width:25vw;height:25vw':'width: 100vw;height: 100vw;'">
				</view>
			</view>
			<view style="height: 7vh;width: 100vw;"></view>
			<button class="shareBtn" open-type="share">
				<img src="/static/icon/share.png" alt="">
				<span>分享</span>
			</button>
		</view>
	</div>
</template>

<script>
	let Ajax = require("../util/Ajax.js")
	export default{
		name:"pic",
		data(){
			return {
				isSmall:false,
				info:{}
			}
		},
		methods:{
			updataPic(){
				var that = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						uni.showLoading({
							title: "上传中",
							mask: true
						})
						const tempFilePaths = res.tempFilePaths;
						console.log(tempFilePaths);

						for (var i = 0; i < tempFilePaths.length; i++) {
							uni.uploadFile({
								url: getApp().globalData.url+"album/updataPic", //仅为示例，非真实的接口地址
								filePath: tempFilePaths[i],
								name: 'file',
								formData: {
									'session': uni.getStorageSync("session"),
									'id':that.classId
								},
								success: (uploadFileRes) => {
									uni.hideLoading();
									var res=JSON.parse(uploadFileRes.data);
									if(res.code==1024){
										that.info.imgList.push(res.img);
									}
								}
							});
						}
						// if (this.imgList.length != 0) {
						// 	this.imgList = this.imgList.concat(res.tempFilePaths)
						// } else {
						// 	this.imgList = res.tempFilePaths
						// }
					}
				});
			},
			changeMode(){
				this.isSmall=!this.isSmall;
			},
			showImg(e){
				var index= e.currentTarget.dataset.index;
				wx.previewImage({
				  current: this.info.imgList[index], // 当前显示图片的http链接
				  urls: this.info.imgList // 需要预览的图片http链接列表
				})
			},
			//加载首页数据
			getAlbum(e){
				var that = this;
				Ajax.get({url:'album/getAlbumList',data:{
					id:e
				}})
				  .then((res)=>{//请求成功的回调函数
					res.data.imgList=res.data.imgList && res.data.imgList.split(",");
					that.info=res.data;
				  }).catch((res)=>{//捕获请求失败时的回调函数
				    console.log(res)
				  })
			}
		},
		mounted(){
			if(uni.getStorageSync("session")!="" && uni.getStorageSync("session")!=undefined && uni.getStorageSync("session").length>10){
				this.isLogin=true;
				this.isSmall=true;
			}else{
				this.isLogin=false;
				this.isSmall=false;
			}
		},
		onLoad(e) {
			this.getAlbum(e.id);
			this.classId=e.id;
		},
		onShareAppMessage(res){
			 if (res.from === 'button') {
			      // 来自页面内转发按钮
			      console.log(res.target)
			    }
			    return {
			      title: this.info.title,
			      path: '/pages/pic/pic?id='+this.info.Id
			    }
		
		}
	}
</script>

<style>
	page{
		background-color: #f5f5f5;
	}
	.shareBtn{
		width: 100vw;
		height: 7vh;
		background-color: #DD524D;
		color: #fff;
		display: flex;
		position: fixed;
		bottom: 0;
		line-height: 7vh;
		font-size: 1.5rem;
		justify-content: center;
		border-radius: 0px;
	}
	.shareBtn img{
		width: 2.5rem;
		height: 2.5rem;
		margin-top: 0.5rem;
	}
	.picList{
		display: flex;
		flex-wrap: wrap;
	}
	.picListLi{
		box-shadow: 1px 2px 3px #d6d8d9;
		background-color: #fff;
	}
	.picListLi img{
		
	}
	.picTitle{
		width: 100%;
		padding: 1rem 0;
		word-break: break-all;
	}
	.picTitle p:first-child{
		color: #444;
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}
	.picTitle text{
		color: #848484;
	}
	.label{
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		background-color: #fff;
	}
	.lableLi{
		flex: 1;
	}
	.lableLi:first-child{
		text-align: left;
		color: #444;
	}
	.lableLi:last-child{
		text-align: right;
		color: #43c158;
	}
</style>
