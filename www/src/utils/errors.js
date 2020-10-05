import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserActions from '../Redux/actions/user'
import _ from 'lodash'

function errors(error) {
  localStorage.removeItem('persist:record_redux')
	console.log(localStorage)
	if (_.get(error, 'response.status') === 401) {
    console.log('401')
  } else if (_.get(error, 'response.status') < 500) {
    console.log('other error')
  } else {
    localStorage.removeItem('token')
  }
	return null
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserActions, dispatch)
})

export default errors