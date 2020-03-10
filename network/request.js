let TOKEN = uni.getStorageSync('TOKEN')
if(!TOKEN) TOKEN = '0'
const baseURL = 'http://127.0.0.1:5230/zrizc'

const post = function(path, body) {	
	return new Promise((resolve, reject) => {
		console.log(baseURL + path)
		uni.request({
			method: 'POST',
			url: baseURL + path,
			data: body,
			header: {
				'Authorization': TOKEN,
			},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
const get = function(path, body) {	
	return new Promise((resolve, reject) => {
		console.log(baseURL + path)
		uni.request({
			method: 'GET',
			url: baseURL + path,
			data: body,
			header: {
				'Authorization': TOKEN,
			},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}

module.exports = {post,get}
