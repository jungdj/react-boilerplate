import React, { PureComponent } from "react"

import DimmerWrapper from "./Dimmer.styled"

class Dimmer extends PureComponent {
	componentDidMount() {
		// hides scroll-y
		document.body.style.overflowY = "hidden"
	}

	componentWillUnmount() {
		// shows scroll-y
		document.body.style.overflowY = "auto"
	}

	render() {
		return <DimmerWrapper {...this.props}>{this.props.children}</DimmerWrapper>
	}
}

Dimmer.propTypes = {}

Dimmer.defaultProps = {}

export default Dimmer
