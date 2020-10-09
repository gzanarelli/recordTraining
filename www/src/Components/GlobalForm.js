import React from 'react'
import { Form, Formik } from 'formik'
import Select from 'react-select'
import _ from 'lodash'
import axios from '../axios/axios'

import Block from './Block'

const fakeDatas = [{
  label: 'Squat',
  value: 'squat'
}, {
  label: 'Developpe couche',
  value: 'developCouch'
}]

export default function GlobalForm (props) {
  const validator = (value, key) => {
    if (!value && !_.get(props, key, null)) {
      return { [key]: key + ' is required' }
    }
    return null
  }

  const validate = (values) => {
    let errs = {}
    _.forOwn(values, (value, key) => {
      errs = { ...errs, ...validator(value, key) }
    })
    console.log(errs)
    return errs
  }

  const onSubmit = (values) => {
    axios[props.verb](props.url, values)
      .then(() => {
        props.history.goBack()
      })
      .catch(err => {
        return err
      })
  }

  return (
    <Formik
      initialValues={props.initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className='login__form'>
          {
            props.url === 'exercise' ? (
              <div class='loginBlock'>

                <Select
                  id='value'
                  name='value'
                  classNamePrefix='inner'
                  menuPlacement='top'
                  isSearchable
                  options={fakeDatas}
                  onChange={e => {
                    setFieldValue('label', e.label)
                    setFieldValue('value', e.value)
                    console.log(e)
                  }}
                  defaultValue=''
                />

                <Block key='numberSessions' type='number' value='numberSessions' />
                <Block key='numberRepetitions' type='number' value='numberRepetitions' />
                <Block key='weight' type='number' value='weight' />
                <Block key='timeOut' type='text' value='timeOut' />

              </div>
            ) : (
              <Block key='label' type='text' value='label' />
            )
          }
          {
            !isSubmitting ? (
              <button type='submit' className='login__submit'>
							Submit
              </button>
            )
              : 'Loading'
          }
        </Form>
      )}
    </Formik>
  )
}
