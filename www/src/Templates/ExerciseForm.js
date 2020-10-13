import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import GlobalForm from '../Components/GlobalForm'


const categories = [{value: 'front', label: 'Front'},{value: 'arms', label: 'Arms'}, {value: 'abs', label: 'Abs'}, {value: 'back', label: 'Back'}, {value: 'leg', label: 'Leg'}]

// const fakeDatas = [{
//   label: 'Squat',
//   value: 'squat',
//   category: 'leg',
//   select: false
// }, {
//   label: 'Developpe couche',
//   value: 'developCouch',
//   category: 'front',
//   select: false
// }, {
//   label: 'Souleve de terre',
//   value: 'souleveDeTerre',
//   category: 'leg',
//   select: false
// }, {
//   label: 'Developpe incline',
//   value: 'developIncline',
//   category: 'front',
//   select: false
// }, {
//   label: 'Curl',
//   value: 'curl',
//   category: 'arms',
//   select: false
// }, {
//   label: 'Traction',
//   value: 'traction',
//   category: 'back',
//   select: false
// }]

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
      fakeDatas: [{
        label: 'Squat',
        value: 'squat',
        category: 'leg',
        select: false
      }, {
        label: 'Developpe couche',
        value: 'developCouch',
        category: 'front',
        select: false
      }, {
        label: 'Souleve de terre',
        value: 'souleveDeTerre',
        category: 'leg',
        select: false
      }, {
        label: 'Developpe incline',
        value: 'developIncline',
        category: 'front',
        select: false
      }, {
        label: 'Curl',
        value: 'curl',
        category: 'arms',
        select: false
      }, {
        label: 'Traction',
        value: 'traction',
        category: 'back',
        select: false
      }]
		}
  }
  
  componentDidMount() {
    const exercises = _.filter(this.state.fakeDatas, data => data.category === this.state.categorySelect)
    this.setState({ exerciseShow: exercises })
  }

	handleSize = () => {
		if (this.state.bool) {
			this.setState({size: '80%', bool: !this.state.bool, rotate: '180deg'})
		} else {
			this.setState({size: '40%', bool: !this.state.bool, rotate: '0'})
		}
	}

  handleCategories = (value) => {
    console.log(value)
    const exercises = _.filter(this.state.fakeDatas, data => data.category === value)

    this.setState({
      categorySelect: value,
      exerciseShow: exercises
    })
  }

  handleExercisesSelect = (exercise) => {
    console.log(exercise);

    this.setState(state => {
      const fakeDatas = state.fakeDatas.map(item => {
        if (item.value === exercise.value) {
          item.select = !item.select
        }
        return item
      });
      return {
        fakeDatas
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
    console.log(this.state.exercisesSelect);
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
		console.log(size, bool)
    return (
      <div className='form-ex wrapper'>
        <div className='form-ex__categories'>
          { categoriesShow }
        </div>
        <div className='form-ex__wrapper'>
          <h1>{action === 'put' ? 'Editer' : 'Ajouter'} un exercice</h1>
          <ul className='form-ex__list'>
            {
              _.map(exerciseShow, (d, index) => {
                return (
                  <li key={index} style={{ padding: '20px' }}>
                    {d.label}
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
