import { bindActionCreators, compose } from "redux"
import { connect } from "react-redux"
import * as baseActions from "store/reducers/base"

import Header from "./Header"

import { logout } from "store/reducers/auth"
import { isAuthenticated } from "lib/utils"

const mapStateToProps = state => {
	return {
		isAuthenticated: isAuthenticated(state),
	}
}

const mapDispatchToProps = dispatch => ({
	logout: bindActionCreators(logout, dispatch),
	BaseActions: bindActionCreators(baseActions, dispatch),
})

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(Header)
