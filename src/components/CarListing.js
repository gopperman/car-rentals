import React, { Component } from 'react'
import {PropTypes} from 'prop-types'
import sedan from '../svg/sedan.svg'

class CarListing extends Component {
	render() {
		const {car} = this.props

	    return (
			<div className="car">
				<div className="car__flex">
					<img src={sedan} className="car__thumbnail" alt="This car is a placeholder" />
				</div>
				<div className="car__flex">
					<h3>{car.CarTypeCode}</h3>
					${car.DailyRate} per day
				</div>
				<div className="car__flex">
					Subtotal: ${car.SubTotal}
					Fees: ${car.TaxesandFees}
					Total Price: ${car.TotalPrice}
				</div>
				<div className="car__flex car__links">
					<a href="{car.DeepLink}" target="_blank" className="car__cta">
						Rent Me
					</a>
					<a href="#" className="car__more-toggle">More Information</a>
				</div>
				<div className="car__more">
					<p><b>Pick-up:</b> {car.PickupDay} {car.PickupTime}</p>
					<p><b>Drop-off:</b> {car.DropoffDay} {car.DropoffTime}</p>
					<p><b>Mileage:</b> {car.MileageDescription}</p>
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
