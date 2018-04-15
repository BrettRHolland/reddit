import React from "react";
import PropTypes from "prop-types";
import { Router, browserHistory, Route, IndexRoute } from "react-router";
import Header from "./Header";
import Posts from "./Posts";
import PostForm from "./PostForm";
import PostShow from "./PostShow";

const App = props => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={Header}>
				<IndexRoute component={Posts} />
        <Route path='/posts/new' component={PostForm} />
        <Route path="/posts/:id" component={PostShow} />
			</Route>
		</Router>
	);
};

export default App;
