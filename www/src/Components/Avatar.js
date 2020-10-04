import React from 'react'
import _ from 'lodash'

export default function Avatar ({ infos }) {
  return (
    <div className='avatar'>
      {
        _.get(infos, 'picture.link', null) ? (
          <img src='' className='avatar__img' />
        ) : (
          <span className='avatar__letter'>
            {_.get(infos, 'pseudo', '#')[0]}
          </span>
        )
      }
    </div>
  )
}
