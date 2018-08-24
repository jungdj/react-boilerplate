import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

import HomePageWrapper from "./HomePage.styled"

import PageTemplate from "templates/PageTemplate"

const HomePage = props => {
	return (
		<PageTemplate maxWidth="100%" maxHeaderWidth="1170px" color="deepBlue">
			<Helmet>
				<title>HomePage</title>
			</Helmet>
			<HomePageWrapper>
				<h1>Home Page</h1>
			</HomePageWrapper>
		</PageTemplate>
	)
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default HomePage
