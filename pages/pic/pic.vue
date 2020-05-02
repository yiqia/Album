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
					<img @longpress="showOther" @click="showImg" :src="item" alt="" mode="aspectFit" :style="isSmall?'width:25vw;height:25vw':'width: 100vw;height: 100vw;'"
					 :data-index="index">
				</view>
				<view class="picListLi" @click="updataPic" style="background-color: #fff;box-shadow: 1px 2px 3px #a2a4a5;" v-if="isLogin">
					<img src="/static/icon/add.png" alt="" :style="isSmall?'width:25vw;height:25vw':'width: 100vw;height: 100vw;'">
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
	export default {
		name: "pic",
		data() {
			return {
				isSmall: false,
				info: {},
				isLogin:false
			}
		},
		methods: {
			//长按选择功能
			showOther(e) {
				var index = e.currentTarget.dataset.index;
				var img = this.info.imgList[index],
					id = this.classId;
				var that = this;
				wx.showActionSheet({
					itemList: ['设为封面', '删除'],
					success(res) {
						if (res.tapIndex == 0) {
							uni.showLoading({
								title: "设置中",
								mask: true
							})
							Ajax.sget({
									url: 'album/setIndexPic',
									data: {
										id: id,
										img: img
									}
								})
								.then((res) => { //请求成功的回调函数
									if (res.data.code == 1024) {
										uni.showToast({
											title: "设置成功"
										})
										//是否刷新数据
										uni.setStorageSync("isF5Index",true);
										uni.setStorageSync("isF5List",true);
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										})
									}
									uni.hideLoading();
								}).catch((res) => { //捕获请求失败时的回调函数
									console.log(res)
								})
						} else {
							uni.showModal({
								title: '提示',
								content: '是否删除该图片',
								success(res) {
									if (res.confirm) {
										uni.showLoading({
											title: "删除中",
											mask: true
										})
										Ajax.sget({
												url: 'album/cutImg',
												data: {
													id: id,
													img: img
												}
											})
											.then((res) => { //请求成功的回调函数
												if (res.data.code == 1024) {
													uni.showToast({
														title: "删除成功"
													})
													that.info.imgList.splice(index, 1);
												} else {
													uni.showToast({
														title: res.data.msg,
														icon: 'none'
													})
												}
												uni.hideLoading();
											}).catch((res) => { //捕获请求失败时的回调函数
												console.log(res)
											})


									} else if (res.cancel) {
										console.log('用户点击取消')
									}
								}
							})
						}
					},
					fail(res) {
						console.log(res.errMsg)
					}
				})

			},
			updataPic() {
				var that = this;
				uni.chooseImage({
					count: 20, //默认9
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
								url: getApp().globalData.url + "album/updataPic", //仅为示例，非真实的接口地址
								filePath: tempFilePaths[i],
								name: 'file',
								formData: {
									'session': uni.getStorageSync("session"),
									'id': that.classId
								},
								success: (uploadFileRes) => {
									uni.hideLoading();
									var res = JSON.parse(uploadFileRes.data);
									if (res.code == 1024) {
										if(that.info.imgList==null){
											that.info.imgList=[];
										}
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
			changeMode() {
				this.isSmall = !this.isSmall;
			},
			showImg(e) {
				var index = e.currentTarget.dataset.index;
				wx.previewImage({
					current: this.info.imgList[index], // 当前显示图片的http链接
					urls: this.info.imgList // 需要预览的图片http链接列表
				})
			},
			//加载首页数据
			getAlbum(e) {
				var that = this;
				Ajax.get({
						url: 'album/getAlbumList',
						data: {
							id: e
						}
					})
					.then((res) => { //请求成功的回调函数
						res.data.imgList = res.data.imgList && res.data.imgList.split(",");
						that.info = res.data;
					}).catch((res) => { //捕获请求失败时的回调函数
						console.log(res)
					})
			}
		},
		mounted() {
			if (uni.getStorageSync("session") != "" && uni.getStorageSync("session") != undefined && uni.getStorageSync(
					"session").length > 10) {
				this.isLogin = true;
				this.isSmall = true;
			} else {
				this.isLogin = false;
				this.isSmall = false;
			}
		},
		onLoad(e) {
			this.getAlbum(e.id);
			this.classId = e.id;
		},
		onShareAppMessage(res) {
			var that = this;
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log(res.target)
			}
			return {
				title: that.info.title,
				path: '/pages/pic/pic?id=' + that.classId
			}

		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.shareBtn {
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

	.shareBtn img {
		width: 2.5rem;
		height: 2.5rem;
		margin-top: 0.5rem;
	}

	.picList {
		display: flex;
		flex-wrap: wrap;
	}

	.picListLi {
		box-shadow: 1px 2px 3px #d6d8d9;
		background-color: #fff;
	}

	.picListLi img {}

	.picTitle {
		width: 100%;
		padding: 1rem 0;
		word-break: break-all;
	}

	.picTitle p:first-child {
		color: #444;
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.picTitle text {
		color: #848484;
	}

	.label {
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		background-color: #fff;
	}

	.lableLi {
		flex: 1;
	}

	.lableLi:first-child {
		text-align: left;
		color: #444;
	}

	.lableLi:last-child {
		text-align: right;
		color: #43c158;
	}
</style>
