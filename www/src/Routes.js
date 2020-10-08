import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import _ from 'lodash'
import ls from 'local-storage'
import Login from './Templates/Login'
import Note from './Templates/Note'
import Session from './Templates/Session'
import NoteForm from './Templates/NoteForm'
import SessionForm from './Templates/SessionForm'
import Nav from './Components/Nav'
import ExerciseForm from './Templates/ExerciseForm'
import Exercise from './Templates/Exercise'

const Token = ({ component: Component, ...remainder }) => {
  const token = ls.get('token')
  return (
    <Route
      {...remainder}
      render={(props) => token !== 'undefined' && token
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

const AnimatedSwitch = withRouter(({ location, datas }) => {
  return (
    // <TransitionGroup>
    //   <CSSTransition
    //     key={location.key}
    //     timeout={1000}
    //     classNames='page'
    //   >
    <Switch location={location}>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/signup'>
        <Login />
      </Route>
      <Token exact path='/note' component={Note} />
      <Token exact path='/note/add' component={NoteForm} />
      <Token exact path='/session/add/:noteId' component={SessionForm} />
      <Token exact path='/session/:noteId' component={Session} />
      <Token exact path='/exercise/add/:sessionId' component={ExerciseForm} />
      <Token exact path='/exercise/:sessionId' component={Exercise} />
    </Switch>
    //   </CSSTransition>
    // </TransitionGroup>
  )
})

class Routes extends React.Component {
  render () {
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
