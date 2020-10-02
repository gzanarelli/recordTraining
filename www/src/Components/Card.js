import React from 'react'
import _ from 'lodash'

export default function Card (datas) {
  console.log(datas.datas.label)
  if (!datas) {
    console.log('Error not datas')
    return null
  }
  return (
    <a href='#' className='card'>
      <div className='card__content'>
        <h2 className='card__title'> {_.get(datas, 'datas.label')}</h2>
      </div>

    </a>
  )
}
