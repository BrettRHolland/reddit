import React from "react";
import { Link } from "react-router";

const Comment = props => {
	return (
		<div className="col-12 grid comment">
			<div className="col-12 comment-body">
				{props.body}
			</div>
			<div className="col-12 comment-author">
				Posted {props.created} by {props.username}
			</div>
			<div className="col-12 comment-votes">
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

export default Comment;
