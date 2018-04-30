import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      body: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }
  handleFormSubmit(event) {
    event.preventDefault();
    let post_id = this.props.post_id;
    let formPayload = {
      username: this.state.username,
      post_id: post_id,
      body: this.state.body
    };
    this.props.addComment(formPayload);
    this.setState({ username: '', body: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1>Add Comment</h1>
        <label>Username:</label>
        <input type="text" name="username" onChange={this.handleUsernameChange} value={this.state.username} />
        <label>Body:</label>
        <textarea name="body" onChange={this.handleBodyChange} value={this.state.body} />
        <button type="submit">
          <i className="fas fa-plus" />Submit
        </button>
      </form>
    );
  }
}

export default CommentForm;
