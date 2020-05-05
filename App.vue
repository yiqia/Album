<script>
	/*一奇开源QQ330729121*/
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			url: 'http://192.168.1.12:10001/'
			//url: 'http://43.251.101.219:10001/'
		}
	}
</script>

<style>
	/*每个页面公共css */
	.Limit{
		width: 95%;
		height: 100%;
		margin: 0 auto;
	}
</style>
