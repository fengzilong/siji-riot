import PURVIEW_AUTH from 'api/PURVIEW_AUTH';
import cookie from 'util/cookie';
import loginStore from 'store/login';

let loginPromise = () => {
	if( cookie.get('is_login') ){
		return Promise.resolve();
	}

	return new Promise(( resolve, reject ) => {
		// 延迟加载登录
		require.ensure([], require => {
			require('page/page-login');
			riot.mount('#J_auth', 'page-login');
			loginStore.trigger( 'SHOW', resolve, reject );
		}, 'login');
	});
};

export const VISITOR = 0;
export const LOGIN_USER = 1;

export default ( ...purview ) => {
	return new Promise(( resolve, reject ) => {
		if( ~purview.indexOf( VISITOR ) ){
			resolve();
		} else {
			return loginPromise()
				.then(() => {
					return PURVIEW_AUTH( ...purview );
				})
				.then(() => {
					resolve();
				});
		}
	})
	.then(() => loginStore.trigger('HIDE'));
};
