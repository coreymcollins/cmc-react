import React from 'react';
import Api from './api';
import { Link } from 'react-router-dom';

export default class SiteNav extends React.Component {

	componentWillUnmount() {
		let bodyContainer = document.querySelector( 'body' );

		bodyContainer.classList.remove( 'page', 'page-resume' );
	}

	render() {
		let bodyContainer = document.querySelector( 'body' );

		bodyContainer.className = 'page page-resume';

		return (
			<nav className="main-navigation">
				<div className="menu-primary-menu-container">
					<ul className="menu dropdown">
						<li className="active">
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/projects">Projects</Link>
						</li>
						<li>
							<Link to="/resume">Resume</Link>
						</li>
						<li>
							<Link to="/contact">Contact</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}