import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import GlobalForm from '../Components/GlobalForm'

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

class SessionForm extends React.Component {
  constructor (props) {
    super(props)

		this.state = {
			size: '40%',
			bool: true,
			rotate: 0
		}
	}

	handleSize = () => {
		console.log('Enter')
		if (this.state.bool) {
			this.setState({size: '80%', bool: !this.state.bool, rotate: '180deg'})
		} else {
			this.setState({size: '40%', bool: !this.state.bool, rotate: '0'})
		}
	}

  render () {
    const { match, action, history } = this.props
    const initialValues = {
      label: '',
      value: '',
      numberSessions: '',
      numberRepetitions: '',
      weight: '',
      timeOut: ''
    }

    if (action === 'post') {
      initialValues.sessionId = _.get(match, 'params.sessionId')
		}
		const {size, bool} = this.state
		console.log(size, bool)
    return (
      <div className='form-ex wrapper'>
        <div className='form-ex__wrapper'>
          <h1>{action === 'put' ? 'Editer' : 'Ajouter'} un exercice</h1>
          <ul className='form-ex__list'>
            {
              _.map(fakeDatas, d => {
                return (
                  <li style={{ padding: '20px' }}>
                    {d.label}
                  </li>
                )
              })
            }
            <li style={{ padding: '20px' }}>
              test Ex
            </li>
            <li style={{ padding: '20px' }}>
              test Ex
            </li>
            <li style={{ padding: '20px' }}>
              test Ex
            </li>
            <li style={{ padding: '20px' }}>
              test Ex
            </li>

          </ul>
          <div className='form-ex__show' style={{height: this.state.size}}>
            <button type='button' onClick={this.handleSize} className='form-ex__arrow' style={{transform: `rotate(${this.state.rotate})`}}>
              <i class='fas fa-arrow-up' />
            </button>
            <ul>
              <li style={{ padding: '20px' }}>
								Test
              </li>
              <li style={{ padding: '20px' }}>
								Test
              </li>
              <li style={{ padding: '20px' }}>
								Test
              </li>
              <li style={{ padding: '20px' }}>
								Test
              </li>
              <li style={{ padding: '20px' }}>
								Test
              </li>
              <li style={{ padding: '20px' }}>
								Test Z
              </li>
              <li style={{ padding: '20px' }}>
								Test A
              </li>
              <li style={{ padding: '20px' }}>
								Test B
              </li>
              <li style={{ padding: '20px' }}>
								Test C
              </li>

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
