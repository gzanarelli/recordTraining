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

const Token = ({ component: Component, action, ...remainder }) => {
  const token = ls.get('token')
  return (
    <Route
      {...remainder}
      render={(props) => token !== 'undefined' && token
        ? <Component {...props} action={action} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

const AnimatedSwitch = ({ props }) => {
  console.log('props: ', props)
  return (
    // <TransitionGroup>
    //   <CSSTransition
    //     key={location.key}
    //     timeout={1000}
    //     classNames='page'
    //   >
    // <div>
  // <Redirect from='/' to='/login' />
    <Switch>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/signup'>
        <Login />
      </Route>
      <Token exact path='/note' component={Note} />
      <Token exact path='/note/add' component={NoteForm} action='post' />
      <Token exact path='/note/edit/:noteId' component={NoteForm} action='put' />
      <Token exact path='/session/:noteId' component={Session} />
      <Token exact path='/session/add/:noteId' component={SessionForm} action='post' />
      <Token exact path='/session/edit/:sessionId' component={ExerciseForm} action='put' />
      <Token exact path='/exercise/:sessionId' component={Exercise} />
    </Switch>
    // </div>
    //   </CSSTransition>
    // </TransitionGroup>
  )
}

class Routes extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    console.log('Route ', this)
    return (
      <Router>
        <Nav />
        <AnimatedSwitch {...this.props} />
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Routes)
