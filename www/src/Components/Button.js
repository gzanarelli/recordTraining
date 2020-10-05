import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

export default function Button () {
  return (
    <div className='button'>
      <Link to='/note/add' className='button__link'>
        <i class='fas fa-plus' />
      </Link>
    </div>
  )
}
