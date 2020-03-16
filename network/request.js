const baseURL = 'http://192.168.0.105:5230/zrizc'

module.exports = function(method, path, body) {
	let TOKEN = uni.getStorageSync('TOKEN')

	if (!TOKEN) {
		console.log("未检测到Token，请重新登录")
		uni.redirectTo({
			url: '/pages/login/login/login.vue'
		})
		return
	}

	return new Promise((resolve, reject) => {
		console.log(baseURL + path)
		uni.request({
			method: method,
			url: baseURL + path,
			data: body,
			header: {
				'Authorization': TOKEN,
			},
			success: (response) => {
				if (response.data.err_code === 0) {//判断数据是否成功返回
					resolve(response.data)
				}
				reject('ERROR')
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
