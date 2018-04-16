import React from "react";
import { Link } from 'react-router';
import moment from "moment";
import Comment from "./Comment";

class PostShow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      post: {},
      comments: []
    };
    this.handleDownVote = this.handleDownVote.bind(this);
		this.handleUpVote = this.handleUpVote.bind(this);
		this.handleVoteChange = this.handleVoteChange.bind(this);
	}

  handleUpVote(id, votes) {
    let post_id = this.props.params.id
    let newVoteCount = votes + 1;
    let commentId = id;
    let submission = {
      id: commentId,
      post_id: post_id,
      votes: newVoteCount
    };
    this.handleVoteChange(submission);
  }

  handleDownVote(id, votes) {
    let post_id = this.props.params.id
    let newVoteCount = votes - 1;
    let commentId = id;
    let submission = {
      id: commentId,
      post_id: post_id,
      votes: newVoteCount
    };
    this.handleVoteChange(submission);
  }

  handleVoteChange(submission) {
    fetch(`/api/v1/comments/${submission.id}`, {
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
        this.setState({ comments: body.comments });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    let id = this.props.params.id
		fetch(`/api/v1/posts/${id}`, { credentials: "same-origin" })
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
					post: body.post,
          comments: body.comments
				});
			})
			.catch(error => console.error(`Error in fetch: ${error.message}`));
	}

	render() {
    let { post, comments } = this.state;

		let allComments = comments.map(comment => {
			let handleUpVoteClick = () => {
				this.handleUpVote(comment.id, comment.votes);
			};
			let handleDownVoteClick = () => {
				this.handleDownVote(comment.id, comment.votes);
			};
			return (
				<Comment
					key={comment.id}
					id={comment.id}
					username={comment.username}
					body={comment.body}
					created={moment(comment.created_at).fromNow()}
					votes={comment.votes}
					handleUpVoteClick={handleUpVoteClick}
					handleDownVoteClick={handleDownVoteClick}
				/>
			);
		});
    return (
      <div className="grid">
      <div className="col-12">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <Link to={post.url} target="_blank"><button type="submit">
          <i className="fas fa-chevron-right" />Visit link
        </button></Link>
        </div>
        {allComments}
      </div>
    )
  }
}

export default PostShow;
