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
    axios.get('note/' + this.props.match.params.noteId + '?populate=sessionId')
      .then(datas => {
        this.setState({ sessions: _.get(datas, 'data.sessionId', []) })
      })
  }

  render () {
    const { sessions } = this.state
    const noteId = this.props.location.pathname.split('/').pop()
    return (
      <div className='home'>
        {_.map(sessions, (session, index) => {
          return (
            <Card key={index} datas={session} url='/exercise/' name='exercises' type='session' />
          )
        })}
        <div className='home__item'>
          <div className='home__add'>
            <Button link={'/session/add/' + noteId} />
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
