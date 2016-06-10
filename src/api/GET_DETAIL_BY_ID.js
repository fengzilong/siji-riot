export default pid => {
	return fetch(`/api/detail/${pid}`)
		.then(response => response.json())
		.then(json => ({
			data: json
		}));
};
