import styled, { css } from "styled-components"
import PropTypes from "prop-types"

import { get } from "lib/utils"

const VerticalLine = css`
	height: 100%;
	width: 0;
	border-right: 1px solid ${get("border")};
`

const HorizontalLine = css`
	width: 100%;
	height: 0;
	border-top: 1px solid ${get("border")};
`
const Line = styled.div`
	padding: 0;
	margin: 0;
	${props => {
		if (props.direction === "vertical") return VerticalLine
		else return HorizontalLine
	}};
`

Line.propTypes = {
	direction: PropTypes.oneOf(["horizontal", "vertical"]).isRequired,
}

Line.defaultProps = {
	direction: "horizontal",
}

export default Line
