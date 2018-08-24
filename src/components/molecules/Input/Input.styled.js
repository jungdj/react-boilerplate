import styled from "styled-components"

const InputWrapper = styled.span`
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
	input {
		display: inline-block;
		position: relative;
		width: 100%;
		${props => props.prefix && "padding-left: calc(31px + 0.2em);"} ${props =>
			props.subfix && "padding-right: calc(31px + 0.2em);"};
	}
`

export const InputGroupWrapper = styled.span``

export default InputWrapper
