import React from 'react'
import { Link } from 'react-router-dom'
import ls from 'local-storage'

export default function Logout () {
  return (
    <div className='btn'>
      <Link onClick={() => ls.clear()} to='/login' className='btn__link'>
        <i class="fas fa-sign-out-alt"></i>
      </Link>
    </div>
  )
}
