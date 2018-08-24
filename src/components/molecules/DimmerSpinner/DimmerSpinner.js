import React from "react"
import PropTypes from "prop-types"

import Dimmer from "atoms/Dimmer"
import Spinner from "molecules/Spinner"

const DimmerSpinner = ({ visible }) => {
	if (!visible) return null
	return (
		<Dimmer>
			<Spinner />
		</Dimmer>
	)
}

DimmerSpinner.propTypes = {
	visible: PropTypes.bool,
}

DimmerSpinner.defaultProps = {
	visible: false,
}

export default DimmerSpinner
