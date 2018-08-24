import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { translate } from "react-i18next"

import Input from "molecules/Input"

import { formatNumber, floorFloat, Debugger } from "lib/utils"

const debug = Debugger("Input", false)

@translate()
class CustomInput extends PureComponent {
	state = { value: "", focus: false }

	componentDidUpdate(prevProps, prevState) {
		// Parent state change is occurred by external reason not CustomInput's change.
		if (prevProps.value !== this.props.value && this.props.value !== this.state.value) {
			if (this.props.type === "int") this.forceIntStep()
			else if (this.props.type === "float") this.reformatParent()
		}
		if (prevState.focus && !this.state.focus) {
			if (this.props.type === "int") this.forceIntStep()
			else if (this.props.type === "float") this.reformatParent()
		}
	}

	// ** UTILS **

	removeSeparator = string => {
		const tester = formatNumber(1234)
		if (tester === "1.234") return string.replace(/[\.-]/g, "").replace(",", ".")
		else return string.replace(/[,-]/g, "")
	}

	setDecimalSeparator = string => {
		const tester = formatNumber(1234)
		if (tester === "1.234") return string.replace(".", ",")
		else return string
	}

	forceIntStep = () => {
		const { type, step, onChange, name, value } = this.props
		debug.log("Force Int Step")
		debug.log("====", { step, value })
		if (type !== "int" || !step || Math.log10(step) < 0) return

		const numValue = parseInt(value, 10)
		const returnValue = numValue > step ? numValue - (numValue % step) : numValue
		debug.log("====", { returnValue })
		onChange({ target: { name, value: returnValue.toString() } })
	}

	// ** Parsers **

	intParser = value => {
		debug.log("Int Parser")
		debug.log("==== Given : ", value, typeof value)

		// For empty string
		const separatorRemoved = this.removeSeparator(value)
		debug.log("====", { separatorRemoved })
		if (separatorRemoved === "") return ""

		debug.log("==== Test if int", /^\d+$/.test(separatorRemoved))
		if (!/^\d+$/.test(separatorRemoved)) return this.props.value

		if (this.props.formatOnlyOnBlur && this.state.focus) return separatorRemoved // For many zeros at beginning

		return parseInt(separatorRemoved, 10).toString()
	}

	floatParser = value => {
		debug.log("Float Parser")
		debug.log("==== Given : ", value, typeof value)

		// For empty string
		const separatorRemoved = this.removeSeparator(value)
		debug.log("====", { separatorRemoved })
		if (separatorRemoved === "") return ""

		debug.log("==== Test if float", new RegExp("^[0-9]+([.][0-9]*)?$").test(separatorRemoved))
		if (!new RegExp("^[0-9]+([.][0-9]*)?$").test(separatorRemoved)) return this.props.value

		const [int, frac] = separatorRemoved.split(".")
		let parsedInt =
			this.props.formatOnlyOnBlur && this.state.focus ? int : parseInt(int, 10).toString() // For many zeros at beginning
		debug.log("==== Test if int", { int, frac })
		if (frac === undefined) return parsedInt

		const { step } = this.props
		debug.log("==== Check Step", { step })
		const maxFD = step ? Math.abs(Math.log10(step)) : 20
		return `${parsedInt}.${frac.substring(0, maxFD)}`
	}

	// ** Formatter

	formatter = value => {
		debug.log("Formatter")
		debug.log("==== Given : ", value, typeof value)
		if (!value) return "" // NO need to calculate
		const safeString = typeof value !== "string" ? value.toString() : value

		if (this.props.formatOnlyOnBlur && this.state.focus) {
			return this.setDecimalSeparator(safeString)
		}

		const dotIndex = safeString.indexOf(".")
		const endWithDot = dotIndex === safeString.length - 1
		const isDecimal = endWithDot || dotIndex !== -1

		debug.log("====", { isDecimal })
		if (!isDecimal) return formatNumber(safeString, 0)

		const { step } = this.props
		const maxFD = step ? Math.abs(Math.log10(step)) : 20
		const numOfDigits = safeString.length - 1 - dotIndex
		const minFD = maxFD > numOfDigits ? numOfDigits : maxFD
		const flooredFloat = floorFloat(safeString, minFD)

		debug.log("====", { endWithDot })
		if (!endWithDot)
			return formatNumber(parseFloat(flooredFloat), maxFD, {
				minimumFractionDigits: minFD,
			})

		const tester = formatNumber(1234)
		const dot = tester === "1.234" ? "," : "."

		return (
			formatNumber(parseFloat(flooredFloat), maxFD, {
				minimumFractionDigits: minFD,
			}) + dot
		)
	}

	// ** CORE **

	parseValue = value => {
		const { type } = this.props
		const { intParser, floatParser } = this
		switch (type) {
			case "int":
				return intParser(value)
			case "float":
				return floatParser(value)
			default:
				return value
		}
	}

	formatValue = value => {
		if (value !== 0 && !value) return ""
		debug.log("Format Value")
		const formatted = this.formatter(value.toString())
		debug.log("==== Format Value Return", { formatted })
		return formatted
	}

	// ** UPDATE PARENT **

	handleChange = e => {
		debug.log("Change Parent")
		const parsedValue = this.parseValue(e.target.value)
		debug.log("==== Change Parent", { parsedValue })
		this.setState({ value: parsedValue })
		this.props.onChange({
			target: {
				name: [e.target.name],
				value: parsedValue,
			},
		})
	}

	reformatParent = () => {
		const { value, name } = this.props
		debug.log("Reformat Parent")
		debug.log("==== >>>>> ====")
		const parsedValue = this.parseValue(this.formatValue(value.toString()))
		debug.log("==== <<<<< ====")
		debug.log("==== Reformat Parent", { parsedValue })
		this.setState({ value: parsedValue })
		this.props.onChange({
			target: {
				name,
				value: parsedValue,
			},
		})
	}
	// ** render **

	render() {
		const { value, type, ...props } = this.props
		const formattedValue = this.formatValue(value)

		let downProps = {}
		if (type === "int") downProps.maxLength = 15
		if (type === "float") downProps.maxLength = 16
		Object.assign(downProps, props)

		return (
			<Input
				{...downProps}
				value={formattedValue}
				type="text"
				onChange={this.handleChange}
				onBlur={() => this.setState({ focus: false })}
				onFocus={() => this.setState({ focus: true })}
			/>
		)
	}
}

CustomInput.propTypes = {
	...Input.propTypes,
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	type: PropTypes.oneOf(["int", "float"]).isRequired,
	step: PropTypes.number,
	formatOnlyOnBlur: PropTypes.bool,
}

CustomInput.defaultProps = {
	formatOnlyOnBlur: false,
}

export default CustomInput
