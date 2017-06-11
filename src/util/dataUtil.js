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

export { getErrors }