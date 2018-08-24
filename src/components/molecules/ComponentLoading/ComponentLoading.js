import React from "react"
import Button from "atoms/Button"

import ComponentLoadingWrapper from "./ComponentLoading.styled"

import DimmerSpinner from "molecules/DimmerSpinner"

const ComponentLoading = props => {
	if (props.error) {
		return (
			<ComponentLoadingWrapper>
				Error!
				<Button blue onClick={props.retry}>
					Retry
				</Button>
			</ComponentLoadingWrapper>
		)
	} else if (props.timedOut) {
		return (
			<ComponentLoadingWrapper>
				Taking a long time...
				<button onClick={props.retry}>Retry</button>
			</ComponentLoadingWrapper>
		)
	} else if (props.pastDelay) {
		return <DimmerSpinner visible={true} />
	} else {
		return null
	}
}

ComponentLoading.propTypes = {}

ComponentLoading.defaultProps = {}

export default ComponentLoading
