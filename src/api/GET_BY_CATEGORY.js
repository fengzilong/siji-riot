export default category => {
	return fetch(`/api/category/${category}`)
		.then(response => response.json())
		.then(json => ({
			data: json
		}));
};
