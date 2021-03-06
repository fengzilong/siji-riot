import purview, { VISITOR, LOGIN_USER } from './purview';
import registerRoute from 'riot-route';

registerRoute('/', () => {
	require.ensure([], ( require ) => {
		require('page/page-home');
		purview( VISITOR ).then(() => {
			SJ.handleRoute({
				name: 'home',
				url: location.href,
				el: '#J_main',
				target: '#J_home',
				component: 'page-home',
				title: '四季',
			});
		});
	}, 'home');
});

registerRoute('/category/*', ( category ) => {
	require.ensure([], ( require ) => {
		require('page/page-category');
		purview( VISITOR ).then(() => {
			SJ.handleRoute({
				name: 'category',
				url: location.href,
				el: '#J_main',
				target: '#J_category',
				once: false,
				title: '分类',
				component: 'page-category',
				data: {
					category: category
				},
			});
		});
	}, 'category');
});

registerRoute('/detail/*', function( pid ){
	require.ensure([], function( require ){
		require('page/page-detail');
		purview( VISITOR ).then(() => {
			SJ.handleRoute({
				name: 'detail',
				url: location.href,
				el: '#J_detail',
				target: '#J_detail',
				once: false,
				title: '详情',
				component: 'page-detail',
				data: {
					pid: pid
				}
			});
		});
	}, 'detail');
});

registerRoute('/profile', () => {
	require.ensure([], ( require ) => {
		require('page/page-profile');
		purview( VISITOR ).then(() => {
			SJ.handleRoute({
				name: 'profile',
				url: location.href,
				el: '#J_main',
				target: '#J_profile',
				title: '我的',
				component: 'page-profile',
				data: {}
			});
		});
	}, 'profile');
});

registerRoute('/cart', () => {
	require.ensure([], ( require ) => {
		require('page/page-cart');
		purview( LOGIN_USER ).then(() => {
			SJ.handleRoute({
				name: 'cart',
				url: location.href,
				el: '#J_main',
				target: '#J_cart',
				title: '购物篮',
				component: 'page-cart',
				data: {}
			});
		});
	}, 'cart');
});

registerRoute.base( '#!' );
registerRoute.start( true );
