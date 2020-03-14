//正则匹配，type：phone，password 
export function expTest(type, string) {
	console.log(type)
	let exp = new RegExp()
	if (type == 'phone') {
		exp = new RegExp("^1(3|4|5|7|8)\\d{9}$");
	}
	if (type == 'password') {
		exp = new RegExp("^[a-zA-Z]\\w{5,17}$");
	}
	return exp.test(string)
}

//格式化时间戳
export function dateFormat(time) {
	let date = new Date(time)
	let arr = []
	arr.push(date.getFullYear())
	arr.push(date.getMonth() + 1)
	arr.push(date.getDate())
	return arr.join('-')
}


