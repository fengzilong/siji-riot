import GET_BY_CATEGORY from 'remote/api/GET_BY_CATEGORY';
import GET_INDEX_ITEMS from 'remote/api/GET_INDEX_ITEMS';

let cartStore = require('store/cart');
let store = {};
riot.observable( store );

// ============= Data =============

let items = [];
let loading = true;
let activeTabIndex = 0;

store.getItems = () => {
	return items;
};

store.getLoading = () => {
	return loading;
};

store.getActiveTabIndex = () => {
	return activeTabIndex;
};

// ============ Actions =============

let fetchPromise = {};

store.on('GET_BY_CATEGORY', async ( category ) => {
	loading = true;
	store.trigger('$UPDATE');

	if( typeof fetchPromise[ category ] === 'undefined' ){
		fetchPromise[ category ] = GET_BY_CATEGORY( category );
	}

	let { data } = await fetchPromise[ category ];
	items = data;
	loading = false;
	store.trigger('$UPDATE');
});

store.on('ACTIVATE_NAV_TAB', ( index ) => {
	activeTabIndex = index;
	store.trigger('$UPDATE');
});

store.on('CART_ADD', ( item ) => {
	cartStore.trigger('CART_ADD', item);
});

module.exports = store;
