import {
	getServerBookList,
	addUserBook
} from '../../network/study.js'

import {
	setUInfo
} from '../../common/utils.js'

export async function addbook(that, book_name) {
	uni.showLoading({
		title: '添加中……',
		mask: true
	});

	const uInfo = await addUserBook(book_name)
	console.log("book.js uinfo")

	//更新用户信息
	await setUInfo(uInfo)

	// 查找书库中,对应的书并删除
	that.booksList.forEach(cate => {
		for (let i = 0; i < cate.list.length; i++) {
			const book = cate.list[i]
			if (book.book_name === book_name) {
				cate.list.splice(i, 1)
			}
		}
	})

	//重置用户词书列表						
	that.booksList[0].list = uInfo.book_list

	//更新保存书库信息到本地	
	await setSBInfo(that.booksList)

	uni.showToast({
		title: '添加成功'
	});

	uni.hideLoading();
}

//获取书库信息
export async function renderSBInfo(that) {
	that.booksList = await getSBInfo()
}



//尝试将书库信息存入本地
const setSBInfo = async function(booksList) {
	// 将书库信息存入本地,并检测是否存入成功	
	if (booksList) {
		uni.setStorageSync('ServerBookList', booksList)
	} else {
		//如果存入失败，尝试重新获取书库信息
		console.log("没有获取到书库信息表, 开始尝试从服务器获取")
		let booksList = await getServerBookList(true) //true: 从服务器获取
	}
	if (!booksList) {
		console.log('ERROR')
	}
}

//尝试获取书库信息
const getSBInfo = async function() {
	//尝试从本地获取书库信息
	let booksList = uni.getStorageSync('ServerBookList')
	if (!booksList) {
		//尝试重新获取书库信息
		console.log("没有获取到书库信息表, 开始尝试从服务器获取")
		booksList = await getServerBookList(true) //true: 从服务器获取
	}
	return booksList
}
