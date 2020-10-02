import React from 'react'
import Nav from '../Components/Nav'
import axios from 'axios'

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
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiZ3phbmFAZ21haWwuY29tIiwiX2lkIjoiNWY3MWM1MWVlOTYyNTcwMDgyYjhmNzBmIn0sImlhdCI6MTYwMTYzODE2MSwiZXhwIjoxNjAxNjQ1MzYxfQ.flR98l4XRftbT7heoccHj-Esjsi5VATC3ukc4-Oz7iI'
      }
    })
      .then(datas => {
        console.log(datas.data.notes)
        this.setState({ notes: datas.data.notes })
      })
  }

  render () {
    console.log(this.state.notes)
    return (
      <div className='home'>
        <Nav />

          Home page
      </div>
    )
  }
}
