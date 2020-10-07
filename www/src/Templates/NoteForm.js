import React from 'react'
import {Form, Formik} from 'formik'
import _ from 'lodash'
import axios from '../axios/axios'
import { connect } from 'react-redux'

import Block from '../Components/Block'

class NoteForm extends React.Component {
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
		axios.post(`${ process.env.REACT_APP_BACK_URL}/note`, values)
		.then(response => {
			console.log('response :', response.data)
		})
		.catch(err => {
			console.log(err)
		})
	}

	render() {
		return (
			<div className="login">
				<h1>Ajouter une note</h1>
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

export default connect(mapStateToProps)(NoteForm)