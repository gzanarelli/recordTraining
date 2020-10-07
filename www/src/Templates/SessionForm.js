import React from 'react'
import {Form, Formik} from 'formik'
import _ from 'lodash'
import axios from '../axios/axios'
import { connect } from 'react-redux'

import Block from '../Components/Block'

class SessionForm extends React.Component {
	constructor(props) {
		super(props)
	}

	validate = (values) => {
		let errs = {}
		if (!values.label) {
			errs.label = `Label is required`
		}
		return errs
	}
	
	onSubmit = (values) => {
		console.log(values)
		axios.post(`${ process.env.REACT_APP_BACK_URL}/session`, {...values, noteId: _.get(this, 'props.match.params.noteId')})
		.then(response => {
			console.log('response :', response.data)
		})
		.catch(err => {
			console.log(err)
		})
	}

	render() {
		console.log('Session form ', this.props.match.params.noteId)
		return (
			<div className="login">
				<h1>Ajouter une session</h1>
				<Formik
					initialValues={{label: ''}}
					validate={this.validate}
					onSubmit={this.onSubmit}
					>
					<Form className="login__form">
						<Block key='label' type='text' value='label' />
						<button type="submit" className="login__submit">Submit</button>
					</Form>
				</Formik>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(SessionForm)