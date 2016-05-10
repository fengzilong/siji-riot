let cookie = require('util/cookie');

export default ( username, password ) => {
	return new Promise(( resolve, reject ) => {
		setTimeout(() => {
			if( username === 'demo' && password === 'demo' ){
				// 写入认证信息到cookie
				cookie.set('username', 'demo');
				cookie.set('is_login', 1);
				resolve({
					code: 0,
					message: '登录成功'
				});
			} else {
				resolve({
					code: -1,
					message: '认证失败'
				});
			}
		}, 100);
	});
};
