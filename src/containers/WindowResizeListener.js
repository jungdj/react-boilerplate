import { Component } from "react"

import withBase from "hoc/withBase"

import { mediaSizes } from "lib/variables"
import { setDevice } from "lib/utils"

class WindowResizeListener extends Component {
	timeout = false
	delay = 250

	updateSize = () => {
		const width = window.innerWidth
		let device = "mobile"
		if (mediaSizes.tablet < width) device = "tablet"
		if (mediaSizes.desktop < width) device = "desktop"

		setDevice(device)
		this.props.setWindowSize({
			width: width,
			height: window.innerHeight,
			device,
		})
	}

	listener = () => {
		clearTimeout(this.timeout)
		this.timeout = setTimeout(this.updateSize, this.delay)
	}

	componentDidMount() {
		this.updateSize()
		window.addEventListener("resize", this.listener)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.listener)
	}

	render() {
		return null
	}
}

export default withBase(WindowResizeListener)
