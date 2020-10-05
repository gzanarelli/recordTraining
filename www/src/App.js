import React, { Component } from 'react'
import Routes from './Routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './assets/main.scss'

export default class App extends Component {
  render () {
    return (
      <div className='content'>
        <ToastContainer />
        <div className='wrapper'>
          <Routes />
        </div>
      </div>
    )
  }
}
