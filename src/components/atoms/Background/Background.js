import styled from "styled-components"

import { colors } from "lib/theme"

const Background = styled.div`
	background: ${props => props.background};
	background-color: ${props => colors[props.color]};
`

Background.propTypes = {}

Background.defaultProps = {}

export default Background
