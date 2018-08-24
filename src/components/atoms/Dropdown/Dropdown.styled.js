import styled from "styled-components"

import { flexCenter } from "lib/utils"
import { zIndexs } from "lib/theme"

export const Content = styled.ul`
	list-style: none;
	//list-style-type: none; // IE 9
	padding-left: 0;

	max-height: 0;
	overflow: scroll;
	position: absolute;
	transition: max-height 250ms;
	z-index: ${zIndexs.dropDown};
	// min-width: 180px;
	background-color: #ffffff;
	border-left: solid 1px #dee7f2;
	border-right: solid 1px #dee7f2;

	a {
		padding: 8px 10px;
		display: block;
		font-size: 12px;
		text-align: left;
		color: #333333;
	}
	a:hover {
		background-color: #f7f8f9;
	}
	a.active {
		color: #94d7ff;
	}
`

export const Item = styled.li`
	:first-child {
		border-top: solid 2px #dee7f2;
	}
`

export const Head = styled.div`
	width: 100%;
	height: 100%;
	cursor: pointer;
	justify-content: flex-end;
	align-items: center;
	display: flex;
`

const Wrapper = styled.div`
	position: relative;
	display: inline-block;

	${Content}.show {
		max-height: 10em;
		border-bottom: solid 1px #dee7f2;
		cursor: pointer;
	}
`

export default Wrapper
