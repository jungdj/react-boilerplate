import styled from "styled-components"
import { zIndexs } from "lib/theme"

const DimmerWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);

	display: flex;
	justify-content: center;
	align-items: center;
	z-index: ${zIndexs.dimmer};
`

export default DimmerWrapper
