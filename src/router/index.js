import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import React, { Component } from 'react';
import asyncComponent from './async-component'

import App from '../pages/home/App';
const NewsList = asyncComponent(() => import('../pages/newslist/NewsList'))
const Mine = asyncComponent(() => import('../pages/mine'))
const OrderForm = asyncComponent(() => import('../pages/OrderForm'))
const CourseList = asyncComponent(() => import('../pages/CourseList'))
const BallPosition = asyncComponent(() => import('../pages/BallPosition'))
const MyQrCode = asyncComponent(() => import('../pages/MyQrCode'))

class Router extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/newslist" component={NewsList} />
            <Route path="/order_list/:type" component={OrderForm} />
            <Route path="/course_list/:date/:type" component={CourseList} />
            <Route path="/ball_position/:course_id/:date/:price_id" component={BallPosition} />
            <Route path="/mine" component={Mine} />
            <Route path="/myqr" component={MyQrCode} />
            <Redirect to='/' />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default Router;