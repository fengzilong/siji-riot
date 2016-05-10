import GET_DETAIL_BY_ID from 'remote/api/GET_DETAIL_BY_ID';

let cartStore = require('store/cart');
let store = {};
riot.observable( store );

// ============= Data =============

let dataReady = false;
let sliderImages = [];
let title = '';
let desc = '';
let currentPrice = 0;
let originalPrice = 0;
let num = 1;
let item = null;

store.getDataReady = () => {
	return dataReady;
};

store.getSliderImages = () => {
	return sliderImages;
};

store.getTitle = () => {
	return title;
};

store.getDesc = () => {
	return desc;
};

store.getCurrentPrice = () => {
	return currentPrice;
};

store.getOriginalPrice = () => {
	return originalPrice;
};

store.getNum = () => {
	return num;
};

store.getItem = () => {
	return item;
};

// ============ Actions =============

store.on('GET_DETAIL_BY_ID', async ( pid ) => {
	var { data } = await GET_DETAIL_BY_ID( pid );

	dataReady = true;
	sliderImages = data.sliders;
	title = data.title;
	desc = data.desc;
	currentPrice = data.price;
	originalPrice = data.oprice;
	num = 1;

	item = {
		pid: pid,
		image: data.sliders[ 0 ],
		title: data.title,
		price: data.price
	};

	store.trigger('$UPDATE');
});

store.on('ADD', () => {
	num++;
	store.trigger('$UPDATE');
});

store.on('SUBTRACT', () => {
	if( num === 0 ){
		return;
	}

	num--;
	store.trigger('$UPDATE');
});

store.on('CART_ITEM_NUM_ADD_BY', () => {
	if( !item ){
		return;
	}

	cartStore.trigger( 'CART_ITEM_NUM_ADD_BY', item, num );
});

module.exports = store;
