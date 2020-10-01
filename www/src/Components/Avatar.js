import React from 'react'
import _ from 'lodash'

export default function Avatar ({ infos }) {
  return (
    <div class='avatar'>
      {
        _.get(infos, 'picture.link', null) ? (
          <img src='' class='avatar__img' />
        ) : (
          <span class='avatar__letter'>
            {_.get(infos, 'pseudo', '#')[0]}
          </span>
        )
      }
    </div>
  )
}
