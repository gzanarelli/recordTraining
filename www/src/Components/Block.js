import React from 'react'
import {Field, ErrorMessage} from 'formik'

export default function Block(datas) {
	const { value, type } = datas
	return (
		<div className='loginBlock'>
			<div className='loginBlock__item'>
				<label htmlFor={value} className='loginBlock__label'>
					{value}
				</label>
				<Field id={value} type={type} name={value} required className='loginBlock__input'/>			
			</div>
			<ErrorMessage name={value} component="p" className='loginBlock__error'/>
		</div>
	)
}
