import styled from "styled-components"
import PropTypes from "prop-types"

import FlexBox from "atoms/FlexBox"

import { getSize } from "lib/utils"

const Container = styled(FlexBox)`
	flex-flow: row wrap;
	width: 100%;
	max-width: ${getSize("maxWidth")};
	margin: 0 auto;
`

Container.propTypes = {
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Container.defaultProps = {}

export default Container
