import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'

import Login from './Templates/Login'
import Home from './Templates/Home'

class Routes extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default connect()(Routes)
