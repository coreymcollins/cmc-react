import React from 'react';
import Api from './api';

export default class Resume extends React.Component {

	constructor() {
		super();

		// Store posts in the state.
		this.state = {
			title: '',
			content: '',
		};
	}

	componentWillMount() {
		let api = new Api();

		api.pages({
			id: this.props.pageId
		}).then( data => {
			this.setState({
				title: data.title.rendered,
				content: data.content.rendered,
			});
		});
	}

	componentDidUpdate() {
		let bodyContainer = document.querySelector( 'body' ),
			page = this.state;

		bodyContainer.className = `page page-${ page.title.split( ' ' ).join( '-' ).toLowerCase() }`;
	}

	componentWillUnmount() {
		let bodyContainer = document.querySelector( 'body' );

		bodyContainer.classList.remove( `page-${ this.state.title.split( ' ' ).join( '-' ).toLowerCase() }` );
	}

	render() {
		let page = this.state;

		return (
			<div className="row">
				<h2>{ page.title }</h2>
				<div dangerouslySetInnerHTML={ { __html: page.content } } />
			</div>
		);
	}
}