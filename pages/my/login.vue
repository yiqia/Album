<template>
	<view id="all" style="background-color: #fff  ;">
		<view class="allLimit">
			<view class="header">
				<view class="headerBox">
					<image src="/static/index.png" mode=""></image>
				</view>
			</view>
			<view class="content">					
				<text class="contentTitle">{{isLogin?'Sign In':'Sign Up'}}</text>				
				<input type="text" name="user" v-model="username" placeholder="Name" />
				<!-- <input type="text" name="emial" value="" placeholder="Email" v-if="!isLogin"/> -->
				<input type="password" name="pass" v-model="password" placeholder="Passowrd" />
				<!-- <input type="password" name="okpass" value="" placeholder="Confirm Password" v-if="!isLogin"/> -->
				<!-- <text class="loginText" @click="isLogin?goRegister():goLogin()">{{isLogin?"没有账号点我注册":"已有账号点我登录"}}</text> -->
			</view>
			<view class="bottom">
				<button @click="sendLogin">{{isLogin?'Sign In':'Sign Up'}}</button>
			</view>
		</view>
	</view>

</template>

<script>
	let Ajax = require("../util/Ajax.js")
	export default {
		data() {
			return {
				isLogin:true
			}
		},
		methods:{
			goLogin:function(){
				this.isLogin=true;
			},
			goRegister:function(){
				this.isLogin=false;
			},
			sendLogin:function(e){
				var data={
					user:this.username,
					pass:this.password
				};
				var url ="";
				var that = this;
				if(data.user=="" || data.user==undefined){
					uni.showToast({
						title:'用户名不能为空',
						icon:"none"
					})
					return 0;
				}else if(data['user'].length<2 || data['user'].length>=30){
					uni.showTabBar({
						title:"用户名长度再2-30之间",
						icon:'none'
					})
					return 0;
				}
				Ajax.get({url:'user/login',data:data})
				  .then((res)=>{//请求成功的回调函数
					if(res.data.code==1024){
						uni.showToast({
							title:"登录成功"
						})
						uni.setStorageSync("session",res.data.session);
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else{
						uni.showToast({
							title:"登录失败",
							icon:"none"
						})
					}
					uni.hideLoading();
				  }).catch((res)=>{//捕获请求失败时的回调函数
				    console.log(res)
				  })
			},
			sendRegister:function(){
				
			}
		},
		onLoad(e) {
			this.isLogin=e.isLogin;
			
		}
		}
</script>

<style>
	.allLimit{
		width: 75%;
		margin: 0 auto;
	}
	.header {
		width: 100%;
		height: 50vw;
		background-color: #fff;
		display: flex;
		justify-content: center;

	}

	.headerBox {
		width: 30vw;
		height: 30vw;
		box-shadow: 5px 5px 28px 11px rgba(200, 200, 200, 0.2);
		margin-top: 5vw;
		border-radius: 4vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.headerBox image {
		width: 15vw;
		height: 15vw;
	}

	.content {
		width: 100%;

	}

	.contentTitle{
		font-size: 7vw;
		font-weight: bold;
	}
	.loginText{
		display: block;
		text-align: center;
		color: #9f9f9f;
	}
	.content input{
		width: 90%;
		height: 15vw;
		background-color: #f7f7f7;
		margin: 5vw 0;
		padding-left: 10vw;
		border-radius: 7.5vw;
	}
	.bottom{
		width: 100%;
		height: 35vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bottom button{
		margin: 0 auto;
		width: 70%;
		height: 15vw;
		background-color:#fbbd08;
		border-radius: 7.5vw;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-weight: bold;
		box-shadow:9px 5px 28px 3px rgba(255, 190, 0, 0.46);
	}
</style>
