module.exports = {
	get: ( key ) => {
		var result = null;

		return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? result[1] : null;
	},
	set: ( key, value, options ) => {
		var days, time;
		options = options || {};

		if (typeof options.expires === 'number') {
			days = (options.expires * 24 * 60 * 60 * 1000)
			time = options.expires = new Date()

			time.setTime(time.getTime() + days)
		}

		value = String(value);

		return (document.cookie = [
			encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
			options.expires ? '; expires=' + options.expires.toUTCString() : '',
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join(''));
	}
}
