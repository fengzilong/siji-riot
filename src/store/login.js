import LOGIN from 'api/LOGIN';
import observable from 'riot-observable';

let store = {};
observable( store );

// ============= Data =============

let _showLogin = false;

store.getShowLogin = () => {
	return _showLogin;
};

// ============= Actions =============

store.on('SHOW', ( resolve, reject ) => {
	store.resolve = resolve;
	store.reject = reject;
	_showLogin = true;
	store.trigger('$UPDATE');
});

store.on('HIDE', () => {
	_showLogin = false;
	store.trigger('$UPDATE');
});

store.on('DO_LOGIN', async ( username, password ) => {
	let { code, message } = await LOGIN( username, password );
	switch( code ) {
		case 0:
			// 解决承诺
			store.resolve();
			break;
		case -1:
			SJ.toast('用户名不存在或密码错误').show();
			break;
	}
});

export default store;
