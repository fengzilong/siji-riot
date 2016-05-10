export default function( category ){
	return fetch(`/api/category/${category}`)
		.then(response => response.json())
		.then(json => {
			return {
				data: json
			};
		});
};
