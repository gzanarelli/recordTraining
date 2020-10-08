import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import GlobalForm from '../Components/GlobalForm'

class SessionForm extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
    return (
			<div className="login">
				<h1>Ajouter un exercice</h1>
				<GlobalForm
					initialValues={{
						label: '',
						value: '',
						numberSessions: '',
						numberRepetitions: '',
						weight: '',
						timeOut: '',
						sessionId: _.get(this, 'props.match.params.sessionId')
					}}
					url='exercise'
					backUrl={'/exercise/' + _.get(this, 'props.match.params.sessionId')}
					verb='post'
					history={this.props.history}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(SessionForm)