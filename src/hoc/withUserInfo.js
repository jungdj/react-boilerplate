import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActions from "store/reducers/user"

export default ViewComponent =>
	connect(
		(state, ownProps) => {
			// TODO: Detatch detail used in MyTradeFee
			return {
				info: state.getIn(["user", "info"]),
				waitingInfo: state.get("pender").pending["user/GET_USER"],
			}
		},
		dispatch => ({
			UserActions: bindActionCreators(userActions, dispatch),
		})
	)(ViewComponent)
