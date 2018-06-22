import React from 'react';
import { PostList } from './post-list';
import Api from './api';

export default class TagPosts extends PostList {

	constructor() {
		super();

		// Store posts in the state.
		this.state = {
			posts: [],
		};
	}

	fetchData( tagId ) {
		let api = new Api();

		api.posts({
			tag: tagId
		}).then( data => {
			this.setState({
				posts: data
			});
		});
	}

	componentWillReceiveProps( newProps ) {
		this.fetchData( newProps.match.params.id );
	}

	componentDidMount() {
		this.fetchData( this.props.match.params.id );
	}

	componentDidUpdate() {
		let bodyContainer = document.querySelector( 'body' );

		bodyContainer.className = `tag tag-${ this.props.match.params.id }`;
	}

	componentWillUnmount() {
		let bodyContainer = document.querySelector( 'body' );

		bodyContainer.classList.remove( 'tag', `tag-${ this.props.match.params.id }` );
	}
}