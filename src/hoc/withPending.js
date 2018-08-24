import { connect } from "react-redux"

export default ViewComponent =>
	connect(
		(state, ownProps) => ({
			pending: state.get("pender").pending,
		}),
		dispatch => ({})
	)(ViewComponent)
