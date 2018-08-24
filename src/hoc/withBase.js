import { connect } from "react-redux"
import * as baseActions from "store/reducers/base"

export default connect(
	state => ({
		base: state.get("base"),
		device: state.getIn(["base", "window", "device"]),
		isMobile: state.getIn(["base", "window", "device"]) === "mobile",
	}),
	baseActions
)
