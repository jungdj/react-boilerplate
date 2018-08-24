import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router/immutable"
import { I18nextProvider } from "react-i18next"
import { ThemeProvider } from "styled-components"

import "./index.scss"

import theme from "lib/theme"
import App from "./App"
import store, { history } from "./store"
import { setAccessToken } from "store/reducers/auth"
import socket from "socket"
import i18n from "i18n"
import storage from "storage"

let socketURI =
	window.location.hostname === "localhost"
		? "ws://localhost:3001/ws"
		: `wss://${window.location.host}/ws`

socket.initialize(store, socketURI)
let token = storage.getItem("token")
if (token) {
	store.dispatch(setAccessToken(token))
}

it("renders without crashing", () => {
	const div = document.createElement("div")
	ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider theme={theme}>
						<App />
					</ThemeProvider>
				</I18nextProvider>
			</ConnectedRouter>
		</Provider>,
		div
	)
	ReactDOM.unmountComponentAtNode(div)
})
