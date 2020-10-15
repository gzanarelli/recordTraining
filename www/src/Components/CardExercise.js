import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import axios from '../axios/axios'
import ls from 'local-storage'

export default function CardExercise (props) {
  if (!props) {
    return null
  }

  const handleDelete = () => {
    axios.delete(props.type + '/' + props.datas._id)
      .then(() => {
        ls('successMessage', `Note ${props.datas.label} delete`)
        window.location.reload()
      })
  }

  return (
    <div className='card'>
      <Link to={props.url + props.datas._id} className='card__link'>
        <div className='card__avatar-wrapper card__avatar-wrapper--exercise'>
          <img src='/img/Bench-press-1.png' className='avatar-top' />
          <img src='/img/Bench-press-2.png' className='avatar-bot' />
        </div>
        <div className='card__content'>
          <h2 className='card__title'> {_.get(props, 'datas.label')}</h2>
          <div className='card__infos'>
            <p className='card__item'>Serie: {_.get(props, 'datas.numberSessions')}</p>
            <p className='card__item'>Répétition: {_.get(props, 'datas.numberRepetitions')}</p>
            <p className='card__item'>
              <i class='fas fa-weight-hanging' />
              {_.get(props, 'datas.weight')}
            </p>
            <p className='card__item'>
              <i class='fas fa-stopwatch' />
              {_.get(props, 'datas.timeOut')}
            </p>
          </div>
        </div>
      </Link>
      <div className='card__icons'>
        <div className='card__icon'>
          <div className='btn btn--second'>
            <Link to={'/' + props.type + '/edit/' + props.datas._id} className='btn__link'>
              <i class='fas fa-edit' />
            </Link>
          </div>
        </div>
        <div className='card__icon'>
          <div className='btn btn--second'>
            <button type='button' onClick={handleDelete} className='btn__link'>
              <i class='fas fa-trash-alt' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
