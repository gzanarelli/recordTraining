import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ls from 'local-storage'

import Avatar from './Avatar'
import Button from './Button'

const logout = () => {
  ls.clear()
  return window.location.reload()
}

export const Nav = withRouter(({ location }) => {
  console.log('Nav: ', location)
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return (
      <div className='login__select'>
        <a href='/login' className={`login__enter ${location.pathname === '/login' ? 'login__active' : ''}`}>
          login
        </a>
        <a href='/signup' className={`login__enter ${location.pathname === '/signup' ? 'login__active' : ''}`}>
          sign-up
        </a>
      </div>

    )
  }
  return (
    <div className='nav'>
      <div className='nav__profil'>
        <Avatar infos={{ pseudo: 'Gabriel' }} />
      </div>
      <div className='nav__logout'>
        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
})

export default Nav
