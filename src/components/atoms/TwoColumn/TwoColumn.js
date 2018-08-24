import styled from "styled-components"

import FlexBox from "atoms/FlexBox"
import InputAtom from "atoms/Input"
import Input from "molecules/Input"
import Error from "atoms/Error/Error.styled"
import Select from "atoms/Select"
import Line from "atoms/Line"

import { colors } from "lib/theme"
import { media } from "lib/utils"

const TwoColumn = styled(FlexBox)`
	display: flex;
	width: 100%;
	
	flex-flow: row ${props => (props.reverse ? "wrap-reverse" : "wrap")};
	align-items: ${props => (props.reverse ? "flex-end" : "flex-start")};
	section {
		width: 100%;
	}
	section + section {
		${props => (props.reverse ? "margin-bottom: 1.5em" : "margin-top: 1.5em")};
	}


	${media.tablet`
 		section {
 			margin-right: 4em; 
 			width: calc(50% - 4em);
 		}
 		section + section {
			margin-top: 0;
 			margin-bottom: 0;
		}
 	`};
	
	h2 {
		margin-bottom: 1.5em;
	}

	h3 {
		margin-bottom: 1.2em;
	}

	ul {
		margin-bottom: 1.5em;
	}

	p:not(${Error}) {
		margin-bottom: 0.75em;
		color: ${colors.brownishGrey};
	}

	${InputAtom}, ${Input}, ${Select} {
		margin-bottom: 1em;
	}

	input[type="checkbox"] {
		transform: scale(1.2);
	}

	button {
		margin: 1.5em 0;
	}

	${Line} {
		margin: 1.5em 0;
	}
`

TwoColumn.First = styled.section``

TwoColumn.Second = styled.section``

TwoColumn.defaultProps = {
	justifyContent: "flex-start",
	alignItems: "flex-start",
}
export default TwoColumn
