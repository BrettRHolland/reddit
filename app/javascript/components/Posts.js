import React, { Component } from "react";
import Post from "./Post";
import PostForm from "./PostForm";
import moment from "moment";
import { browserHistory } from "react-router";

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		};
		this.handleDownVote = this.handleDownVote.bind(this);
		this.handleUpVote = this.handleUpVote.bind(this);
		this.handleVoteChange = this.handleVoteChange.bind(this);
	}

	componentDidMount() {
		fetch("/api/v1/posts", { credentials: "same-origin" })
			.then(response => {
				if (response.ok) {
					return response;
				} else {
					let errorMessage = `${response.status} (${response.statusText})`,
						error = new Error(errorMessage);
					throw error;
				}
			})
			.then(response => response.json())
			.then(body => {
				this.setState({
					posts: body.posts
				});
			})
			.catch(error => console.error(`Error in fetch: ${error.message}`));
	}

	handleUpVote(id, votes) {
		let newVoteCount = votes + 1;
		let postId = id;
		let submission = {
			id: postId,
			votes: newVoteCount
		};
		this.handleVoteChange(submission);
	}

	handleDownVote(id, votes) {
		let newVoteCount = votes - 1;
		let postId = id;
		let submission = {
			id: postId,
			votes: newVoteCount
		};
		this.handleVoteChange(submission);
	}

	handleVoteChange(submission) {
		fetch(`/api/v1/posts/${submission.id}`, {
			credentials: "same-origin",
			method: "PATCH",
			body: JSON.stringify(submission),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			}
		})
			.then(response => {
				if (response.ok) {
					return response;
				} else {
					let errorMessage = `${response.status} (${response.statusText})`,
						error = new Error(errorMessage);
					throw error;
				}
			})
			.then(response => response.json())
			.then(body => {
				this.setState({ posts: body.posts });
			})
			.catch(error => console.error(`Error in fetch: ${error.message}`));
	}

	render() {
		let { posts } = this.state;

		let allPosts = posts.map(post => {
			let handleUpVoteClick = () => {
				this.handleUpVote(post.id, post.votes);
			};
			let handleDownVoteClick = () => {
				this.handleDownVote(post.id, post.votes);
			};
			return (
				<Post
					key={post.id}
					id={post.id}
					username={post.username}
					title={post.title}
					url={post.url}
					body={post.body}
					created={moment(post.created_at).fromNow()}
					votes={post.votes}
					handleUpVoteClick={handleUpVoteClick}
					handleDownVoteClick={handleDownVoteClick}
				/>
			);
		});
		return (
			<div className="grid">
				<div className="col-12 grid">{allPosts}</div>
			</div>
		);
	}
}

export default Posts;
