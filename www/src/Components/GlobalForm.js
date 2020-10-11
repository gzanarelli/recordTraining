import React from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import Select from 'react-select'
import _ from 'lodash'
import axios from '../axios/axios'
import { CirclePicker } from 'react-color';
import ls from 'local-storage'

import Block from './Block'

const fakeDatas = [{
  label: 'Squat',
  value: 'squat'
}, {
  label: 'Developpe couche',
  value: 'developCouch'
}, {
  label: 'Souleve de terre',
  value: 'souleveDeTerre'
}, {
  label: 'Developpe incline',
  value: 'developIncline'
}, {
  label: 'Curl',
  value: 'curl'
}, {
  label: 'Traction',
  value: 'traction'
}]


const validator = (value, key, props) => {
  if (!value && !_.get(props, key, null)) {
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
      tag: '',
      numberSessions: '',
      numberRepetitions: '',
      weight: '',
      timeOut: '',
      colorTag: '#fff',
      displayColorPicker: false
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
      errs = { ...errs, ...validator(value, key, this.props) }
    })
    console.log(errs)
    return errs
  }
  
  
  onSubmit = (values) => {
    console.log('Submit form')
    const { url, verb, putId } = this.props
    const setUrl = url + (verb === 'put' ? putId : '')  
    axios[this.props.verb](setUrl, values)
    .then(() => {
      ls('successMessage', `${values.label} created`)
      this.props.history.goBack()
    })
    .catch(err => {
      return err
    })
  }

  handleChangeComplete = (color) => {
    this.setState({ colorTag: color.hex });
  };

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    })
  }
  
  render() {

    let initialValues = this.props.initialValues

    if (this.props.verb === 'put') {
      _.forOwn(this.props.initialValues, (val, key) => {
        initialValues[key] = this.state[key]
      })
    }

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
                <div className='loginBlock'>
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
                <div className='loginBlock'>
                  <div className='loginBlock'>
                    <div className='loginBlock__item'>
                      <label htmlFor='label' className='loginBlock__label'>
                        Label
                      </label>
                      <Field
                        id='label'
                        type='text'
                        name='label'
                        required
                        className='loginBlock__input'
                        onChange={e => {
                          console.log(e.target.value)
                          setFieldValue('label', e.target.value)
                          setFieldValue('tag', e.target.value[0])
                          this.setState({ tag: e.target.value[0] })
                        }}
                      />
                    </div>
                    <ErrorMessage name='label' component="p" className='loginBlock__error'/>
                  </div>

                  {
                    this.props.url === 'note/' ? (
                      <Block key='objectif' type='text' value='objectif' />
                    ) : ''
                  }
                  <div className='loginBlock'>
                  <button type='button' onClick={ this.handleClick } className='picker-color' style={{backgroundColor: this.state.colorTag}}>
                    {
                      this.state.displayColorPicker ? (
                        <div onClick={this.handleClick}>
                          <CirclePicker 
                            color={ this.state.colorTag }
                            onChangeComplete={ (e) => {
                              console.log(e)
                              this.handleChangeComplete(e)
                              setFieldValue('colorTag', e.hex)
                            }}
                          />
                        </div>
                      ) : ''
                    }
                    { this.state.tag }
                  </button>
                    <ErrorMessage name='colorTag' component="p" className='loginBlock__error'/>
                  </div>
                </div>
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
