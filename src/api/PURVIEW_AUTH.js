export default ( ...purview ) => {
	let purviewStr = purview.join('|');
	return new Promise(( resolve, reject ) => {
		setTimeout(() => {
			resolve();
		}, 100);
	});
};
