export default function( pid ){
	return fetch(`/api/detail/${pid}`)
		.then(response => response.json())
		.then(( json ) => {
			return {
				data: json
			};
		});
};
