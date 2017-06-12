import React, { Component } from 'react'
import {PropTypes} from 'prop-types'
import _ from 'lodash'
import CarListing from './CarListing'

class Results extends Component {
	/**
	 * Maps array and returns markup for car results
	 * @return {array} An array of components
	 */
	carList() {
		const { cars } = this.props
		return cars.map((v) => {
			return <CarListing key={_.uniqueId('car-')} car={v} />
		})
	}

	/**
	 * Checks length of results and returns appropriate micro-copy
	 * @return {string} the hed
	 */
	resultsHed() {
		const {cars, dest} = this.props;

		return (cars.length > 0) ?
			`Great news! We found you ${cars.length} cars near ${dest}` :
			`Sorry, we couldn't find any cards that match your needs. Try changing your search parameters and try again.`
	}

	render() {
	    return (
	      <div id="results" className="results">
	      	<h2 className="results__hed">{this.resultsHed()}</h2>
	      	{this.carList()}
	      </div>
	    )
	}
}

Results.propTypes = {
	cars: PropTypes.array.isRequired,
	dest: PropTypes.string.isRequired,
}
export default Results