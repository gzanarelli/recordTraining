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

const validator = (value, key) => {
  if (!value && !_.get(this.props, key, null)) {
    return { [key]: key + ' is required' }
  }
  return null
}

const selectToState = (toState, data) => {
  let obj = {}
  _.forOwn(toState, (value, item) => {
    obj = {...obj, [item]: _.get(data, ['data', item], '')}
  })
  return obj
}

export default class GlobalForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      label: '',
      value: '',
      numberSessions: '',
      numberRepetitions: '',
      weight: '',
      timeOut: '',
    }
  }

  componentDidMount() {
    if (this.props.verb === 'put') {
      axios.get(this.props.url + '/' + this.props.putId)
        .then(data => {
          let toState = selectToState(_.omit(this.props.initialValues, ['_id', 'noteId', 'sessionId', 'exercisesId']), data)
          console.log('toState ', toState)
          this.setState(toState)
      })
    }
  }

  validate = (values) => {
    let errs = {}
    _.forOwn(values, (value, key) => {
      errs = { ...errs, ...validator(value, key) }
    })
    console.log(errs)
    return errs
  }

  onSubmit = (values) => {
    const { url, verb, putId } = this.props
    const setUrl = url + (verb === 'put' ? putId : '')  
    axios[this.props.verb](setUrl, values)
      .then(() => {
        this.props.history.goBack()
      })
      .catch(err => {
        return err
      })
  }

  render() {

    console.log('form: ', this.props)
    const {label, value, numberSessions, numberRepetitions, weight, timeOut} = this.state
    let initialValues = this.props.initialValues
    console.log(initialValues)
    const tmp = 
    _.forOwn(this.props.initialValues, (val, key) => {
      initialValues[key] = this.state[key]
    })
    // initialValues.label = label
    console.log(initialValues)
    return (
      <Formik
        initialValues={initialValues}
        validate={this.validate}
        onSubmit={this.onSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className='login__form'>
            {
              this.props.url === 'exercise/' ? (
                <div class='loginBlock'>
                  <label htmlFor='value'>Select your exercise</label>
                  <Select
                    id='value'
                    name='value'
                    classNamePrefix='inner'
                    menuPlacement='bottom'
                    isSearchable={false}
                    options={fakeDatas}
                    onChange={e => {
                      setFieldValue('label', e.label)
                      setFieldValue('value', e.value)
                      console.log(e)
                    }}
                    defaultInputValue=""
                    defaultValue={{value: 'squat', label: 'Squat' }}
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
}
