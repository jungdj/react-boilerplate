import styled from "styled-components"
import PropTypes from "prop-types"

import { media, getSize } from "lib/utils"

const Image = styled.div`
	width: ${getSize("width")};
	height: ${getSize("height")};
	min-height: ${getSize("minHeight")};
	max-height: ${getSize("maxHeight")};

	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	background-image: url(${props => props.url});
	margin: 0 auto;
	padding-bottom: ${getSize("paddingBottom")};

	${media.tablet`
	    width: ${props => (typeof props.width === "number" ? `${props.width * 1.3}px` : props.width)};
		height: ${props => (typeof props.height === "number" ? `${props.height * 1.3}px` : props.height)};
	`};
`

Image.propTypes = {
	url: PropTypes.string.isRequired,
}

Image.defaultProps = {
	width: 20,
	height: 20,
}

export default Image
