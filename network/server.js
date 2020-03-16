const request = require('./request')

//每日初始化，并且获取用户信息表
export async function dailyInit(calendar) {	
	if(!calendar){calendar = {calendar:false}}
	const response = await request('POST','/server/init',calendar)
	return response.uInfo	
}

//打卡
export async function clockIn() {
 const response = await request('GET','/server/clock')
	return response.uInfo	
}

//获取用户信息
export async function getUserInfo() {
	const response = await request('GET','/server/getuinfo')
	if(response){
		return response.uInfo	
	}	
}
