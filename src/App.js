import React, { Component } from 'react'
// #TECHDEBT We should really just import the parts of lodash we need
import _ from 'lodash'
import serialize from 'form-serialize'
import {getErrors} from './util/dataUtil.js'
import Header from './components/Header'
import ErrorMessage from './components/ErrorMessage'
import Results from './components/Results'

import './App.css'

import data from './data/sample-response.json'

class App extends Component {
	constructor() {
		super()

		// Set initial state
		// We don't use camelcase here to match the API format
		this.state = { 
			response: data, // 'Cached' API response
			query: {
				dest: 'BOS',
				startdate: '01/20/2018',
				enddate: '01/23/2018',
				pickuptime: '10:00',
				dropofftime: '13:30'
			}
    	}
	}

	search(event) {
		event.preventDefault();

		const form = document.querySelector('.search'),
			query = serialize(form, { hash: true }),
			urlParams = serialize(form),
			// #TECHDEBT: Under normal circumstances, this key shouldn't be 'public',
			// but you could guess it by watching your network tab anyway
			requestUrl = `http://api.hotwire.com/v1/search/car?key=mbduyn72ef3zgfcm4wxrhu9y&format=json&${urlParams}`,
			requestHeaders = new Headers(),
			requestSettings = { 
				method: 'GET',
            	headers: requestHeaders,
            	mode: 'no-cors',
            	cache: 'default' }
			
			fetch(requestUrl).then( (response) =>{
				console.log(response)
			})
			console.log(requestUrl)
	}
	/**
	 * Renders components conditionally based on the response body
	 * 
	 * @return {Component} the component(s) to render
	 */
	showResults() {
		const errors = getErrors(this.state.response),
			cars = _.get(this.state.response, 'Result', null)

		/**
		 * If we have one or more errors, render error messaging.
		 * Otherwise, show results!
		 */
		return (errors.length > 0) ? 
			<ErrorMessage errors={errors} /> 
		:
			<Results cars={cars} dest={this.state.query.dest} />

	}

	shouldComponentUpdate(nextProps, nextState) {
		return !_.isEqual(this.state, nextState)
	}

	render() {
		const {query} = this.state
		// TODO: Move search form to its own component, manage state with pub/sub
		return (
			<main className="App">
				<Header />
				<form className="search">
					<p>
						I'm looking to pick up my rental in <input type="text" name="dest" defaultValue={query.dest} /> 
						on <input className="search__text" type="text" name="startdate" defaultValue={query.startdate} /> 
						at <input className="search__text" type="text" name="pickuptime" defaultValue={query.pickuptime} />
					</p>
					<p>
						I want to return the car on <input type="text" name="enddate" defaultValue={query.enddate} /> 
						at <input className="search__text" type="text" name="dropofftime" defaultValue={query.dropofftime} />
					</p>
					<button className="search__submit" onClick={this.search}>Search</button>
				</form>
				{this.showResults()}
			</main>
		)
	}
}

export default App;
