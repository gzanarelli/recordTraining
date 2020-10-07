import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import Logout from './Logout'

export const Nav = withRouter(({ location, state }) => {
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return ''
  }
  return (
    <div className='nav'>

      <div className='nav__bloc'>
        <div className='nav__logout'>
          <Logout />
        </div>
      </div>

      <div className='nav__bloc'>
        <Link to='/' className='nav__go-back'>
          <i class='fas fa-arrow-left nav__go-back__link' />
        </Link>
      </div>

    </div>
  )
})

export default Nav
