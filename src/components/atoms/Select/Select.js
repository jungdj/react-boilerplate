import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import ReactSelect from "react-select"
import { translate } from "react-i18next"

class Select extends React.PureComponent {
	onChange = option => {
		const { name, onChange } = this.props
		if (Array.isArray(option))
			return onChange({
				target: {
					name,
					value: "",
				},
			})

		onChange({
			target: {
				name,
				value: option.value,
			},
		})
	}

	render() {
		const { t, options, noTrans, onChange, ...props } = this.props

		let safeOptions = options
		if (!options.length) {
			safeOptions = []
		} else {
			if (typeof options[0] !== "object") {
				safeOptions = options.map(value => ({ value }))
			}
			if (!options[0].hasOwnProperty("label")) {
				safeOptions = safeOptions.map(option => ({
					...option,
					label: noTrans
						? option.value
						: t(["", "MyPage:", "Auth:"].map(ns => `${ns}${option.value}`)),
				}))
			}
		}

		return <ReactSelect options={safeOptions} onChange={this.onChange} {...props} />
	}
}

Select.disabled = ({ label }) => <ReactSelect options={[]} isDisabled value={{ label }} />

const StyledSelect = styled(Select)``

Select.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	noTrans: PropTypes.bool,
	options: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.shape({
				value: PropTypes.any,
				label: PropTypes.string,
			}),
		])
	).isRequired,
}

Select.defaultProps = {}

export default translate()(StyledSelect)
