import React, { Component } from 'react'
import {PropTypes} from 'prop-types'
import _ from 'lodash'
import CarListing from './CarListing'

class Results extends Component {
	constructor() {
		super()

		this.state = {
			sortKey: 'totalPrice'
		}

		this.carList = this.carList.bind(this)
		this.sort = this.sort.bind(this)
	}

	/**
	 * Maps array and returns markup for car results
	 * @return {array} An array of components
	 */
	carList() {
		const sortKey = this.state.sortKey,
			// Sort cars (default: by price)
			cars = _.sortBy(this.props.cars, (o) => {
				return o[sortKey]
			})

		return cars.map((v) => {
			return <CarListing key={_.uniqueId('car-')} car={v} />
		})
	}

	/**
	 * Sorts list of cars based on state
	 * @param  {object} event
	 * @return {void}
	 */
	sort(event) {
		event.preventDefault()
		this.setState({
			sortKey: event.target.getAttribute('data-sortKey')
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
			`Sorry, we couldn't find any cars that match your needs. Try changing your search parameters and try again.`
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.sortKey !== nextState.sortKey
	}

	render() {
	    return (
	      <div id="results" className="results">
	      	<h2 className="results__hed">{this.resultsHed()}</h2>
	      	<p className="results__sort">
	      		Sort by: 
	      		<a className="results__sort-link" data-sortKey="totalPrice" onClick={this.sort}>Price</a>,
	      		<a className="results__sort-link" data-sortKey="CarTypeCode" onClick={this.sort}>Car Type</a>
	      	</p>
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
