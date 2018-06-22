const baseUrl = 'https://coreymcollins.com/wp-json/wp/v2/';

export default class Api {

	posts( options = {} ) {
		let url = `${ baseUrl }posts`;

		if ( undefined !== options.id ) {
			url += `/${ options.id }`;
		}

		url += '?_embed';

		if ( undefined !== options.category ) {
			url += `&categories=${ options.category }`;
		}

		if ( undefined !== options.tag ) {
			url += `&tags=${ options.tag }`;
		}

		return fetch( url ).then( res => res.json() );
	}

	pages( options = {} ) {
		let url = `${ baseUrl }pages`;

		if ( undefined !== options.id ) {
			url +=`/${ options.id }`;
		}

		if ( undefined !== options.slug ) {
			url +=`?slug=${ options.slug }`;
		}

		url += '?_embed';

		return fetch( url ).then( res => res.json() );
	}

	projects( options = {} ) {
		let url = `${ baseUrl }project`;

		if ( undefined !== options.id ) {
			url += `/${ options.id }`;
		}

		url += '?_embed';

		return fetch( url ).then( res => res.json() );
	}
}