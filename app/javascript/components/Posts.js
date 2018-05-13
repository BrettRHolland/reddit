import React, { Component } from 'react';
import Post from './Post';
import PostForm from './PostForm';
import moment from 'moment';
import { browserHistory } from 'react-router';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPage: 1,
      postsPerPage: 10
    };
    this.handleDownVote = this.handleDownVote.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleVoteChange = this.handleVoteChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/v1/posts', { credentials: 'same-origin' })
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
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(submission),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
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

  handlePageClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    let { posts, currentPage, postsPerPage } = this.state;
    let activeClass;

    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    let allPosts = currentPosts.map((post, index) => {
      let handleUpVoteClick = () => {
        this.handleUpVote(post.id, post.votes);
      };
      let handleDownVoteClick = () => {
        this.handleDownVote(post.id, post.votes);
      };
      return (
        <Post
          key={index}
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

    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    let renderPageNumbers = pageNumbers.map(number => {
      if (number == currentPage) {
        activeClass = 'active';
      }
      return (
        <li key={number} id={number} onClick={this.handlePageClick} class={activeClass}>
          {number}
        </li>
      );
      let activeClass = '';
    });

    return (
      <div className="grid">
        <div className="col-12 grid">{allPosts}</div>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Posts;
