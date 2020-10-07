import React from 'react'
import axios from '../axios/axios'
import _ from 'lodash'
import { connect } from 'react-redux'

import Card from '../Components/Card'
import Button from '../Components/Button'

class Session extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfos: null,
      sessions: []
    }
  }

  componentDidMount () {
    axios.get(process.env.REACT_APP_BACK_URL + this.props.location.pathname)
      .then(datas => {
        console.log(datas)
        this.setState({ sessions: _.get(datas, 'data.notes.sessionId', []) })
      })
  }

  render () {
    const { sessions } = this.state
    console.log('Session: ', this.props.location.pathname)
    const noteId = this.props.location.pathname.split('/').pop()
    console.log(noteId)
    return (
      <div className='home'>
        {_.map(sessions, (session, index) => {
          return (
            <Card key={index} datas={session} url='/session/populate/' name='exercises' type='session' />
          )
        })}
        <div className='home__item'>
          <div className='home__add'>
            <Button link={'/session/add/' + noteId}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Session)
