import React from 'react'
import _ from 'lodash'

export default function Card (datas) {
  console.log('Card: ', datas.datas)
  if (!datas) {
    console.log('Error not datas')
    return null
  }
  return (
    <div className='card'>
      <a href='#' className='card__link'>
        <div className='card__content'>
          <h2 className='card__title'> {_.get(datas, 'datas.label')}</h2>
        </div>
      </a>
    </div>
  )
}
