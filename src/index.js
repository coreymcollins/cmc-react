import Api from './api';
import React from 'react';
import ReactDOM from 'react-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import { Post, PostList, Project, ProjectList } from './post-list';
import About from './about';
import Contact from './contact';
import Resume from './resume';
import SiteNav from './site-nav';
import CategoryPosts from './category-posts';
import TagPosts from './tag-posts';

// Import React Router requirements.
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
	return {
		opacity: styles.opacity,
		transform: `scale(${styles.scale})`,
	};
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
	return spring(val, {
		stiffness: 330,
		damping: 22,
	});
}

// child matches will...
const bounceTransition = {
	// start in a transparent, upscaled state
	atEnter: {
		opacity: 0,
		scale: 1.2,
	},
	// leave in a transparent, downscaled state
	atLeave: {
		opacity: bounce(0),
		scale: bounce(0.8),
	},
	// and rest at an opaque, normally-scaled state
	atActive: {
		opacity: bounce(1),
		scale: bounce(1),
	},
};

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div className="site">
					<header className="site-header">
						<div className="site-branding">
							<h1 className="site-title"><Link to="/">Corey M Collins</Link></h1>
						</div>
						<div className="header-actions">
							<SiteNav />
						</div>
					</header>
					<div className="site-content">
						<div className="primary content-area">
							<div className="site-main">
								<AnimatedSwitch
									atEnter={bounceTransition.atEnter}
								    atLeave={bounceTransition.atLeave}
								    atActive={bounceTransition.atActive}
								    mapStyles={mapStyles}
								    className="route-wrapper"
								>
									<Route exact path="/" component={ PostList } />
									<Route path="/post/:id" component={ Post } />
									<Route path="/category/:id" component={ CategoryPosts } />
									<Route path="/tag/:id" component={ TagPosts } />
									<Route path="/about" render={ ( props ) => ( <About { ...props } pageId="948" /> ) } />
									<Route path="/contact" render={ ( props ) => ( <Contact { ...props } pageId="112" /> ) } />
									<Route path="/resume" render={ ( props ) => ( <Resume { ...props } pageId="98" /> ) } />
									<Route path="/projects" component={ ProjectList } />
									<Route path="/project/:id" component={ Project } />
								</AnimatedSwitch>
							</div>
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

ReactDOM.render( <App />, document.getElementById( 'app' ) );