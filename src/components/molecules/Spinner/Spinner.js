import React from "react"

import SpinnerWrapper from "./Spinner.styled"

const Spinner = ({ visible = true }) => {
	return (
		visible && (
			<SpinnerWrapper>
				<div className="rect1" />
				<div className="rect2" />
				<div className="rect3" />
				<div className="rect4" />
				<div className="rect5" />
			</SpinnerWrapper>
		)
	)
}

Spinner.propTypes = {}

Spinner.defaultProps = {}

export default Spinner
