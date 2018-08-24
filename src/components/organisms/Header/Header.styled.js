import styled, { css } from "styled-components"

import { media, get } from "lib/utils"
import { zIndexs } from "lib/theme"

const white = css`
	color: ${get("black")};
	p {
		color: ${get("black")};
	}
	border-bottom: 1px solid ${get("pinkishGreyTwo")};
`

const colored = css`
	color: ${get("white")};
	p {
		color: ${get("white")};
	}
`

const colorThemes = {
	white,
	colored,
}

const HeaderWrapper = styled.header`
	width: 100%;
	position: fixed;
	height: 60px;
	display: block;
	top: 0;
	z-index: ${zIndexs.header};
	background-color: ${props => props.theme[props.color]};
	${props => colorThemes[props.color === "white" ? "white" : "colored"]};
	transition: all 0.3s ease-in;

	.container {
		height: 100%;
		padding: 0 1em;
		display: flex;
		align-items: center;
	}

	button {
		display: none;
		${media.desktop`
		display: block;
		width: 80px !important;
		height: 32px !important;
	  	font-size: 12px;
	`};
	}
`

export default HeaderWrapper
