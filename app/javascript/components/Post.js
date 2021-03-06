import React from "react";
import { Link } from "react-router";

const Post = props => {
	return (
		<div className="col-12 grid post">
			<div className="col-12 post-title">
				<Link to={`/posts/${props.id}`}>{props.title}</Link>
			</div>
			<div className="col-12 post-author">
				Posted {props.created} by {props.username}
			</div>
			<div className="col-12 post-votes">
				<i
					className="fas fa-chevron-circle-down down-vote"
					onClick={props.handleDownVoteClick}
				/>
				{props.votes}
				<i
					className="fas fa-chevron-circle-up up-vote"
					onClick={props.handleUpVoteClick}
				/>
			</div>
		</div>
	);
};

export default Post;
