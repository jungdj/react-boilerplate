import styled, { css } from "styled-components"
import { media } from "lib/utils"
import { colors } from "lib/theme"

export const blue = css`
	background-color: #0090ff;
	border-color: #0090ff;
	color: #ffffff;
	&:hover {
		background-color: #0061e0;
		border: 1px solid #0061e0;
		color: #ffffff;
	}
`
export const blueBorder = css`
	border-color: #0090ff;
	color: #0090ff;
	&:hover {
		background-color: #0090ff;
		color: #ffffff;
	}
`
export const white = css`
	background-color: white;
	border-color: #fff;
	color: #194386;
	&:hover {
		background-color: #006bd6;
		border-color: #006bd6;
		color: #fff;
	}
`

export const whiteBorder = css`
	background-color: transparent;
	border-color: #fff;
	color: #fff;
	&:hover {
		background-color: #0090ff;
		border-color: #0090ff;
	}
`

export const redBorder = css`
	background-color: #fff;
	border: 1px solid #ff5858;
	color: #ff5858;
	&:hover {
		background-color: #ff5858;
		color: #fff;
	}
`
export const greenBorder = css`
	background-color: #fff;
	color: #05d27e;
	border-color: #05d27e;
	&:hover {
		background-color: #05d27e;
		color: #fff;
	}
`

export const disabled = css`
	background-color: #f7f8f9;
	border-color: ${colors.brownishGrey};
	color: ${colors.warmGrey};
	pointer-events: none;
`

const StyledButton = styled.button`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	outline: none;
	font-size: 14px;
	border-radius: 3px;
	background-color: white;
	border: 1px solid white;
	width: 100%;

	${media.tablet`
		height: 48px;
		font-size: 16px;
		${props => props.xSmall && "width: 120px"};
		${props => props.small && "width: 180px"};
		${props => props.normal && "width: 240px"};
		${props => props.large && "width: 480px"};
	`};

	${props => props.blue && blue};
	${props => props.blueBorder && blueBorder};
	${props => props.white && white};
	${props => props.whiteBorder && whiteBorder};
	${props => props.redBorder && redBorder};
	${props => props.disabled && disabled};
	${props => props.greenBorder && greenBorder};

	a {
		text-decoration: none;
		color: inherit;
	}
`

export const ButtonGroup = styled.div`
	display: flex;
	button + button {
		margin-left: 10px;
	}
`

export default StyledButton
