import styled from "styled-components"

import { get, getSize } from "lib/utils"
import { colors } from "lib/theme"

const FlexBox = styled.div`
	display: flex;
	flex-flow: ${get("flexFlow")};
	justify-content: ${get("justifyContent")};
	align-items: ${get("alignItems")};
	min-height: ${getSize("minHeight")};
	width: ${getSize("width")};
	height: ${getSize("height")};
	flex-direction: ${get("flexDirection")};
	${props => props.border && `border: 1px solid ${colors.border};`};
`

FlexBox.defaultProps = {
	flexFlow: "row nowrap",
	justifyContent: "center",
	alignItems: "center",
}

export default FlexBox
