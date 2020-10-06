import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import _ from 'lodash'
import ls from 'local-storage'
import Login from './Templates/Login'
import Home from './Templates/Home'
import Session from './Templates/Session'
import AddForm from './Templates/AddForm'
import Nav from './Components/Nav'

const Token = ({ component: Component, ...remainder }) => {
  const token = ls('token')
  return (
    <Route
      {...remainder}
      render={(props) => token
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

const AnimatedSwitch = withRouter(({ location }) => {
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={5000}
        classNames='page'
      >
        <Switch location={location}>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <Login />
          </Route>
          <Token exact path='/' component={Home} />
          <Token exact path='/note/add' component={AddForm} />
          <Token exact path='/note/populate/:noteId' component={Session} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
})

class Routes extends React.Component {
  render () {
    console.log('Props route: ', this.props.user)
    return (
      <Router>
        <Nav />
        <AnimatedSwitch />
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Routes)
