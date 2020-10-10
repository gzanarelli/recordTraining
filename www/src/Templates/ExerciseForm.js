import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import GlobalForm from '../Components/GlobalForm'

class SessionForm extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
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

		return (
			<div className="login">
				<h1>{action === 'put' ? 'Editer' : 'Ajouter' } un exercice</h1>
				<GlobalForm
					initialValues={initialValues}
					url='exercise/'
					putId={_.get(match, 'params.exerciseId')}
					backUrl={'/exercise/' + _.get(match, 'params.sessionId')}
					verb={action}
					history={history}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(SessionForm)