import React from 'react'
import Nav from '../Components/Nav'
import Card from '../Components/Card'
import axios from 'axios'
import _ from 'lodash'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfos: null,
      notes: []
    }
  }

  async componentDidMount () {
    console.log(process.env.REACT_APP_BACK_URL)
    axios.get(`${process.env.REACT_APP_BACK_URL}/note`, {
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiZ3phbmFAZ21haWwuY29tIiwiX2lkIjoiNWY3MWM1MWVlOTYyNTcwMDgyYjhmNzBmIn0sImlhdCI6MTYwMTY0NjIyOSwiZXhwIjoxNjAxNjUzNDI5fQ.Skl7XQ1SX9h90yAJI1f_TTfRvAjjp6mWdtbBDhzjUOc'
      }
    })
      .then(datas => {
        console.log(datas.data.notes)
        this.setState({ notes: datas.data.notes })
      })
  }

  render () {
    const { notes } = this.state
    console.log(this.state.notes)
    return (
      <div className='home'>
        <Nav />
        {_.map(notes, note => {
          console.log(note)
          return (
            <Card key={_.get(note, '_id')} datas={note} />
          )
        })}
          Home page
      </div>
    )
  }
}
