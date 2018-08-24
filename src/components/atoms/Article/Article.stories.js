import React from "react"
import { storiesOf } from "@storybook/react"
import { withNotes } from "@storybook/addon-notes"
import Article from "./Article"

import { BrowserRouter } from "react-router-dom"
import { I18nextProvider } from "react-i18next"
import { ThemeProvider } from "styled-components"

import theme from "lib/theme"
import i18n from "lib/i18n/index.stories"

import props from "./Article.props"

storiesOf("atoms/Article", module).add(
	"Default",
	withNotes("Note")(() => (
		<BrowserRouter>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider theme={theme}>
					<Article {...props} />
				</ThemeProvider>
			</I18nextProvider>
		</BrowserRouter>
	))
)
