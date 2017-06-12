import React, { Component } from 'react'
// #TECHDEBT We should really just import the parts of lodash we need
import _ from 'lodash'
import serialize from 'form-serialize'
import {getErrors} from './util/dataUtil.js'
import Header from './components/Header'
import ErrorMessage from './components/ErrorMessage'
import Results from './components/Results'
import './App.css'

class App extends Component {
	constructor() {
		super()

		// Set initial state
		// We don't use camelcase here to match the API format
		this.state = { 
			query: {
				dest: 'BOS',
				startdate: '01/20/2018',
				enddate: '01/23/2018',
				pickuptime: '10:00',
				dropofftime: '13:30'
			}
    	}

    	this.search = this.search.bind(this)
	}

	/**
	 * Serializes form input and kicks off a request to Hotwire
	 * @param  {object} event
	 * @return {void}
	 */
	search(event) {
		event.preventDefault();

		const form = document.querySelector('.search'),
			query = serialize(form, { hash: true }),
			urlParams = serialize(form),
			// #TECHDEBT: Under normal circumstances, this key shouldn't be 'public',
			// but you could get it by watching your network tab anyway
			requestUrl = `https://api.hotwire.com/v1/search/car?apikey=mbduyn72ef3zgfcm4wxrhu9y&format=json&${urlParams}`,
			requestHeaders = new Headers(),
			requestSettings = { 
				method: 'GET',
            	headers: requestHeaders,
            	mode: 'cors',
            	cache: 'default',
            }

			// #TODO: Fix CORS
			fetch(requestUrl, requestSettings).then((response) => {
				return response.json()
			})
			.then((data) => {
				this.setState({
					response: data,
					query: query
				})
			})
			.catch((err) => {
				// Let's trigger error rendering by fudging the state a little
				console.log(err)
				this.setState({
					response: {
						Errors: [err]
					}
				})
			})
	}

	/**
	 * Renders components conditionally based on the response body
	 * 
	 * @return {Component} the component(s) to render
	 */
	showResults() {
		const errors = getErrors(this.state.response),
			cars = _.get(this.state.response, 'Result', false)

		/**
		 * If we have one or more errors, render error messages
		 * @param  {int}
		 */
		if(errors.length > 0) {
			return <ErrorMessage errors={errors} /> 
		} else {
			/**
			 * If response included cars, render the results
			 * @param  {object}
			 */
			if (cars) {
				return <Results cars={cars} dest={this.state.query.dest} />
			}
		}
		return null
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log(!_.isEqual(this.state, nextState))
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
