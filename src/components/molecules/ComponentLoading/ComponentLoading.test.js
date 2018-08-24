import React from "react"
import ReactDOM from "react-dom"
import ComponentLoading from "./ComponentLoading"

import { BrowserRouter } from "react-router-dom"
import { I18nextProvider } from "react-i18next"
import { ThemeProvider } from "styled-components"

import theme from "lib/theme"
import i18n from "lib/i18n/index.stories"

import props from "./ComponentLoading.props"

it("renders without crashing", () => {
	const div = document.createElement("div")
	ReactDOM.render(
		<BrowserRouter>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider theme={theme}>
					<ComponentLoading {...props} />
				</ThemeProvider>
			</I18nextProvider>
		</BrowserRouter>,
		div
	)
	ReactDOM.unmountComponentAtNode(div)
})
