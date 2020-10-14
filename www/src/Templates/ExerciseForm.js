import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import axios from '../axios/axios'
import exercisesList from '../config/exercises.json'
import GlobalForm from '../Components/GlobalForm'


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
			size: '40%',
			bool: true,
      rotate: 0,
      categorySelect: 'front',
      exerciseShow: [],
      exercisesSelect: [],
      exercises: exercisesList
		}
  }
  
  componentDidMount() {

  const { match } = this.props
    const exercises = _.filter(this.state.exercises, data => data.category === this.state.categorySelect)
    this.setState({ exerciseShow: exercises })
    axios.get('/session/' + _.get(match, 'params.sessionId') + '?populate=exercisesId')
    .then(session => {
      this.setState({
        exercisesSelect: session.data.exercisesId
      })
      this.setState(state => {
        const exercises = state.exercises.map(exercise => {
          if (_.filter(this.state.exercisesSelect, select => select.value === exercise.value ).length > 0) {
            return { ...exercise, select: true }
          } else {
            return exercise
          }
        })
        return {
          exercises
        }
      })
    })
    .catch(err => console.error(err))
  }

	handleSize = () => {
		if (this.state.bool) {
			this.setState({size: '95%', bool: !this.state.bool, rotate: '180deg'})
		} else {
			this.setState({size: '40%', bool: !this.state.bool, rotate: '0'})
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

    if (exercise.select) {
      this.setState(state => {
        const exercisesSelect = state.exercisesSelect.filter(item => item.value !== exercise.value)
        return {
          exercisesSelect
        }
      })
    } else {
      this.setState(state => {
        const exercisesSelect = state.exercisesSelect.concat(exercise);
        return {
          exercisesSelect
        }
      })
    }
  }

  render () {
    const { match, action } = this.props
    const { exerciseShow, exercisesSelect } = this.state
    const initialValues = {
      label: '',
      value: '',
      numberSessions: '',
      numberRepetitions: '',
      weight: '',
      timeOut: ''
    }

    

    const categoriesShow = _.map(categories, category => {
      return (
        <button type='button' onClick={() => this.handleCategories(category.value)}>
          {category.label}
        </button>
      )
    })


    if (action === 'post') {
      initialValues.sessionId = _.get(match, 'params.sessionId')
		}
		const {size, bool} = this.state
    return (
      <div className='form-ex wrapper'>
        <div className='form-ex__categories'>
          { categoriesShow }
        </div>
        <div className='form-ex__wrapper'>
          <ul className='form-ex__list'>
            {
              _.map(exerciseShow, (d, index) => {
                return (
                  <li key={index} className='form-ex__item'>
                    <div className='card__avatar-wrapper card__avatar-wrapper--exercise'>
                      <img src='/img/Bench-press-1.png' className='avatar-top'></img>
                      <img src='/img/Bench-press-2.png' className='avatar-bot'></img>
                    </div>
                    <p>
                      {d.label}
                    </p>
                    <button style={{ marginLeft: '20px' }} type='button' onClick={() => this.handleExercisesSelect(d)}>
                      { d.select ? 'Remove' : 'Add' }
                    </button>
                  </li>
                )
              })
            }
          </ul>
          <div className='form-ex__show' style={{height: this.state.size}}>
            <button type='button' onClick={this.handleSize} className='form-ex__arrow' style={{transform: `rotate(${this.state.rotate})`}}>
              <i class='fas fa-arrow-up' />
            </button>
            <ul>
              {
                _.map(exercisesSelect, (exercise, index) => {
                  return (
                    <li key={index} value={exercise.value}>
                      { exercise.label }
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(SessionForm)
