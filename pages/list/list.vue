<template>
	<div name="list">
		
		<view class="Limit">
			<view class="lable" v-if="isLogin">
				<view class="lableTitle">
					<view class="lableTitleLi">
						<p>管理分类</p>
					</view>
					<view class="lableTitleLi" @click="showLabelContent">
						<img src="/static/icon/add.png" alt="">
					</view>
				</view>
				<view class="labelContent" :style="isLabelOpen?'height: 22vw;':'height: 0vw;'">
					<view class="Limit">
						<view class="labelContentList">
							<view class="labelContentLi" style="width: 70%;">
								<input type="text" v-model="className" placeholder="输入分类名">
							</view>
							<view class="labelContentLi" style="width: 30%;display: flex;justify-content: flex-end;align-items: center;">
								<button type="primary" style="font-size: 3vw;width: 13vw;height: 8vw;margin-right: 0px;" @click="addClass">添加</button>
							</view>
						</view>
						<view class="labelContentList">
							<view class="labelContentLi" style="width: 40%;">
								<input type="text" v-model="changeName" placeholder="长按选择分类">
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
				<view class="albumListLi" @longpress="showOther" @tap="showClass" :data-index="index" v-for="(item,index) in albumClass" :key="index" :style="changeIndex==index && changeIndex!=''?'box-shadow: 1px 2px 3px #ccd0d1;':''">
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	let Ajax = require("../util/Ajax.js")
	export default{
		data(){
			return {
				albumClass:[],
				isLabelOpen:false,
				isLogin:false,
				className:"",
				changeName:"",
				changeIndex:"",
			}
		},
		methods:{
			changeCut(e){
				var that = this;
				if(this.changeName!=""){
					if(this.changeIndex==""){
						this.changeIndex=0;
					}
					uni.showLoading({
						title:"删除中",
						mask:true
					})
					Ajax.sget({url:'album/cutClass',data:{
						id:that.albumClass[that.changeIndex].Id
					}})
					  .then((res)=>{//请求成功的回调函数
						if(res.data.code==1024){
							uni.showToast({
								title:"删除成功"
							})
							that.albumClass.splice(that.changeIndex,1);
							that.changeIndex="";
							that.changeName="";
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
			//修改名字功能
			changeSave(e){
				var that = this;
				if(this.changeName!=""){
					uni.showLoading({
						title:"保存中",
						mask:true
					})
					Ajax.sget({url:'album/saveClass',data:{
						changeName:that.changeName,
						id:that.albumClass[that.changeIndex].Id
					}})
					  .then((res)=>{//请求成功的回调函数
						if(res.data.code==1024){
							uni.showToast({
								title:"保存成功"
							})
							that.albumClass[that.changeIndex].title=that.changeName;
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
						var changeAddress=this.albumClass[this.changeIndex-1];
					}else{
						var changeAddress=this.albumClass[this.changeIndex+1];
					}
					var sort=changeAddress && changeAddress['sort'];
					if(changeAddress==undefined)return 0;
					Ajax.sget({url:'album/changeClassSort',data:{
						AID:that.albumClass[that.changeIndex].Id,
						ASORT:sort,
						BID:changeAddress.Id,
						BSORT:that.albumClass[that.changeIndex]['sort']
					}})
					  .then((res)=>{//请求成功的回调函数
						if(res.data.code==1024){
							uni.showToast({
								title:"更换成功"
							})
							let dqSort=that.albumClass[that.changeIndex]['sort'];
							var albumClasses=that.albumClass;
							//当前对象
							var leb=that.albumClass[that.changeIndex];
							leb['sort']=sort;
							//中间对象
							var begin = leb;
							changeAddress['sort']=dqSort;
							
							
							
							if(dir==1){
								albumClasses[that.changeIndex]=changeAddress;
								albumClasses[this.changeIndex-1]=leb;
								this.changeIndex=this.changeIndex-1;
							}else{
								albumClasses[that.changeIndex]=changeAddress;
								albumClasses[this.changeIndex+1]=leb;
								this.changeIndex=this.changeIndex+1;
							}
							
							that.albumClass=albumClasses;
							
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
				var id=this.albumClass[index].Id,
					title=this.albumClass[index].title;
				this.changeName=title;
				this.changeIndex=index;
				this.$forceUpdate();
				uni.showToast({
					title:"选择成功，顶部开始管理",
					icon:"none"
				})
			},
			showClass(e){
				var index=e.currentTarget.dataset.index;
				var id=this.albumClass[index].Id;
				console.log(id);
				uni.navigateTo({
					url:"listContent?id="+id
				})
			},
			//展开顶部创建新分类
			showLabelContent(){
				this.isLabelOpen=!this.isLabelOpen;
			},
			//添加分类
			addClass(){
				var that = this;
				if(this.className!=""){
					uni.showLoading({
						title:"添加中",
						mask:true
					})
					Ajax.http({url:'album/addClass',data:{
						className:that.className
					}})
					  .then((res)=>{//请求成功的回调函数
						if(res.data.code==1024){
							uni.showToast({
								title:"添加成功"
							})
							that.albumClass.push({Id:res.data.Id,title:that.className,sort:res.data.Id-1})
							that.className="";
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
			}
		},
		mounted(){
			var that = this;
			uni.showLoading({
				title:"加载中"
			})
			Ajax.get({url:'album/getalbumClass',data:{
			}})
			  .then((res)=>{//请求成功的回调函数
				that.albumClass=res.data;
				uni.hideLoading();
			  }).catch((res)=>{//捕获请求失败时的回调函数
			    console.log(res)
			  })
		},
		onShow() {
			if(uni.getStorageSync("session")!="" && uni.getStorageSync("session")!=undefined && uni.getStorageSync("session").length>10){
				this.isLogin=true;
			}else{
				this.isLogin=false;
			}
		}
		
	}
</script>

<style>
	page{
		background-color: #f5f5f5;
	}
	.albumList{
		width: 100%;
		height: 3rem;
		display: flex;
		flex-wrap: wrap;
		margin-top: 1rem;
	}
	.albumListLi{
		width: 48%;
		height: 3rem;
		background-color: #fff;
		box-shadow: 1px 2px 3px #f2f6f8;
		margin-bottom: 1rem;
	}
	.albumListLi text{
		line-height: 3rem;
		margin-left: 0.5rem;
		color: #444;
	}
	.albumListLi:nth-child(2n-1){
		margin-right: 2%;
	}
	.lableTitle{
		width: 100%;
		height: 12vw;
		background-color: #fff;
		box-shadow: 1px 2px 3px #f2f6f8;
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
