import { PureComponent } from "react"
import socket from "lib/socket"

class SocketSubscriber extends PureComponent {
	componentDidMount() {
		socket.subscribe(this.props)
	}

	componentDidUpdate(prevProps) {
		socket.unsubscribe(prevProps)
		socket.subscribe(this.props)
	}

	componentWillUnmount() {
		socket.unsubscribe(this.props)
	}

	render() {
		return null
	}
}

export default SocketSubscriber
