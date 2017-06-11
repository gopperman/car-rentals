import React, { Component } from 'react'
import {getErrors} from './util/dataUtil.js'
// #TECHDEBT We should really just import the parts of lodash we need
import Header from './components/Header'
import ErrorMessage from './components/ErrorMessage' 

import './App.css'

import data from './data/sample-response-invalid-input.json'

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
		const errors = getErrors(this.state.response)
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
