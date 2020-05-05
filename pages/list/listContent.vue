<template>
	<div name="listContent">
		<view class="Limit">
			<view class="lable" v-if="isLogin">
				<view class="lableTitle">
					<view class="lableTitleLi">
						<p>管理相册</p>
					</view>
					<view class="lableTitleLi" @click="showLabelContent">
						<img src="/static/icon/add.png" alt="">
					</view>
				</view>
				<view class="labelContent" :style="isLabelOpen?'height:600upx;':'height: 0vw;'">
					<view class="Limit">
						<view class="labelContentList">
							<view class="albumInfo">
								<textarea v-model="albumInfo" placeholder="输入你的相册描述" />
							</view>
						</view>
						<input type="text" style="height: 100upx;" v-model="className" placeholder="输入相册名" />
						<view class="labelContentList">
							<view class="labelContentLi" style="width: 60%;">
								
							</view>
							<view class="labelContentLi" style="width: 40%;display: flex;justify-content: flex-end;align-items: center;">
								<button type="primary" style="font-size: 3vw;width: 13vw;height: 8vw;margin-right: 0px;" @click="addClass">添加</button>
							</view>
						</view>
						<input type="text" v-model="changeName" placeholder="长按选择相册">
						<view class="labelContentList">
							<view class="labelContentLi" style="width: 40%;">
								<!-- <input type="text" v-model="changeName" placeholder="长按选择相册"> -->
							</view>
							<view class="labelContentLi" style="width: 60%;display: flex;justify-content: flex-end;align-items: center;">
								<button type="primary" style="font-size: 3vw;width: 13vw;height: 8vw;margin-right: 0px;" @click="changeLeftRight" :data-id="1" :disabled="!changeIndex && changeName.length<1">前移</button>
								<button type="primary" style="font-size: 3vw;width: 13vw;height: 8vw;margin-right: 0px;" @click="changeLeftRight" :data-id="2" :disabled="!changeIndex && changeName.length<1">后移</button>
								<button type="primary" style="font-size: 3vw;width: 13vw;height: 8vw;margin-right: 0px;" @click="changeSave" :disabled="!changeIndex && changeName.length<1">保存</button>
								<button type="primary" style="font-size: 3vw;width: 13vw;height: 8vw;margin-right: 0px;" @click="changeCut" :disabled="!changeIndex && changeName.length<1">删除</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="albumList">
				<view class="albumListLi" @longpress="showOther" :data-index="index" v-for="(item,index) in alibumList" :key="index" @click="showPic" :style="changeIndex==index && changeIndex!=''?'box-shadow: 1px 2px 3px #ccd0d1;':''">
					<img :src="item.img" alt="" mode="aspectFit">
					<view class="Limit">
						<view class="alibumTitle">
							<p>{{item.title}}</p>
						</view>
						<p class="alibumInfo">{{item.num}}张图片</p>
					</view>
				</view>
				
			</view>
		</view>
	</div>
</template>

<script>
	let Ajax = require("../util/Ajax.js")
	export default{
		name:"listContent",
		data(){
			return {
				alibumList:[],
				isLabelOpen:false,
				isLogin:false,
				className:"",
				changeName:"",
				changeIndex:"",
				albumInfo:"",
				classId:""
			}
		},
		onLoad(e) {
			this.getAlbum(e.id);
			this.classId=e.id;
		},
		onShow(){
			if(uni.getStorageSync("isF5List")==true){
				this.alibumList=[];
				this.getAlbum(this.classId);
				uni.setStorageSync("isF5List",false);
			}
		},
		methods:{
			changeCut(e){
				var that = this;
				if(this.albumInfo!="" || this.changeName!=""){
					if(this.changeIndex==""){
						this.changeIndex=0;
					}
					uni.showLoading({
						title:"删除中",
						mask:true
					})
					Ajax.sget({url:'album/cutType',data:{
						id:that.alibumList[that.changeIndex].Id
					}})
					  .then((res)=>{//请求成功的回调函数
						if(res.data.code==1024){
							uni.showToast({
								title:"删除成功"
							})
							that.alibumList.splice(that.changeIndex,1);
							that.changeIndex="";
							that.changeName="";
							that.albumInfo="";
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
						uni.hideLoading();
					  }).catch((res)=>{//捕获请求失败时的回调函数
						console.log(res)
					  })
				}else{
					
				}
			},
			//保存相册功能
			changeSave(e){
				var that = this;
				if(this.changeName!=""){
					uni.showLoading({
						title:"保存中",
						mask:true
					})
					Ajax.sget({url:'album/saveType',data:{
						changeName:that.changeName,
						changeInfo:that.albumInfo,
						id:that.alibumList[that.changeIndex].Id
					}})
					  .then((res)=>{//请求成功的回调函数
						if(res.data.code==1024){
							uni.showToast({
								title:"保存成功"
							})
							that.alibumList[that.changeIndex].title=that.changeName;
							that.alibumList[that.changeIndex].info=that.changeInfo;
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
						uni.hideLoading();
					  }).catch((res)=>{//捕获请求失败时的回调函数
						console.log(res)
					  })
				}else{
					uni.showToast({
						title:"不能为空",
						icon:"none"
					})
				}
			},
			//左右移动
			changeLeftRight(e){
				var dir=e.currentTarget.dataset.id;
				var changeName=this.changeName;
				const that = this;
				if(changeName!="" || changeName!=undefined){
					
					//直接传递给后端需要调换顺序的两个ID和顺序号
					if(dir==1){
						var changeAddress=this.alibumList[this.changeIndex-1];
					}else{
						var changeAddress=this.alibumList[this.changeIndex+1];
					}
					var sort=changeAddress && changeAddress['sort'];
					if(changeAddress==undefined)return 0;
					Ajax.sget({url:'album/changeTypeSort',data:{
						AID:that.alibumList[that.changeIndex].Id,
						ASORT:sort,
						BID:changeAddress.Id,
						BSORT:that.alibumList[that.changeIndex]['sort']
					}})
					  .then((res)=>{//请求成功的回调函数
						if(res.data.code==1024){
							uni.showToast({
								title:"更换成功"
							})
							let dqSort=that.alibumList[that.changeIndex]['sort'];
							var alibumLists=that.alibumList;
							//当前对象
							var leb=that.alibumList[that.changeIndex];
							leb['sort']=sort;
							//中间对象
							var begin = leb;
							changeAddress['sort']=dqSort;
							
							
							
							if(dir==1){
								alibumLists[that.changeIndex]=changeAddress;
								alibumLists[this.changeIndex-1]=leb;
								this.changeIndex=this.changeIndex-1;
							}else{
								alibumLists[that.changeIndex]=changeAddress;
								alibumLists[this.changeIndex+1]=leb;
								this.changeIndex=this.changeIndex+1;
							}
							
							that.alibumList=alibumLists;
							
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
						uni.hideLoading();
					  }).catch((res)=>{//捕获请求失败时的回调函数
					    console.log(res)
					  })
					
					
				}else{
					uni.showToast({
						title:"你还没有选择类别",
						icon:"none"
					})
				}
			},
			//长按选择功能
			showOther(e){
				if(!this.isLogin)return 0;
				var index=e.currentTarget.dataset.index;
				var id=this.alibumList[index].Id,
					title=this.alibumList[index].title,
					info=this.alibumList[index].info;
				console.log(index);
				this.changeName=title;
				this.changeIndex=index;
				this.albumInfo=info;
				uni.showToast({
					title:"选择成功，顶部开始管理",
					icon:"none"
				})
			},
			//展开顶部创建新分类
			showLabelContent(){
				this.isLabelOpen=!this.isLabelOpen;
			},
			//添加分类
			addClass(){
				var that = this;
				// if(this.albumInfo==""){
				// 	uni.showToast({
				// 		title:'相册描述不能为空',
				// 		icon:"none"
				// 	})
				// 	return 0;
				// }
				if(this.className!=""){
					uni.showLoading({
						title:"添加中",
						mask:true
					})
					Ajax.http({url:'album/addAlbum',data:{
						className:that.className,
						classInfo:that.albumInfo,
						classId:that.classId
						
					}})
					  .then((res)=>{//请求成功的回调函数
						if(res.data.code==1024){
							uni.showToast({
								title:"添加成功"
							})
							
							that.alibumList.push({
								Id:res.data.Id,
								title:that.className,
								class_id:that.classId,
								img:"http://qzonestyle.gtimg.cn/aoi/img/photo/logic/pic-none.png?rf=albumlist&t=5",
								info:that.albumInfo,
								num:0,
								sort:res.data.Id-1
							})
							that.className="";
							that.albumInfo="";
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
						uni.hideLoading();
					  }).catch((res)=>{//捕获请求失败时的回调函数
					    console.log(res)
					  })
				}else{
					uni.showToast({
						title:'不能为空',
						icon:"none"
					})
				}
			},
			showPic(e){
				var index=e.currentTarget.dataset.index;
				uni.navigateTo({
					url:"../pic/pic?id="+this.alibumList[index].Id
				})
			},
			//加载首页数据
			getAlbum(e){
				var that = this;
				Ajax.get({url:'album/getAlbumClassPic',data:{
					id:e
				}})
				  .then((res)=>{//请求成功的回调函数
					that.alibumList=that.alibumList.concat(res.data);
				  }).catch((res)=>{//捕获请求失败时的回调函数
				    console.log(res)
				  })
			}
		},
		mounted(){
			if(uni.getStorageSync("session")!="" && uni.getStorageSync("session")!=undefined && uni.getStorageSync("session").length>10){
				this.isLogin=true;
			}else{
				this.isLogin=false;
			}
			
		}
	}
</script>

<style>
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
	.lable{
		box-shadow: 1px 2px 3px #d9ddde;
		margin-bottom: 5vw;
	}
	.lableTitle{
		width: 100%;
		height: 12vw;
		background-color: #fff;
		
		line-height: 12vw;
	
		display: flex;
	}
	.lableTitle p{
		color: #444;
		text-indent: 2vw;
	}
	.lableTitleLi{
		flex: 1;
		
	}
	.albumInfo{
		width: 100%;
		height: 30vw;
	}
	.albumInfo textarea{
		width: 100%;
		height: 100%;
	}
	.lableTitle .lableTitleLi:last-child{
		display: flex;
		justify-content:flex-end;
		align-items: center;
	}
	.lableTitleLi img{
		width: 7vw;
		height: 7vw;
		padding:0 3vw;
		justify-content: center;
		
	}
	.labelContent{
		width: 100%;
		transition: all 0.5s;
		background-color: #fff;
		overflow: hidden;
	}
	.labelContentList{
		display: flex;
		
	}
	.labelContentLi{
		height: 10vw;
		line-height: 10vw;
		font-size: ;
	}
	.labelContentLi input{
		height: 10vw;
		line-height: 10vw;
	}
</style>
