import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import { connect } from 'react-redux'

import Nav from '../Components/Nav'
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
    axios.get(`${process.env.REACT_APP_BACK_URL}/note`, {
      headers: {
        token: this.props.user.token
      }
    })
      .then(datas => {
        this.setState({ notes: datas.data.notes })
      })
  }

  render () {
    const { notes } = this.state
    return (
      <div className='home'>
        {_.map(notes, note => {
          return (
            <Card key={_.get(note, '_id')} datas={note} />
          )
        })}
        <div className="home__item">
          <div className="home__add">
            <Button />
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