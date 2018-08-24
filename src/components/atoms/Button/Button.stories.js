import React from "react"
import { storiesOf } from "@storybook/react"
import { withNotes } from "@storybook/addon-notes"
import Button from "./Button"

import { BrowserRouter } from "react-router-dom"
import { I18nextProvider } from "react-i18next"
import { ThemeProvider } from "styled-components"

import theme from "lib/theme"
import i18n from "lib/i18n/index.stories"

import props from "./Button.props"

storiesOf("atoms/Button", module)
	.add(
		"Blue",
		withNotes("Note")(() => (
			<BrowserRouter>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider theme={theme}>
						<Button {...props}>Blue Button</Button>
					</ThemeProvider>
				</I18nextProvider>
			</BrowserRouter>
		))
	)
	.add(
		"BlueBorder",
		withNotes("Note")(() => (
			<BrowserRouter>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider theme={theme}>
						<Button {...props} blueBorder>
							Blur Border Button
						</Button>
					</ThemeProvider>
				</I18nextProvider>
			</BrowserRouter>
		))
	)
	.add(
		"white",
		withNotes("Note")(() => (
			<BrowserRouter>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider theme={theme}>
						<Button {...props} white>
							White Button
						</Button>
					</ThemeProvider>
				</I18nextProvider>
			</BrowserRouter>
		))
	)
	.add(
		"WhiteBorder",
		withNotes("Note")(() => (
			<BrowserRouter>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider theme={theme}>
						<Button {...props} whiteBorder>
							White Border Button
						</Button>
					</ThemeProvider>
				</I18nextProvider>
			</BrowserRouter>
		))
	)
	.add(
		"RedBorder",
		withNotes("Note")(() => (
			<BrowserRouter>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider theme={theme}>
						<Button {...props} redBorder>
							Red Border Button
						</Button>
					</ThemeProvider>
				</I18nextProvider>
			</BrowserRouter>
		))
	)
