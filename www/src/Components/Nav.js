import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ls from 'local-storage'

import Avatar from './Avatar'
import Button from './Button'
import Logout from './Logout'


export const Nav = withRouter(({ location, state }) => {
  console.log('Nav: ', location)
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return ''
  }
  return (
    <div className='nav'>
      {/* <div className='nav__profil'>
        <Avatar infos={{ pseudo: 'Gabriel' }} />
      </div> */}
      <div className='nav__logout'>
        <Logout />
      </div>
    </div>
  )
})

export default Nav
