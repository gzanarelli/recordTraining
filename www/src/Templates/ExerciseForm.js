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
		axios.post(`${ process.env.REACT_APP_BACK_URL}/exercise`, {...values, sessionId: _.get(this, 'props.match.params.sessionId')})
		.then(response => {
			this.props.history.push('/session/populate/' + _.get(this, 'props.match.params.sessionId'))
		})
		.catch(err => {
			console.log(err)
		})
	}

	render() {
    console.log('Exercice form: ', this.props.match.params)
    return (
			<div className="login">
				<h1>Ajouter un exercice</h1>
				<Formik
					initialValues={{label: '', value: '', numberSessions: 1, numberRepetitions: 1, weight: 0, timeOut: ''}}
					validate={this.validate}
					onSubmit={this.onSubmit}
					>
					<Form className="login__form">
						<Block key='label' type='text' value='label' />
						<Block key='numberSessions' type='number' value='numberSessions' />
						<Block key='numberRepetitions' type='number' value='numberRepetitions' />
						<Block key='weight' type='number' value='weight' />
						<Block key='timeOut' type='text' value='timeOut' />
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