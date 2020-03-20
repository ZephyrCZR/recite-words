const request = require('./request')

//每日初始化，并且获取用户信息表
export async function netDailyInit(calendar) {	
	if(!calendar){calendar = {calendar:false}}
	const response = await request('POST','/server/init',calendar)
	return response.uInfo	
}

//打卡
export async function netClockIn() {
  const response = await request('GET','/server/clock')
	return response.uInfo	
}

//获取用户信息
export async function netGetUserInfo() {
	const response = await request('GET','/server/getuinfo')
	return response.uInfo	
}

//获取系统书库列表
export async function netGetServerBookList() {
	const response = await request('GET', '/server/getserverbooks')
	return response.bookList
}

//添加词书
export async function netAddUserBook(book_name) {
	const response = await request('GET', '/study/addbook', {book_name})
	return response.uInfo
}

//获取词书状态信息
export async function netGetBookInfo(book_id) {
	const response = await request('GET', '/study/bookinfo', {book_id})
	return response.book_info
}

//根据单词id数组获取一组单词
export async function netGetWords(wordsIdArr) {	
	const response = await request('POST', '/study/getwords', JSON.stringify(wordsIdArr))//请求体中不要放数组
	return response.wordsInfoArr
}

//上传用户数据
export async function uploadData(book_info) {
	const response = await request('POST', '/study/upload', book_info)
	return response	
}