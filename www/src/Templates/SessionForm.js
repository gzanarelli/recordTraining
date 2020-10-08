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
				<h1>Ajouter une session</h1>
				<GlobalForm
					initialValues={{
						label: '',
						noteId: _.get(this, 'props.match.params.noteId')
					}}
					url='session'
					backUrl={'/session/' + _.get(this, 'props.match.params.noteId')}
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