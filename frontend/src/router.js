import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/posts" exact component={Posts} />
      <Route path="/posts/:id" component={PostDetails} />
    </Switch>
  </Router>
);

export default AppRouter;