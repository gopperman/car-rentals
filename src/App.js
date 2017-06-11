import React, { Component } from 'react';
import Header from './components/Header' 
import './App.css';
import data from './data/sample-response.json'

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
	render() {
		return (
			<Header />
		)
	}
}

export default App;
