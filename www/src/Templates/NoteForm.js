import React from 'react'
import _ from 'lodash'
import axios from '../axios/axios'
import { connect } from 'react-redux'

import GlobalForm from '../Components/GlobalForm'

class NoteForm extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="login">
				<h1>Ajouter une note</h1>
				<GlobalForm
					initialValues={{
						label: ''
					}}
					url='note'
					backUrl='/note'
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

export default connect(mapStateToProps)(NoteForm)