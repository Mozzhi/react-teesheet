import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import React, { Component } from 'react';
import asyncComponent from './async-component'

import App from '../pages/home/App';
const NewsList = asyncComponent(() => import('../pages/newslist/NewsList'))
const Mine = asyncComponent(() => import('../pages/mine'))

class Router extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/newslist" component={NewsList} />
            <Route path="/mine" component={Mine} />
            <Redirect to='/' />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default Router;