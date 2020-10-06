import React from 'react'
import { Link } from 'react-router-dom'
import ls from 'local-storage'

export default function Logout() {
	return (
		<div className="button button--red">
			<Link onClick={() => ls.clear()} to={'/login'} className="button__link">
				<i class="fas fa-power-off"></i>
			</Link>
		</div>
	)
}
