import styled from "styled-components"

import { colors } from "lib/theme"
import { media } from "lib/utils"

const RadioButton = styled.input.attrs({
	type: "radio",
})`
	appearance: none;
	outline: none;
	margin-left: auto;
	border-radius: 50%;
	width: 24px;
	height: 24px;
	border: 1px solid ${colors.border};
	${media.tablet`
	    width: 32px;
	    height: 32px;
	`} &:checked {
		background-color: ${colors.azure};
		box-shadow: inset 0 0 0 5px #fff;
	}
	:disabled {
		background-color: #f7f8f9;
	}
`

RadioButton.propTypes = {}
RadioButton.defaultProps = {}

export default RadioButton
