import {
	get,
	post
} from "./request";
const uBooksList = uni.getStorageSync('UserInfo').book_list
let BookTypeList = [{
		type: '我的',
		list: []
	},
	{
		type: '大学',
		list: []
	},
	{
		type: '出国',
		list: []
	},
	{
		type: '高中',
		list: []
	},
	{
		type: '初中',
		list: []
	},
	{
		type: '小学',
		list: []
	},
	{
		type: '实用',
		list: []
	},
	{
		type: '其它',
		list: []
	}
]

//获取系统书库列表
export function getServerBookList() {
	return new Promise((resolve) => {
		//判断本地缓存
		const booksList = uni.getStorageSync('ServerBookList')
		if (booksList) {
			resolve()

		} else {
			//发送网络请求获取词书列表信息
			get('/server/getserverbooks').then((res) => {
				console.log(res)
				//遍历请求结果，过滤用户已有的词书并分类数据
				res.data.bookList.forEach((book) => {
					if(!checkUserBook(uBooksList,book.book_name)){//判断用户是否拥有该词书
						//进行分类
						BookTypeList.forEach((category) => {
								if (book.book_type === category.type) {
									category.list.push(book)
								}
							})
					}									
				})
				//获取用户词书信息				
				BookTypeList[0].list = uBooksList

				//保存到本地
				uni.setStorageSync('ServerBookList', BookTypeList)
				console.log(BookTypeList)
				resolve()
			})
		}
	})
}

//添加词书
export function addUserBook(book_name) {
	return new Promise((resolve) => {
		console.log(uBooksList)
		
		//判断该词书是否已经存在用户词书列表里（后端也有判断的）
		if (uBooksList&&!checkUserBook(uBooksList, book_name)) {
			get('/word/addbook', {
				'book_name': book_name
			}).then((res) => {
				
				resolve(res)
			})
		} else {
			resolve(false)
		}
	})
}

//获取用户信息
export function getUserInfo() {
	return new Promise((resolve, reject) => {
		get('/home/getUserInfo').then(suc => {
			console.log(suc)
			if (suc.data.uInfo) {
				uni.setStorageSync('UserInfo', suc.data.uInfo)
				console.log("获取用户信息成功")
				resolve()
			} else {
				console.log("获取用户信息失败，请重新登录")
				reject()
			}
		})
	})
}


//判断该词书是否已经存在用户词书列表里（后端也有判断的）		
function checkUserBook(uBooksList, book_name) {
	let flag = false
	if(uBooksList){
			uBooksList.forEach((el) => {
		if(el.book_name === book_name){
			flag = true
		}			
	})
	}

	return flag
}
