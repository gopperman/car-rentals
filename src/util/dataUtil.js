/**
 * DataUtil.js
 *
 * This file is responsible for methods that massage response data into 
 * digestible chunks for presentation components
 */
import _ from 'lodash' 

/**
 * getErrors pulls error messages from the API response, and transforms 
 * the message object, which can either be an array or 
 * an object with one key, into an array
 * 
 * @param  {object} the API response
 * @return {array} an array of objects in the format:
 * [
 * 		{
 * 			ErrorCode: '11111'},
 * 			ErrorMessage: 'Lorem ipsum dolor...'
 * 		},
 * 		...
 * 	]
 */
const getErrors = (response) => {
	const errors = _.get(response, 'Errors', [])
	return (Array.isArray(errors)) ? errors : [_.get(errors, 'Error', null)]
}

/**
 * Parses response for car data needed to render results component
 * @param  {object} the API response
 * @return {array} An array of cars (or false)
 */
const getCars = (response) => {
	const cars = _.get(response, 'Result', false)
	const meta = _.get(response, 'MetaData.CarMetaData.CarTypes', [])
	// For each car, we're going to map the car type code to an entry in the car
	// metadata array, then return a new object with a join of the two
	if (cars) {
		console.log(cars.map(car => {
			const carType = _.find(meta, (type) =>
				car.CarTypeCode === type.CarTypeCode
			)
			return {
				...car,
				...carType
			}

		}))
	}
	return false
}

export { getErrors, getCars }
