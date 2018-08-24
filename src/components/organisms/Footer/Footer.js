import React from "react"

import Container from "atoms/Container"

import FooterWrapper from "./Footer.styled"

const Footer = props => {
	return (
		<FooterWrapper>
			<Container maxWidth={props.maxWidth} className="container">
				<h1>Footer</h1>
			</Container>
		</FooterWrapper>
	)
}

Footer.propTypes = {}

Footer.defaultProps = {}

export default Footer
