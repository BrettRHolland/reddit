import React, { Component } from "react";
import Post from "./Post";
import PostForm from "./PostForm";
import moment from "moment";

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		};
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

	render() {
		let { posts } = this.state;

		let allPosts = posts.map(post => {
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
