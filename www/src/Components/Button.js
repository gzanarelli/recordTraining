import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

export default function Button (datas) {
  return (
    <div className='btn'>
      <Link to={datas.link} className='btn__link' noteId={datas.noteId}>
        <i class='fas fa-plus' />
      </Link>
    </div>
  )
}
