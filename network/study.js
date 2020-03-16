const request = require('./request')


let BookType = [{
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
export async function getServerBookList(net = false) {
	if (!net) {
		//判断本地缓存
		const ServerBookList = uni.getStorageSync('ServerBookList')
		if (ServerBookList) { //如果系统图书列表存在本地缓存，return
			return
		}
	}

	//获取用户图书列表信息
	const uBooksList = uni.getStorageSync('UserInfo').book_list
	//发送网络请求获取词书列表信息
	const response = await request('GET', '/server/getserverbooks')

	//遍历请求结果，过滤用户已有的词书并分类数据
	response.bookList.forEach((book) => {
		if (!checkUserBook(uBooksList, book.book_name)) { //判断用户是否拥有该词书
			//进行分类
			BookType.forEach((category) => {
				if (book.book_type === category.type) {
					category.list.push(book)
				}
			})
		}
	})

	//获取用户词书信息				
	BookType[0].list = uBooksList ? uBooksList : []

	//保存到本地
	uni.setStorageSync('ServerBookList', BookType)
	console.log(BookType)
	return BookType
}

//添加词书
export async function addUserBook(book_name) {
	//获取用户图书列表信息
	const uBooksList = uni.getStorageSync('UserInfo').book_list

	//判断该词书是否已经存在用户词书列表里（后端也有判断的）
	if (uBooksList && checkUserBook(uBooksList, book_name)) {
		return false
	}

	const response = await request('GET', '/study/addbook', {
		'book_name': book_name
	})

	return response.uInfo
}

//获取词书状态信息
export async function getBookInfo(book_id) {
	const response = await request('GET', '/study/bookinfo', {
		book_id
	})

	return response.book_info
}

//判断该词书是否已经存在用户词书列表里（后端也有判断的）		
const checkUserBook = function(List, book_name) {
	let flag = false
	if (List) {
		List.forEach((el) => {
			if (el.book_name === book_name) {
				flag = true
			}
		})
	}
	return flag
}
