import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Avatar from './Avatar'

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
    </div>
  )
})

export default Nav
