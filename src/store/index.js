import createBrowserHistory from "history/createBrowserHistory"
import { applyMiddleware, compose, createStore } from "redux"
import { connectRouter, routerMiddleware } from "connected-react-router/immutable"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import penderMiddleware from "redux-pender"
import { Map } from "immutable"

import rootReducer from "./reducers"

const history = createBrowserHistory()

const composeEnhancers =
	process.env.NODE_ENV === "production"
		? compose
		: composeWithDevTools({
				actionsBlacklist: [
					"@@redux-pender/SUCCESS",
					"@@redux-pender/FAILURE",
					"@@redux-pender/PENDING",
				],
				maxAge: 1000,
		  })

const store = createStore(
	connectRouter(history)(rootReducer), // new root reducer with router state
	Map(), // Initial state
	composeEnhancers(
		applyMiddleware(
			penderMiddleware(),
			routerMiddleware(history) // for dispatching history actions
		)
	)
)

if (rootReducer.hot) {
	rootReducer.hot.accept("./reducers", () => {
		const nextRootReducer = require("./reducers").default
		store.replaceReducer(connectRouter(history)(nextRootReducer))
	})
}

export { history }
export default store
