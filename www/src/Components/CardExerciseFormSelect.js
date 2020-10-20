import { remove } from 'lodash'
import React from 'react'
import { Field } from 'formik'

export default function CardExerciseFormSelect (props) {
  /**
   * Use same file for style that card exercise form
   */
  return (
    <li className='card-ex-form__item'>
      <div key={props.index} value={props.exercise.value} className='card-ex-form card-ex-form--select'>
        <div className='card-ex-form__avatar'>
          <div className='card-ex-form__avatar-wrapper'>
            <img src='/img/Bench-press-1.png' className='img-top' />
            <img src='/img/Bench-press-2.png' className='img-bot' />
          </div>
        </div>
        <p className='card-ex-form__title' type='text' name={`exercises.${props.index}.value`}>
          {props.exercise.label}
        </p>
        <button
          className='card-ex-form__btn card-ex-form__btn--remove'
          type='button'
          onClick={() => {
            props.handleExercisesSelect(props.exercise)
            props.remove(props.index)
          }}
        >
          <i class='far fa-trash-alt' />
        </button>
      </div>
      <div className='card-ex-form'>
        <span>
          Set
        </span>
        <div>
          <label htmlFor={`exercise.${props.index}.numberSessions`}> Sessions </label>
          <Field className='card-ex-form__title' type='number' name={`exercises.${props.index}.numberSessions`} defaultValue={props.exercise.numberSessions} />
          <label htmlFor={`exercise.${props.index}.numberRepetitions`}> Répétitions </label>
          <Field className='card-ex-form__title' type='number' name={`exercises.${props.index}.numberRepetitions`} defaultValue={props.exercise.numberRepetitions} />
          <label htmlFor={`exercise.${props.index}.timeOut`}> Temps de repos </label>
          <Field className='card-ex-form__title' type='number' name={`exercises.${props.index}.timeOut`} defaultValue={props.exercise.timeOut} />
        </div>
      </div>
    </li>
  )
}
