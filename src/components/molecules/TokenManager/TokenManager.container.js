import { connect } from "react-redux"

import TokenManager from "./TokenManager"

import { logout } from "store/reducers/auth"

import { isAuthenticated, tokenTimeLeft } from "lib/utils"

const mapStateToProps = state => {
	return {
		isAuthenticated: isAuthenticated(state),
		timeLeft: tokenTimeLeft(state),
	}
}

const mapDispatchToProps = {
	logout,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TokenManager)
