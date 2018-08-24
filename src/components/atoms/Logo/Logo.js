import styled from "styled-components"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { media } from "lib/utils"

import colored from "static/images/logo/logo_colored.svg"
import white from "static/images/logo/logo_white.svg"
import grey from "static/images/logo/logo_grey.svg"

const types = { colored, white, grey }

const Logo = styled(Link)`
	display: inline-block;
	background-repeat: no-repeat;
	${props =>
		props.size === "large"
			? "width: 178px; height: 48px; background-size: 178px 48px;"
			: "width: 100px; height: 27px; background-size: 100px 27px;"};
	${media.tablet`
		${props =>
			props.size === "large"
				? "width: 200px; height: 54px; background-size: 200px 54px;"
				: "width: 126px; height: 34px; background-size: 126px 34px;"};
	`};

	background-image: url(${props => types[props.type]});
`

Logo.propTypes = {
	type: PropTypes.oneOf(Object.keys(types)),
}

Logo.defaultProps = {
	type: "colored",
	to: "/",
}

export default Logo
