export default ( ...purview ) => {
	let purviewStr = purview.join('|');
	return new Promise(( resolve, reject ) => {
		setTimeout(() => {
			// TODO: 携带token和目标权限向服务端请求验证, resolve或reject
			resolve();
		}, 100);
	});
};
