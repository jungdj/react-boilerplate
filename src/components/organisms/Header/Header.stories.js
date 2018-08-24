import React from "react"
import { Provider } from "react-redux"
import { storiesOf } from "@storybook/react"
import { withNotes } from "@storybook/addon-notes"
import Header from "./Header"

import { BrowserRouter } from "react-router-dom"
import { I18nextProvider } from "react-i18next"
import { ThemeProvider } from "styled-components"

import theme from "lib/theme"
import i18n from "lib/i18n/index.stories"
import store from "store"

import props from "./Header.props"

storiesOf("organisms/Header", module).add(
	"Default",
	withNotes("Note")(() => (
		<BrowserRouter>
			<Provider store={store}>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider theme={theme}>
						<Header {...props} />
					</ThemeProvider>
				</I18nextProvider>
			</Provider>
		</BrowserRouter>
	))
)
