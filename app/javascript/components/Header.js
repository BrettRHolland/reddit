import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

const Header = props => {
	return (
		<div className="container">
			<header>
				<div className="grid">
					<div className="col-6">
						<Link to={`/`}><i className="fab fa-reddit logo" /></Link>
					</div>
					<div className="col-6 new-post">
						<Link to={`/posts/new`}>
							<button>
								<i className="fas fa-plus" />New Post
							</button>
						</Link>
					</div>
				</div>
			</header>
			{props.children}
		</div>
	);
};

export default Header;
