import React from "react"
import PropTypes from "prop-types"

import LabeledComponent from "molecules/LabeledComponent"
import Input from "atoms/Input"

const LabeledInput = ({
	label,
	topRight,
	bottomLeft,
	bottomRight,
	labelStyle,
	bottomStyle,
	...inputProps
}) => (
	<LabeledComponent {...{ label, topRight, bottomLeft, bottomRight, labelStyle, bottomStyle }}>
		<Input {...inputProps} />
	</LabeledComponent>
)

LabeledInput.propTypes = {
	...LabeledComponent.propTypes,
	...Input.propTypes,
}

LabeledInput.defaultProps = {}

export default LabeledInput
