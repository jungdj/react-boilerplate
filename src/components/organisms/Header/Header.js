import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import HeaderWrapper from "./Header.styled"

import Container from "atoms/Container"
import Logo from "atoms/Logo"
import TokenManager from "molecules/TokenManager"

class Header extends PureComponent {
	render() {
		const { maxWidth, color } = this.props

		return (
			<HeaderWrapper color={color}>
				<TokenManager />
				<Container className="container" maxWidth={maxWidth}>
					<Logo type={color === "white" ? "colored" : "white"} />
				</Container>
			</HeaderWrapper>
		)
	}
}

Header.propTypes = {
	isAuthenticated: PropTypes.bool,
	color: PropTypes.string,
}

Header.defaultProps = {
	isAuthenticated: false,
	color: "white",
	maxWidth: "1440px",
}

export default Header
