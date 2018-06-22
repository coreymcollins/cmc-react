import React from 'react';
import { Link } from 'react-router-dom';
import Api from './api';

class Post extends React.Component {

	constructor() {
		super();

		// Store posts in the state.
		this.state = {
			title: '',
			content: '',
			author: '',
		};
	}

	componentWillMount() {
		let api = new Api();

		api.posts({
			id: this.props.match.params.id
		}).then( data => {
			this.setState({
				title: data.title.rendered,
				content: data.content.rendered,
				author: data._embedded.author[0].name
			});
		});
	}

	componentDidUpdate() {
		let bodyContainer = document.querySelector( 'body' ),
			post = this.state;

		bodyContainer.className = `single-post post-${ post.title.split( ' ' ).join( '-' ).toLowerCase() }`;
	}

	componentWillUnmount() {
		let bodyContainer = document.querySelector( 'body' );

		bodyContainer.classList.remove( `page-${ this.state.title.split( ' ' ).join( '-' ).toLowerCase() }` );
	}

	render() {

		let post = this.state;

		return (
			<article className="hentry article">
				<header className="entry-header">
					<h2>{ post.title }</h2>
				</header>

				<div className="entry-content" dangerouslySetInnerHTML={ { __html: post.content } } />
			</article>
		);
	}
}

class PostList extends React.Component {

	constructor() {
		super();

		// Store posts in the state.
		this.state = {
			posts: [],
		};
	}

	componentWillMount() {
		let api = new Api();

		api.posts().then( data => {
			this.setState({
				posts: data
			});
		});
	}

	componentDidUpdate() {
		let bodyContainer = document.querySelector( 'body' ),
			page = this.state;

		bodyContainer.className = 'home blog';
	}

	componentWillUnmount() {
		let bodyContainer = document.querySelector( 'body' );

		bodyContainer.classList.remove( 'home', 'blog' );
	}

	render() {
		let posts = this.state.posts.map( ( post, index ) =>
			<article className="article hentry" key={ index }>
				<header className="entry-header">
					<h2 className="entry-title">
						<Link to={ `/post/${ post.id }` }>
							{ post.title.rendered }
						</Link>
					</h2>
					<div className="entry-meta">
			            <span className="posted-on">
							Posted on { new Date( post.date ).toDateString() }
						</span>
					</div>
				</header>

				<div className="entry-content" dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } />

				<footer className="entry-footer">
					<span className="cat-links">
						Posted in:
						<ul>
							{
								post._embedded['wp:term'][0] ? post._embedded['wp:term'][0].map( ( term, index ) => {
									if ( term.id ) {
										return (
											<li key={ index }>
												<Link to={ `/category/${ term.id }` }>{ term.name }</Link>
											</li>
										);
									}
								}) : null
							}
						</ul>
					</span>

					<span className="tags-links">
						Tagged:
						<ul>
							{
								post._embedded['wp:term'][1] ? post._embedded['wp:term'][1].map( ( term, index ) => {
									if ( term.id ) {
										return (
											<li key={ index }>
												<Link to={ `/tag/${ term.id }` }>{ term.name }</Link>
											</li>
										);
									}
								}) : null
							}
						</ul>
					</span>
				</footer>
			</article>
		);

		return (
			<div className="posts">
				{ posts }
			</div>
		);
	}
}

class Project extends React.Component {

	constructor() {
		super();

		// Store posts in the state.
		this.state = {
			title: '',
			content: '',
			image: [],
		};
	}

	componentWillMount() {
		let api = new Api();

		api.projects({
			id: this.props.match.params.id
		}).then( data => {
			this.setState({
				title: data.title.rendered,
				content: data.content.rendered,
				image: data._embedded['wp:featuredmedia'][0],
			});
		});
	}

	componentDidUpdate() {
		let bodyContainer = document.querySelector( 'body' ),
			post = this.state;

		bodyContainer.className = `project project-${ post.title.split( ' ' ).join( '-' ).toLowerCase() }`;
	}

	componentWillUnmount() {
		let bodyContainer = document.querySelector( 'body' );

		bodyContainer.classList.remove( 'project', `project-${ this.state.title.split( ' ' ).join( '-' ).toLowerCase() }` );
	}

	render() {
		let post = this.state;

		return (
			<article className="hentry article">
				<header className="entry-header">
					{
						post.image.source_url ? (
							<img className="aligncenter" src={ post.image.source_url } />
						) : (
							null
						)
					}

					<h2 className="screen-reader-text">{ post.title }</h2>
				</header>

				<div className="entry-content" dangerouslySetInnerHTML={ { __html: post.content } } />
			</article>
		);
	}
}

class ProjectList extends React.Component {

	constructor() {
		super();

		// Store posts in the state.
		this.state = {
			posts: [],
		};
	}

	componentWillMount() {
		let api = new Api();

		api.projects().then( data => {
			this.setState({
				posts: data
			});
		});
	}

	componentDidUpdate() {
		let bodyContainer = document.querySelector( 'body' );

		bodyContainer.className = 'archive post-type-archive post-type-archive-project';
	}

	componentWillUnmount() {
		let bodyContainer = document.querySelector( 'body' );

		bodyContainer.classList.remove( 'archive', 'post-type-archive', 'post-type-archive-project' );
	}

	render() {
		let posts = this.state.posts.map( ( post, index ) =>
			<article className="hentry article" key={ index }>
				<Link to={ `/project/${ post.id }` }>
					{
						post._embedded['wp:featuredmedia'][0].media_details.sizes.project ? (
							<img src={ post._embedded['wp:featuredmedia'][0].media_details.sizes.project.source_url } />
						) : (
							<img src={ post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url } />
						)
					}

					<h2 className="screen-reader-text">
						{ post.title.rendered }
					</h2>
				</Link>
			</article>
		);

		return (
			<div className="posts-container">
				{ posts }
			</div>
		);
	}
}

export { Post, PostList, Project, ProjectList };