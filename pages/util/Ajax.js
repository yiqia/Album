let Server_url = getApp().globalData.url; //定义公共 url
module.exports = {
	get: (option) => { //get请求封装
		return new Promise((resolve, reject) => {
			wx.request({
				url: Server_url + option.url,
				data: option.data,
				method: 'GET',

				success(res) {
					resolve(res); //请求成功 
				},
				fail(res) {
					reject(res); //请求失败 
				}
			})
		})
	},
	post: (option) => { //postt请求封装
		return new Promise((resolve, reject) => {
			wx.request({
				url: Server_url + option.url,
				data: option.data,
				method: 'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success(res) {
					resolve(res); //请求成功 
				},
				fail(res) {
					reject(res); //请求失败 
				}
			})
		})
	},
	sget: (option) => { //get请求封装
		return new Promise((resolve, reject) => {
			if (uni.getStorageSync("session")== "" || uni.getStorageSync("session")== undefined) {
				uni.showToast({
					title: "未登录",
					icon: "none"
				})
				setTimeout(function() {
					uni.navigateTo({
						url: "/pages/my/login.vue"
					})
				}, 2000)
			}
			option.data.session = uni.getStorageSync("session");
			wx.request({
				url: Server_url + option.url,
				data: option.data,
				method: 'GET',
	
				success(res) {
					resolve(res); //请求成功 
				},
				fail(res) {
					reject(res); //请求失败 
				}
			})
		})
	},
	http: (option) => { //post请求封装
		return new Promise((resolve, reject) => {
			if (uni.getStorageSync("session")== "" || uni.getStorageSync("session")== undefined) {
				uni.showToast({
					title: "未登录",
					icon: "none"
				})
				setTimeout(function() {
					uni.navigateTo({
						url: "/pages/my/login.vue"
					})
				}, 2000)
			}
			option.data.session = uni.getStorageSync("session");
			wx.request({
				url: Server_url + option.url,
				data: option.data,
				method: 'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success(res) {
					resolve(res); //请求成功 
				},
				fail(res) {
					reject(res); //请求失败 
				}
			})
		})
	},
}

/*调用案例
  1.引用Ajax 

  let Ajax = require("/pages/util/Ajax.js")//按自己所在路径引用

  2.使用

  Ajax.get({url:'',data:{}})                     //Ajax对象调用 url补全，data=数据 除开url 其它都为非必须
    .then((res)=>{//请求成功的回调函数
      console.log(res)
    }).catch((res)=>{//捕获请求失败时的回调函数
      console.log(res)
    })


    Ajax.post({ url: "", data: {} })
      .then((res) => {
        console.log(res)
      }).catch((res) => {
        console.log(res)
      })
*/
