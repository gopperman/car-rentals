import React, { Component } from 'react'
import {PropTypes} from 'prop-types'
import sedan from '../svg/sedan.svg'

class CarListing extends Component {
	/**
	 * Toggles accordion state for "more information section"
	 * @param  {object} event 
	 * @return {void}
	 */
	toggleMore(event) {
		const more = event.target.nextSibling,
			moreClass = 'car__more--expanded',
			toggleClass = 'car__more-toggle--expanded'

		// #TODO: We could use classNames here
		if (more.className.includes(moreClass)) {
			more.className = more.className.replace(moreClass, '')
			event.target.className = event.target.className.replace(toggleClass, '')
		} else {
			more.className += ` ${moreClass}`
			event.target.className += ` ${toggleClass}`
		}
	}

	render() {
		const {car} = this.props
		console.log(car)

	    return (
			<div className="car">
				<div className="car__flex-container">
					<div className="car__flex">
						<img src={sedan} className="car__thumbnail" alt="This car is a placeholder" />
					</div>
					<div className="car__flex">
						<h3 className="car__type">{car.CarTypeName}</h3>
						<p className="car__possible">{car.PossibleModels}</p>
						<p className="car__seating">Seats {car.TypicalSeating}</p>
						<p className="car__rate">${car.DailyRate} per day</p>
					</div>
					<div className="car__pricing car__flex">
						<p className="car__subtotal">Subtotal: ${car.SubTotal}</p>
						<p className="car__fees">+ Fees: ${car.TaxesAndFees}</p>
						<p className="car__total-price">Total Price: ${car.TotalPrice}</p>
					</div>
					<div className="car__flex car__links">
						<a href={car.DeepLink} rel="noopener noreferrer" target="_blank" className="car__cta">
							Rent Me
						</a>
					</div>
				</div>
				<button onClick={this.toggleMore} className="car__more-toggle">
					More Information
				</button>
				<div className="car__more">
					<p><b>Possible Features:</b> {car.PossibleFeatures}</p>
					<p><b>Mileage:</b> {car.MileageDescription}</p>
					<p><b>Pick-up:</b> {car.PickupDay}, {car.PickupTime}</p>
					<p><b>Drop-off:</b> {car.DropoffDay}, {car.DropoffTime}</p>
					<p><b>Vendor Location:</b> {car.VendorLocationId}</p>
					<p><b>Location Description:</b> {car.LocationDescription}</p>
				</div>
			</div>
	    )
	}
}

CarListing.propTypes = {
	car: PropTypes.object.isRequired,
}

export default CarListing
