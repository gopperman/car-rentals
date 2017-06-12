import React, { Component} from 'react'
import { PropTypes } from 'prop-types'
import _ from 'lodash'

class ErrorMessage extends Component {
	listErrors() {
		const errors = this.props.errors.map((v) => {
			return (<li key={_.uniqueId('error-')}>{v.ErrorMessage}</li>)
		})
		return errors
	}
	render() {
		return (
			<div className="error-message">
				<p className="error-message__hed">Oops! Something went wrong.</p>
				<p className="error-message__subhed">We tried really hard to bring you results, but one or more things need to be fixed first:</p>
				<ul className="error-message__list">
					{this.listErrors()}
				</ul>
				<p className="error-message__foot">We're really sorry about that =/</p>
			</div>
		)
	}
}

ErrorMessage.propTypes = {
	errors: PropTypes.array.isRequired,
}

export default ErrorMessage
