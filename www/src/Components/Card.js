import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

export default function Card (datas) {
  if (!datas) {
    return null
  }

  return (
    <div className='card'>
      <Link to={datas.url + datas.datas._id} className='card__link'>
        <div className='card__content'>
          <h2 className='card__title'> {_.get(datas, 'datas.label')}</h2>
          <p>
             Number {_.get(datas, 'name')}: {_.get(datas, 'datas.sessionId', []).length}
          </p>
        </div>
      </Link>
      <Link to={'/' + datas.type + '/edit/' + datas.datas._id}>Edit</Link>
    </div>
  )
}
