import styled from "styled-components"
import { getSize, flexCenter } from "lib/utils"
import { colors } from "lib/theme"

const Table = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	border: 1px solid ${colors.border};
	font-size: 11px;
`

Table.Head = styled.div`
	flex: 1 0 auto;
	display: flex;
	padding-right: 12px;
	color: #999999;
	border-bottom: 1px solid ${colors.border};
	text-transform: capitalize;
`
Table.Body = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 100%;
	min-height: ${getSize("minHeight")};
	height: 100%;
	overflow: auto;
	${props => props.empty && flexCenter};
	div:last-child {
		${props => props.empty && `border-bottom: 1px solid ${colors.border}`};
		${props => props.empty && `margin: 1em`};
	}
`
Table.Row = styled.div`
	display: flex;
	padding: 3px 12px 3px 0;
	& + & {
		border-top: 1px solid ${colors.border};
	}
	${props => props.bgColor && `background-color: ${props.bgColor}`};
`
Table.Col = styled.div`
	flex: ${props => (props.flexRatio ? props.flexRatio : 1)};
	padding: 4px 0 4px 12px;
	margin: auto;
	word-break: break-all;

	${props =>
		props.center &&
		`
		text-align: center;
		${flexCenter()};
	`};
	${props => props.right && `text-align: right`};
	${props => props.color && `color:${props.color}`};
	${props => props.uppercase && `text-transform: uppercase`};
`

Table.propTypes = {}

Table.defaultProps = {}

export default Table
