<template>
	<view class="content">
		<view class="header">
			<view class="headerImg">
				<img :src="'http://q2.qlogo.cn/headimg_dl?dst_uin='+info.qq+'&spec=4'" alt="">
			</view>
			<p>{{info.name}}</p>
			<p v-if="isLogin" style="color: #DD524D;">欢迎你管理员</p>
			<text>
				
				{{info.info}}


			</text>
		</view>

		<view class="function">

			<view class="functionLi" @click="copy" :data-info="info.wx">
				<view class="Limit">
					<p>添加我的微信</p>
				</view>
			</view>
			<view class="functionLi" @click="callPhone">
				<view class="Limit">
					<p>拨打我的电话</p>
				</view>
			</view>
			<view class="functionLi" @click="copy" :data-info="info.www">
				<view class="Limit">
					<p>访问我的网址</p>
				</view>
			</view>
			<button class="findMe" open-type="contact">
				<view class="Limit">
					<p>联系我们</p>
				</view>
			</button>
			<view class="functionLi" @click="adminLogin" v-if="!isLogin">
				<view class="Limit">
					<p>管理员登录</p>
				</view>
			</view>
			<view class="functionLi" @click="endLogin" v-if="isLogin">
				<view class="Limit">
					<p>退出登录</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				info:{
					qq:"330729121",
					name:"Hello",
					info:"拿着最少的工资，做着最多的事情。",
					wx:"ai330729121",
					phone:"17602364646",
					www:"http://www.q05.cc/"
				},
				isLogin:false
			}
		},
		onLoad() {

		},
		onShow() {
			if(uni.getStorageSync("session")!="" && uni.getStorageSync("session")!=undefined && uni.getStorageSync("session").length>10){
				this.isLogin=true;
			}else{
				this.isLogin=false;
			}
		},
		methods: {
			//退出登录
			endLogin(){
				uni.clearStorage();
				uni.reLaunch({
					url:"../index/index"
				})
			},
			callPhone(e){
				uni.makePhoneCall({
				  phoneNumber: this.info.phone //仅为示例，并非真实的电话号码
				})
			},
			copy(e){
				var info=e.currentTarget.dataset.info;
				console.log(info);
				uni.setClipboardData({
				  data: info,
				  success (res) {
						uni.showToast({
							title:"已复制到剪切板"
						})
				  }
				})
			},
			adminLogin(e){
				uni.navigateTo({
					url:"./login"
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.header {
		width: 100%;
		height: 40vh;
		background-color: #fff;
		box-shadow: 1px 2px 3px #f2f6f8;
	}

	.header text {
		display: block;
		margin-top: 0.5rem;
		text-align: center;
		color: #7c7c7c;
	}
	.header p{
		display: block;
		margin-top: 0.5rem;
		text-align: center;
		color: #444;
	}

	.headerImg {
		padding-top: 3rem;
	}

	.headerImg img {
		width: 20vw;
		height: 20vw;
		border-radius: 50%;
		margin: 0 auto;
		display: block;
		border: 3px solid #f5f5f5;

	}

	.function {
		margin-top: 1rem;
	}

	.functionLi {
		width: 100%;
		height: 15vw;
		line-height: 15vw;
		color: #444;
		background-color: #fff;
		font-size: 1.1rem;
		
	}
	.functionLi .Limit{
		width: 90%;
		border-bottom: 1px solid #e2e2e2;
	}
	.findMe{
		width: 100%;
		height: 15vw;
		line-height: 15vw;
		color: #444;
		background-color: #fff;
		text-align: left;
		border-radius: 0px;
		border: none;
		font-size: 1.1rem;
	}
	.findMe::after{
		border: none;
	}
</style>
