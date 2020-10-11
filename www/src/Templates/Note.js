import React from 'react'
import axios from '../axios/axios'
import _ from 'lodash'
import { connect } from 'react-redux'
import {toast} from 'react-toastify'
import ls from 'local-storage'

import Card from '../Components/Card'
import Button from '../Components/Button'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfos: null,
      notes: []
    }
  }

  componentDidMount () {
    axios.get('note')
      .then(datas => {
        this.setState({ notes: _.get(datas, 'data.notes') })
      })
  }

  render () {
    const { notes } = this.state
    return (
      <div className='home'>
        {_.map(notes, (note, index) => {
          return (
            <Card key={index} datas={note} url='/session/' name='sessions' type='note' history={this.props.history}/>
          )
        })}
        <div className='home__item'>
          <div className='home__add'>
            <Button link='/note/add' />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Home)
