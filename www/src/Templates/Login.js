import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash'
import { Formik, Form } from 'formik'
import axios from '../axios/axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserActions from '../Redux/actions/user'
import {toast} from 'react-toastify'
import ls from 'local-storage'

import LoginBlock from '../Components/LoginBlock'

class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			pathname: 'login',
			error: ''
		}
	}

	componentDidMount() {
		ls.remove('token')
	}
	
	/**
	 * Validator values
	 */
	validate = (values) => {
		let errs = {}
		
		if (!values.email) {
			errs.email = 'E-mail is required'
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errs.email = 'Invalid email address'
		}
		
		if (!values.password) {
			errs.password = 'Password is required'
		}
		
		if (!values.pseudo && this.state.pathname === 'signup' ) {
			errs.pseudo = 'Pseudo is required'
		}
		
		return errs
	}
	
	/**
	 * Submit values
	 */
	onSubmit = (values) => {
		axios.post(`${ process.env.REACT_APP_BACK_URL}/${this.state.pathname}`, {
			..._.pick(values, ['email', 'password', 'pseudo'])
		})
		.then(response => {
			if (_.get(response, 'data.isBoom', false)) {
				this.setState({ error: _.get(response, 'data.output.payload.message', '') })
			} else {
				ls('token', _.get(response, 'data.token'))
				this.props.history.push('/note')
			}
		})
		.catch(err => {
			return err
		})
	}
	
	render() {
		const { pathname, error } = this.state;
		if (error) {
			toast.error(error)
		}
		return (
			<div className="login">

				<div className='login__select'>

					<button className={`login__enter login__enter--inverse ${pathname === 'login' ? 'login__active' : ''}`} onClick={() => this.setState({ pathname: 'login'})}>
						Login
					</button>

					<button className={`login__enter ${pathname === 'signup' ? 'login__active' : ''}`} onClick={() => this.setState({ pathname: 'signup'})}>
						Sign-up
					</button>

				</div>

				<Formik
					initialValues={{email: '', password: '', pseudo: ''}}
					validate={this.validate}
					onSubmit={this.onSubmit}
				>
						<Form className="login__form">
	
							<LoginBlock 
								value={'email'}
								type={'email'}
								/>
							<LoginBlock
								value={'password'}
								type={'password'}
								/>
							{
								pathname === 'signup' ? (
									<LoginBlock
									value={'pseudo'}
									type={'text'}
									/>
									) : ''
							}

							<button type="submit" className="login__submit">{ pathname }</button>

						</Form>

				</Formik>
			</div>
		)
	}
}


const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))