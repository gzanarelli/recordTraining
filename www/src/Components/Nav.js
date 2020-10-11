import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import ls from 'local-storage'
import {toast} from 'react-toastify'

import Logout from './Logout'

const Nav = withRouter(({ location, history, state }) => {
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return ''
  }

  const message = ls('successMessage')
  if (message) {
    console.log(message)
    toast.success(message)
    ls.remove('successMessage')
  }


  return (
    <div className='nav'>

      <div className='nav__bloc'>
        <div className='nav__logout'>
          <Logout />
        </div>
      </div>

      <div className='nav__bloc'>
        <button onClick={() => history.goBack()} className='nav__go-back btn btn--dark'>
          <i className='fas fa-arrow-left nav__go-back__link' />
        </button>
      </div>

    </div>
  )
})

export default Nav
