import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

export default function Card (datas) {
  if (!datas) {
    console.log('Error not datas')
    return null
  }
  console.log(datas)
  return (
    <div className='card'>
      <Link to={datas.url + datas.datas._id} className='card__link'>
        <div className='card__content'>
          <h2 className='card__title'> {_.get(datas, 'datas.label')}</h2>
        </div>
      </Link>
    </div>
  )
}
