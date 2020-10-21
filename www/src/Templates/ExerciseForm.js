import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import axios from '../axios/axios'
import exercisesList from '../config/exercises.json'
import GlobalForm from '../Components/GlobalForm'
import CardExerciseForm from '../Components/CardExerciseForm'
import CardExerciseFormSelect from '../Components/CardExerciseFormSelect'
import { Formik, Form, FieldArray } from 'formik'
import Promise from 'bluebird'

const categories = [
  {value: 'chest', label: 'Chest'},
  {value: 'arms', label: 'Arms'},
  {value: 'abs', label: 'Abs'},
  {value: 'back', label: 'Back'},
  {value: 'legs', label: 'Legs'},
  {value: 'calves', label: 'Calves'},
  {value: 'shoulders', label: 'Shoulders'}
]


class SessionForm extends React.Component {
  constructor (props) {
    super(props)

		this.state = {
			classes: '',
			bool: true,
      rotate: 0,
      categorySelect: 'chest',
      exerciseShow: [],
      exercisesForm: [],
      exercises: exercisesList,
      initialValues: []
		}
  }
  
  componentDidMount() {

  const { match } = this.props
  axios.get('/session/' + _.get(match, 'params.sessionId') + '?populate=exercisesId')
  .then(session => {
    this.setState({
      exercisesForm: session.data.exercisesId
    })
    this.setState(state => {
      const exercises = state.exercises.map(exercise => {
        if (_.filter(this.state.exercisesForm, select => select.value === exercise.value ).length > 0) {
          return { ...exercise, select: true }
        } else {
          return exercise
        }
      })
      return {
        exercises
      }
    })
    const initialValues = []
    
    if (this.state.exercisesForm.length === 0) {
      this.setState({ initialValues: [{
        label: '',
        value: '',
        select: true,
        numberRepetitions: 0,
        numberSessions: 0,
          weight: 0,
          timeOut: 0
        }]})
      } else {
        _.map(this.state.exercisesForm, exercise => {
          initialValues.push({
            label: exercise.label,
            weight: exercise.weight,
            select: exercise.select,
            value: exercise.value,
            numberRepetitions: exercise.numberRepetitions,
            numberSessions: exercise.numberSessions,
            timeOut: exercise.timeOut
          })
        })
        this.setState({ initialValues })
      }
      const exercises = _.filter(this.state.exercises, data => data.category === this.state.categorySelect)
      this.setState({ exerciseShow: exercises })      
    })
    .catch(err => console.error(err))
  }
  
	handleSize = () => {
		if (this.state.bool) {
			this.setState({classes: 'form-ex__show--active', bool: !this.state.bool, rotate: 'form-ex__arrow--active'})
		} else {
			this.setState({classes: '', bool: !this.state.bool, rotate: ''})
		}
	}

  handleCategories = (value) => {
    const exercises = _.filter(this.state.exercises, data => data.category === value)
    this.setState({
      categorySelect: value,
      exerciseShow: exercises
    })
  }

  handleExercisesSelect = (exercise) => {
    this.setState(state => {
      const exercises = state.exercises.map(item => {
        if (item.value === exercise.value) {
          item.select = !item.select
        }
        return item
      });
      return {
        exercises
      }
    })
    console.log(this.state.exercisesForm)
    if (exercise.select) {
      this.setState(state => {
        const exercisesForm = state.exercisesForm.filter(item => item.value !== exercise.value)
        return {
          exercisesForm
        }
      })
    } else {
      this.setState(state => {
        const exercisesForm = state.exercisesForm.concat(exercise);
        return {
          exercisesForm
        }
      })
    }
  }

  onSubmit (values, props) {
    console.log('----- ONSUBMIT -----')
    const sessionId = _.get(props, 'match.params.sessionId')
    Promise.map(values.exercises, async exercise => {
      console.log(exercise)
      const body = {
        ...exercise,
        weight: 20,
        sessionId
      }
      console.log(body)
      await axios.post('/exercise', body)
    })
    .then((datas) => {
      console.log('Exercises create or updated')
    })
    
  }
  
  onValidate (values) {
    console.log('Validate fields');
  }

  render () {
    const { exerciseShow, exercisesForm, initialValues } = this.state
    console.log(exercisesForm.length)
    console.log(initialValues)
    if (exercisesForm.length > 0 && initialValues.length === 0) {
      return (
        <div>
          Loading...
        </div>
      )
    }
    const categoriesShow = _.map(categories, (category, index) => {
      return (
        <button key={index} type='button' onClick={() => this.handleCategories(category.value)}>
          {category.label}
        </button>
      )
    })

		const {classes, bool, rotate} = this.state
    return (
      <div className='form-ex wrapper'>
        <div className='form-ex__categories'>
          { categoriesShow }
        </div>
        <div className='form-ex__wrapper'>
          <Formik
            validate={this.onValidate}
            initialValues={{exercises: initialValues}}
            render={({values}) => (
              <Form
                onSubmit={() => this.onSubmit(values, this.props)}
              >
                <FieldArray
                  name='exercises'
                  render={({remove, push}) => (
                      <div className='form-ex__list'>
                        <ul className='form-ex__select'>
                          {
                            _.map(exerciseShow, (exercise, index) => {
                              return (
                                <CardExerciseForm
                                exercise={exercise}
                                key={index}
                                index={exercise.value}
                                push={push}
                                handleExercisesSelect={this.handleExercisesSelect}
                                />
                              )
                            })
                          }
                        </ul>
                        <div className={`form-ex__show ${classes}`}>
                          <button type='button' onClick={this.handleSize} className={`form-ex__arrow ${rotate}`}>
                            <i class='fas fa-arrow-up' />
                          </button>
                          <ul className='form-ex__wrapper-select'>
                            {
                              _.map(values.exercises, (exercise, index) => {
                                return (
                                <CardExerciseFormSelect
                                    exercise={exercise}
                                    key={index}
                                    index={exercise.value}
                                    remove={remove}
                                    values={values}
                                    handleExercisesSelect={this.handleExercisesSelect}
                                  />
                              )}
                            )}
                          </ul>
                          <button type="submit">Sauvegarder</button>
                          </div>
                        </div>
                      )}
                    />
                  </Form>
                )}
              />
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(SessionForm)
