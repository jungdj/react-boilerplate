import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import InputAtom from "atoms/Input"

const Input = ({ prefix, subfix, left, right, className, ...props }) => (
	<span className={className}>
		{left && <span className="left">{left}</span>}
		<InputAtom {...props} style={{ margin: 0 }} />
		{right && <span className="right">{right}</span>}
		{prefix && <span className="prefix">{prefix}</span>}
		{subfix && <span className="subfix">{subfix}</span>}
	</span>
)

const StyledInput = styled(Input)`
	display: flex;
	position: relative;
	width: 100%;

	.subfix,
	.prefix {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		line-height: 0;
		width: 20px;
		height: 20px;
		> * {
			width: 100%;
			height: 100%;
			color: grey;
		}
	}
	.prefix {
		left: 12px;
	}
	.subfix {
		right: 12px;
	}

	.left,
	.right {
		flex: 0 0 auto;
	}

	input {
		display: inline-block;
		position: relative;
		flex: 0 1 100%;
		${props => props.prefix && "padding-left: calc(39px + 0.2em);"};
		${props => props.subfix && "padding-right: calc(39px + 0.2em);"};
	}
`

Input.propTypes = {
	prefix: PropTypes.element,
	subfix: PropTypes.element,
	left: PropTypes.element,
	right: PropTypes.element,
}

Input.defaultProps = {}

export default StyledInput
