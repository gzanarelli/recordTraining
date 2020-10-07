import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

export default function Button (datas) {
  console.log('In button component: ', datas.noteId)
  return (
    <div className='button'>
      <Link to={datas.link} className='button__link' noteId={datas.noteId}>
        <i class='fas fa-plus' />
      </Link>
    </div>
  )
}
