import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import axios from '../axios/axios'
import ls from 'local-storage'

export default function Card (props) {
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

  console.log(props)
  return (
    <div className='card'>
      <Link className='card__link' to={props.url + props.datas._id}>
        <div className='card__avatar-wrapper' style={{ backgroundColor: _.get(props, 'datas.colorTag') }}>
          <span>
            {_.get(props, 'datas.tag')}
          </span>
        </div>
        <div className='card__content'>
          <h2 className='card__title'> {_.get(props, 'datas.label')}</h2>
          {
            props.type === 'note' ? (
              <p className='card__objectif'>
                <span> Objectif: </span>{_.get(props, 'datas.objectif')}
              </p>
            ) : (
              <p className='card__exercise'>
                <i class='fas fa-dumbbell' />
                {_.get(props, 'datas.exercisesId').length}
              </p>
            )
          }
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
