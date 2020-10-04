import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash'
import { Formik, Form } from 'formik'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserActions from '../Redux/actions/user'
import {toast} from 'react-toastify'
import LoginBlock from '../Components/LoginBlock'

class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			pathname: '',
			error: ''
		}
	}

	componentDidMount() {
		this.setState({ pathname: _.get(this, 'props.location.pathname', null) })
	}
	
	
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
		
		if (!values.pseudo && this.state.pathname === '/signup' ) {
			errs.pseudo = 'Pseudo is required'
		}
		
		return errs
	}
	
	onSubmit = (values) => {
		const { dispatch } = this.props
		const { setToken } = this.props.actions
		console.log('props: ', this.props)
		axios.post(`${ process.env.REACT_APP_BACK_URL + this.state.pathname}`, {
			..._.pick(values, ['email', 'password', 'pseudo'])
		})
		.then(response => {
			console.log('response :', response.data)
			if (_.get(response, 'data.isBoom', false)) {
				this.setState({ error: _.get(response, 'data.output.payload.message', '') })
			} else {
				setToken(_.get(response, 'data.token'))
				console.log(this.props)
				this.props.history.push('/')
			}
		})
		.catch(err => {
			console.log(err)
		})
	}
	
	render() {
		const { pathname, error } = this.state;
		const route = pathname === '/signup' ? 'signup' : 'login'
		if (this.state.error) {
			toast.error(this.state.error)
		}

		return (
			<div>
				<div className="login__select">
					<a href="/login" className={`login__enter ${route === 'login' ? 'login__active' : ''}`}>
							login
					</a>
					<a href="/signup" className={`login__enter ${route === 'signup' ? 'login__active' : ''}`}>
							sign-up
					</a>
				</div>
				<div className="login">
					<Formik
						initialValues={{ email: '', password: '', pseudo: '' }}
						validate={this.validate}
						onSubmit={this.onSubmit}
					>
					<Form className="login__form">
						<LoginBlock value={'email'} type={'email'} />
						<LoginBlock value={'password'} type={'password'} />
						{
							route === 'signup' ? (
								<LoginBlock value={'pseudo'} type={'text'} />
								) : ''
							}
						<button type="submit" className="login__submit">{ route }</button>
					</Form>
					</Formik>
				</div>
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