import React from "react"
import { storiesOf } from "@storybook/react"
import { withNotes } from "@storybook/addon-notes"
import Input from "./Input"

import { BrowserRouter } from "react-router-dom"
import { I18nextProvider } from "react-i18next"
import { ThemeProvider } from "styled-components"

import theme from "lib/theme"
import i18n from "lib/i18n/index.stories"

import props from "./Input.props"

storiesOf("molecules/Input", module)
	.add(
		"Default",
		withNotes("Note")(() => (
			<BrowserRouter>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider theme={theme}>
						<Input {...props} />
					</ThemeProvider>
				</I18nextProvider>
			</BrowserRouter>
		))
	)
	.add(
		"Prefix",
		withNotes("Note")(() => (
			<BrowserRouter>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider theme={theme}>
						<Input prefix={props.prefix} />
					</ThemeProvider>
				</I18nextProvider>
			</BrowserRouter>
		))
	)
	.add(
		"Subfix",
		withNotes("Note")(() => (
			<BrowserRouter>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider theme={theme}>
						<Input subfix={props.subfix} />
					</ThemeProvider>
				</I18nextProvider>
			</BrowserRouter>
		))
	)
