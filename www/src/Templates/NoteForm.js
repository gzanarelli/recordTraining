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
		const { history, action, match } = this.props
		return (
			<div className="login">
				<h1>
					{action === 'put' ? 'Editer' : 'Ajouter' } une note
				</h1>
				<GlobalForm
					initialValues={{
						label: '',
						objectif: '',
						tag: '',
						colorTag: '',
					}}
					url='note/'
					backUrl='/note'
					putId={_.get(match, 'params.noteId')}
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

export default connect(mapStateToProps)(NoteForm)