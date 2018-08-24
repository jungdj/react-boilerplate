import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import FlexBox from "atoms/FlexBox"
import InputAtom from "atoms/Input"
import Input from "molecules/Input"
import Select from "atoms/Select"

const LabeledComponent = ({
	label,
	topRight,
	bottomLeft,
	bottomRight,
	children,
	labelStyle,
	bottomStyle,
	...props
}) => (
	<FlexBox {...props}>
		<label style={labelStyle}>
			{typeof label === "string" ? <span>{label}</span> : label}
			{topRight && <span style={props.topRightStyle}>{topRight}</span>}
		</label>
		<FlexBox className="component">{children}</FlexBox>
		<label style={bottomStyle}>
			{bottomLeft && <span>{bottomLeft}</span>}
			{bottomRight && <span style={props.bottomRightStyle}>{bottomRight}</span>}
		</label>
	</FlexBox>
)

const StyledLabeledComponent = styled(LabeledComponent)`
	width: 100%;
	flex-flow: row wrap;
	.component {
		width: 100%;
		margin: 8px 0;
		> * {
			width: calc(100% / ${props => props.children.length || 1});
			margin-right: 0.75em;
			:last-child {
				margin-right: 0;
			}
		}	
		${InputAtom}, ${Input}, ${Select} {
			margin-bottom: 0;
		}
	}
	
	label {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: flex-end;
		color: #4a4a4a;
	}

`

LabeledComponent.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	topRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	bottomLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	bottomRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	labelStyle: PropTypes.object,
	bottomStyle: PropTypes.object,
	topRightStyle: PropTypes.object,
	bottomRightStyle: PropTypes.object,
}

LabeledComponent.defaultProps = {}

export default StyledLabeledComponent
