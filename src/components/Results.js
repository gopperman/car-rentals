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

	render() {
		const {cars, dest} = this.props

	    return (
	      <div className="results">
	      	<h2 className="results__hed">Great news! We found you {cars.length} cars near {dest}:</h2>
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