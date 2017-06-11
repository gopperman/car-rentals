import React, { Component } from 'react'
// #TECHDEBT We should really just import the parts of lodash we need
import _ from 'lodash' 
import Header from './components/Header'
import ErrorMessage from './components/ErrorMessage' 
import './App.css'
import data from './data/sample-response-multiple-errors.json'

class App extends Component {
	constructor() {
		super()

		// Set initial state
		this.state = { 
			response: data, // 'Cached' API response
			query: {
				dest: 'BOS',
				startDate: '01/20/2018',
				endDate: '01/23/2018',
				pickupTime: '10:00',
				dropoffTime: '13:30'
			}
    	}
	}
	/**
	 * Renders components conditionally based on the response body
	 * 
	 * @return {Component} the component(s) to render
	 */
	showResults() {
		const errors = _.get(this.state, 'response.Errors', [])
		/**
		 * If we have one or more errors, render error messaging
		 * Otherwise, show results!
		 */
		return (errors.length > 0) ? (<ErrorMessage errors={errors} />) : (<p>Results</p>)

	}

	render() {
		return (
			<main className="App">
				<Header />
				{this.showResults()}
			</main>
		)
	}
}

export default App;
