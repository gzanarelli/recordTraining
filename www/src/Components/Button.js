import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

export default function Button (datas) {
  return (
    <div className='button'>
      <Link to={datas.link} className='button__link' noteId={datas.noteId}>
        <i class='fas fa-plus' />
      </Link>
    </div>
  )
}
