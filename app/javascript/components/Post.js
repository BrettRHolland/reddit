import React from "react";
import PropTypes from "prop-types";

const Post = props => {
	return (
		<div className="col-12 grid post">
			<div className="col-12 post-title">
				<a href={props.url} target="_blank">
					{props.title}
				</a>
			</div>
			<div className="col-12 post-author">
				{props.created} by {props.username}
			</div>
			<div className="col-12 post-votes">
				<i className="fas fa-chevron-circle-down down-vote" />
				{props.votes}
				<i className="fas fa-chevron-circle-up up-vote" />

			</div>
		</div>
	);
};

export default Post;
