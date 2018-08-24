import React, { Component } from "react"

class TokenManager extends Component {
	show = null
	tickerId = null
	state = { timeLeft: 0, show: false }
	ticker = () => {
		console.log("ticker", this.state.timeLeft)
		if (this.state.timeLeft < 1000) {
			this.props.logout()
			this.setState({ show: false })
			return
		}
		this.setState(prevState => ({ timeLeft: prevState.timeLeft - 1000 }))
	}
	startCounter = () => {
		console.log("start counter")
		const { timeLeft } = this.props

		this.show = setTimeout(() => {
			this.setState({ show: true, timeLeft: 5000 })
			this.tickerId = setInterval(this.ticker, 1000)
		}, timeLeft - 5000)
	}
	removeCounter = () => {
		console.log("remove counter")
		clearTimeout(this.show)
		clearInterval(this.tickerId)
	}

	static getDerivedStateFromProps(props, state) {
		if (!state.show) return { timeLeft: props.timeLeft }
	}

	componentDidMount() {
		if (this.props.isAuthenticated) this.startCounter()
	}

	componentDidUpdate(prevProps) {
		console.log("authed", this.props.isAuthenticated)
		if (!prevProps.isAuthenticated && this.props.isAuthenticated) this.startCounter()
		if (prevProps.isAuthenticated && !this.props.isAuthenticated) this.removeCounter()
	}

	render() {
		const { timeLeft, show } = this.state

		console.log("lifetime", timeLeft)

		return <h1>{show && timeLeft}</h1>
	}
}

TokenManager.propTypes = {}

TokenManager.defaultProps = {
	timeLeft: 0,
}

export default TokenManager
