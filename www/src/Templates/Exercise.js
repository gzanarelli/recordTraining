import React from 'react'
import axios from '../axios/axios'
import _ from 'lodash'
import { connect } from 'react-redux'

import CardExercise from '../Components/CardExercise'
import Button from '../Components/Button'

class Exercise extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfos: null,
      exercises: []
    }
  }

  componentDidMount () {
    console.log('Exercice component: ')
    console.log(this.props.location.pathname)
    axios.get(process.env.REACT_APP_BACK_URL + this.props.location.pathname)
      .then(datas => {
        console.log('Response component: ', datas)
        this.setState({ exercises: _.get(datas, 'data.sessions.exercisesId', []) })
      })
  }

  render () {
    const { exercises } = this.state
    console.log('Session: ', exercises)
    const sessionId = this.props.location.pathname.split('/').pop()
    console.log(sessionId)
    return (
      <div className='home'>
        {_.map(exercises, (exercise, index) => {
          return (
            <CardExercise key={index} datas={exercise} url='/exercise/update/' type='exercises' />
          )
        })}
        <div className='home__item'>
          <div className='home__add'>
            <Button link={'/exercise/add/' + sessionId} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Exercise)
