import React, { Component } from 'react'
import Routes from './Routes'
import './assets/main.scss'

export default class App extends Component {
  render () {
    return (
      <div class='content'>
        <div class='wrapper'>
          <Routes />
        </div>
      </div>
    )
  }
}