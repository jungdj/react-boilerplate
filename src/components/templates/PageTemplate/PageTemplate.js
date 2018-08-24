import React from "react"
import PropTypes from "prop-types"

import { Main } from "./PageTemplate.styled"
import Header from "organisms/Header"
import Footer from "organisms/Footer"

const PageTemplate = ({ color, maxHeaderWidth, maxWidth, children }) => {
	return (
		<React.Fragment>
			<Header maxWidth={maxHeaderWidth} color={color} />
			{/*<Sidebar />*/}
			<Main maxWidth={maxWidth}>{children}</Main>
			<Footer maxWidth={maxHeaderWidth} />
		</React.Fragment>
	)
}

PageTemplate.propTypes = {
	headerMaxWidth: PropTypes.string,
	maxWidth: PropTypes.string,
}

PageTemplate.defaultProps = {
	maxHeaderWidth: "1440px",
	maxWidth: "1440px",
	color: "white",
}

export default PageTemplate
