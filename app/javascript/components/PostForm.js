import React, { Component } from "react";
import { browserHistory } from "react-router";

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			title: "",
			url: "",
			body: ""
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleUrlChange = this.handleUrlChange.bind(this);
		this.handleBodyChange = this.handleBodyChange.bind(this);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	handleUsernameChange(event) {
		this.setState({ username: event.target.value });
	}
	handleTitleChange(event) {
		this.setState({ title: event.target.value });
	}
	handleUrlChange(event) {
		this.setState({ url: event.target.value });
	}
	handleBodyChange(event) {
		this.setState({ body: event.target.value });
	}
	handleFormSubmit(event) {
		event.preventDefault();
		let formPayload = {
			username: this.state.username,
			title: this.state.title,
			url: this.state.url,
			body: this.state.body
		};
		this.addPost(formPayload);
	}

	addPost(submission) {
		fetch(`/api/v1/posts/`, {
			credentials: "same-origin",
			method: "POST",
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
			.then(body => browserHistory.push(`/`))
			.catch(error => console.error(`Error in fetch: ${error.message}`));
	}

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<div className="grid">
					<div className="col-12 grid">
						<label>Username:</label>
						<input
							type="text"
							name="username"
							onChange={this.handleUsernameChange}
							value={this.state.username}
						/>
						<label>Title:</label>
						<input
							type="text"
							name="title"
							onChange={this.handleTitleChange}
							value={this.state.title}
						/>
						<label>URL:</label>
						<input
							type="text"
							name="url"
							onChange={this.handleUrlChange}
							value={this.state.url}
						/>
						<label>Body:</label>
						<textarea
							name="body"
							onChange={this.handleBodyChange}
							value={this.state.body}
						/>
						<button type="submit">
							<i className="fas fa-plus" />Submit
						</button>
					</div>
				</div>
			</form>
		);
	}
}

export default PostForm;
