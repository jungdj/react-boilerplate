import React from "react"
import { Redirect, Route } from "react-router-dom"
import { connect } from "react-redux"
import { getUserState, isAuthenticated } from "lib/utils"
import { STAGES } from "lib/variables"

const mapStateToProps = state => ({
	isAuthenticated: isAuthenticated(state),
	state: getUserState(state),
})

export const PrivateRoute = connect(
	mapStateToProps,
	null
)(({ component: Component, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/auth/login",
						state: { referrer: props.location.pathname },
					}}
				/>
			)
		}
	/>
))

export const PublicRoute = connect(
	mapStateToProps,
	null
)(({ component: Component, isAuthenticated, state: userState, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (isAuthenticated) {
					const state = props.location.state
					if (state && state.referrer === "comeback") props.history.goBack()
					else if (state && state.referrer) props.history.replace(state.referrer)
					else {
						if (!userState) return null
						if (userState && userState.charAt(5 - STAGES.indexOf("idCard")) !== "1")
							props.history.push("/my-page/auth-center")
						else props.history.push("/exchange/IDR:BTC", { referrer: "public" })
					}
					return null
				}
				return <Component {...props} />
			}}
		/>
	)
})
