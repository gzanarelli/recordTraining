import React from 'react'

export default function CardExerciseFormSelect (props) {
  console.log('select: ', props)
  /**
   * Use same file for style that card exercise form
   */
  return (
    <li key={props.index} value={props.exercise.value} className='card-ex-form'>
      <div className='card-ex-form__avatar'>
        <div className='card-ex-form__avatar-wrapper'>
          <img src='/img/Bench-press-1.png' className='img-top' />
          <img src='/img/Bench-press-2.png' className='img-bot' />
        </div>
      </div>
      {props.exercise.label}
    </li>
  )
}
