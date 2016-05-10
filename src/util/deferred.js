module.exports = () => {
	var deferred = {};
	deferred.promise = new Promise(( resolve, reject ) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});
	return deferred;
}
