import GET_BY_CATEGORY from 'remote/api/GET_BY_CATEGORY';
import GET_INDEX_ITEMS from 'remote/api/GET_INDEX_ITEMS';
import purview, { LOGIN_USER } from '../purview';

let cartStore = require('store/cart');
let store = {};
riot.observable( store );

// ============= Data =============

let cartItems = {};
let totalAmount = 0;
let totalNum = 0;

store.getCartItems = () => {
	return cartItems;
};

store.getTotalAmount = () => {
	return totalAmount;
};

store.getTotalNum = () => {
	return totalNum;
};

// ============ Actions =============

function calc(){
	totalAmount = 0;
	totalNum = 0;
	for( let k in cartItems ){
		totalAmount += cartItems[ k ].price * cartItems[ k ].num;
		totalNum += cartItems[ k ].num;
	}
}

store.on('CART_ADD', ( item ) => {
	purview( LOGIN_USER ).then(() => {
		if( typeof cartItems[ item.pid ] === 'undefined' ){
			cartItems[ item.pid ] = {
				pid: item.pid,
				image: item.image,
				num: 1,
				title: item.title,
				price: item.price
			};
		} else {
			cartItems[ item.pid ].num++;
		}

		calc();

		SJ.toast( '添加成功' ).show();

		store.trigger('$UPDATE');
	});
});

store.on('CART_ITEM_NUM_ADD', ( pid ) => {
	purview( LOGIN_USER ).then(() => {
		cartItems[ pid ] && cartItems[ pid ].num++;

		calc();

		store.trigger('$UPDATE');
	});
});

store.on('CART_ITEM_NUM_SUBTRACT', ( pid ) => {
	purview( LOGIN_USER ).then(() => {
		cartItems[ pid ].num--;
		if( cartItems[ pid ].num === 0 ){
			delete cartItems[ pid ];
		}

		calc();

		store.trigger('$UPDATE');
	});
});

store.on('CART_ITEM_NUM_ADD_BY', ( item, num ) => {
	purview( LOGIN_USER ).then(() => {
		if( typeof cartItems[ item.pid ] === 'undefined' ){
			item.num = 0;
			cartItems[ item.pid ] = item;
		}

		cartItems[ item.pid ].num = cartItems[ item.pid ].num + num;

		calc();

		// 系统类消息是全局的，暂时用命令式调用
		SJ.toast('添加成功').show();

		store.trigger('$UPDATE');
	});
});

// 使用订阅/发布($UPDATE)方式，这样一个store就可以被多个tag使用，比强制绑定tag要灵活

module.exports = store;
