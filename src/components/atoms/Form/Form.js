import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Form = ({ children, onSubmit, ...props }) => (
	<form
		{...props}
		onSubmit={e => {
			e.preventDefault()
			onSubmit(e)
		}}
	>
		{children}
	</form>
)

const StyledForm = styled(Form)`
	width: 100%;
`

Form.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}

Form.defaultProps = {
	onSubmit: () => {
		alert("submit")
	},
}

export default StyledForm
