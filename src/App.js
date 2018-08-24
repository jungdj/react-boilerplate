import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import WindowResizeListener from "containers/WindowResizeListener"
import Core from "containers/Core"

import ScrollToTop from "atoms/ScrollToTop"

import { crashReport } from "lib/api/report"

import { HomePage } from "pages"
import Page404 from "pages/Page404"

//import { PrivateRoute, PublicRoute } from "hoc/AuthRoutes"

class App extends Component {
	state = { error: null, errorInfo: null }

	componentDidCatch(error, errorInfo) {
		// Catch errors in any components below and re-render with error message
		if (process.env.NODE_ENV !== "production") {
			this.setState({
				error: error,
				errorInfo: errorInfo,
			})
		} else {
			crashReport({
				error: error.toString(),
				errorInfo,
			})
			alert("Something went wrong. Please contact us if this error continues to appear.")
		}
		// You can also log error messages to an error reporting service here
	}

	componentDidMount() {
		const onSWUpdateFound = () => {
			setTimeout(() => window.location.reload(), 3000)
			this.setState({ swInfo: "New content is available. Refreshing your page in 3 second." })
		}
		const onOfflineUsageDetected = () => {
			this.setState({
				swInfo: "No internet connection found. App is running in offline mode.",
			})
			setTimeout(() => this.setState({ swInfo: "" }), 3000)
		}
		if (window.swUpdateFound) onSWUpdateFound()
		else window.onSWUpdateFound = onSWUpdateFound

		if (window.offlineUsageDetected) onOfflineUsageDetected()
		else window.onOfflineUsageDetected = onOfflineUsageDetected
	}

	render() {
		if (this.state.errorInfo) {
			// Error path
			return (
				<div>
					<h1>Something went wrong.</h1>
					<h3>Please take a screen shot and send it to Jin.</h3>
					<p>Thanks a lot.</p>
					<details style={{ whiteSpace: "pre-wrap" }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo.componentStack}
					</details>
				</div>
			)
		}

		return (
			<React.Fragment>
				{this.state.swInfo && (
					<div className="s-alert-inner">
						<div className="s-alert-box">
							<div
								style={{
									width: "100%",
									maxWidth: "100%",
									bottom: "auto",
									right: 0,
									top: 0,
									color: "white",
								}}
							>
								{this.state.swInfo}
							</div>
						</div>
					</div>
				)}

				<Core />
				<WindowResizeListener />

				<Route path="/:route?" component={ScrollToTop} />

				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/404" component={Page404} />
					<Redirect to="/404" />
				</Switch>
			</React.Fragment>
		)
	}
}

export default App
