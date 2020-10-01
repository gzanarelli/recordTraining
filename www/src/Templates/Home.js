import React from 'react'
import Nav from '../Components/Nav'

export default class Home extends React.Component {
  render () {
    console.log('Home')
    return (
      <div class='home'>
        <Nav />
					Home page
      </div>
    )
  }
}
