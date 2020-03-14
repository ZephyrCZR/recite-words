import {
	ADD_COUNTER,
	SUB_COUNTER,
	ADD_NEW_PRODUCT,
	REMOVE_PRODUCT,
	CHANGE_STATE,
	CHANGE_ALL_STATE
} from "./mutation-types"


export default {
	//添加到购物车
	addCart(context, payload) {
		return new Promise((resolve, reject) => {
			//1.查找数组中是否存在此商品
			let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

			//2.判断oldProduct是否取到值
			if (oldProduct) {
				context.commit(ADD_COUNTER, oldProduct)
				resolve('当前商品数量+1')
			} else {
				context.commit(ADD_NEW_PRODUCT, payload)
				resolve('添加了新的商品')
			}
		})
	},




}
