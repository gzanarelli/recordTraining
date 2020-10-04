import React from 'react'
import {Form, Formik} from 'formik'
import _ from 'lodash'
import axios from 'axios'
import { connect } from 'react-redux'

import Block from '../Components/Block'

/**
 * Set default values for each routes
 */
const getValues = {
	'/note/add': {
		label: ''
	}
}

/**
 * Set infos label, title... for each routes
 */
const getInfos = {
	'/note/add': {
		title: 'Ajouter une note',
		post: '/note',
		fields: {
			label: {
				label: 'Label',
				type: 'text'
			}
		}
	}
}

class AddForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			defaultValues: {},
			infosForm: {}
		}
	}

	componentDidMount() {
		const defaultValues = getValues[_.get(this, 'props.location.pathname', null)]
		const infosForm = getInfos[_.get(this, 'props.location.pathname', null)]
		this.setState({
			defaultValues,
			infosForm
		})
	}
	
	validate = (values) => {
		let errs = {}
		const { infosForm } = this.state
		_.map(infosForm.fields, (value, key) => {
			if (!values[key]) {
				errs[key] = `${value.label} is required`
			}
		})
		return errs
	}
	
	onSubmit = (values) => {
		console.log('Token ad form: ', this.props)
		const { infosForm } = this.state
		axios.post(`${ process.env.REACT_APP_BACK_URL + infosForm.post}`,
		values, {
			headers: {
				token: _.get(this, 'props.user.token', null)
			}
		})
		.then(response => {
			console.log('response :', response.data)
		})
		.catch(err => {
			console.log(err)
		})
	}
	render() {
		const { defaultValues, infosForm } = this.state
		console.log('defaultValues: ', defaultValues)
		return (
			<div className="login">
				<h1>{ infosForm.title }</h1>
				<Formik
					initialValues={defaultValues}
					validate={this.validate}
					onSubmit={this.onSubmit}
					>
					<Form className="login__form">
						{
							_.map(infosForm.fields, (value, key) => {
								return <Block key={key} type={value.type} value={key} />
							})
						}
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

export default connect(mapStateToProps)(AddForm)