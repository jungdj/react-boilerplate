import styled, { css } from "styled-components"
import { media } from "lib/utils"

const disabled = css`
	color: #999999;
	background-color: #f7f8f9;
`

const Input = styled.input`
	display: flex;
	flex: 1;
	height: 40px;
	border-radius: 3px;
	border: solid 1px #cccccc;
	font-size: 16px;
	color: #4a4a4a;
	padding: 11px 12px;
	outline: none;
	${media.tablet`
     height: 48px;
  `};
	${props => props.disabled && disabled};
	&[type="number"]::-webkit-inner-spin-button,
	&[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`

Input.propTypes = {}

Input.defaultProps = {
	disabled: false,
}

export default Input
