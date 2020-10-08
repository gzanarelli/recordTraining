import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

export default function CardExercise (datas) {
  if (!datas) {
    console.log('Error not datas')
    return null
  }
  console.log('Card Exercise: ', datas)
  return (
    <div className='card'>
      <Link to={datas.url + datas.datas._id} className='card__link'>
        <div className='card__content'>
          <h2 className='card__title'> {_.get(datas, 'datas.label')}</h2>
          <p>Session: {_.get(datas, 'datas.numberSessions')}</p>
          <p>Répétition: {_.get(datas, 'datas.numberRepetitions')}</p>
          <p>Poids: {_.get(datas, 'datas.weight')}</p>
          <p>Temps de repos: {_.get(datas, 'datas.timeOut')}</p>
        </div>
      </Link>
    </div>
  )
}
