import React from "react"
import { storiesOf } from "@storybook/react"
import { withNotes } from "@storybook/addon-notes"
import CustomInput from "./CustomInput"

import { BrowserRouter } from "react-router-dom"
import { I18nextProvider } from "react-i18next"
import { ThemeProvider } from "styled-components"

import theme from "lib/theme"
import i18n from "lib/i18n/index.stories"

import props from "./CustomInput.props"

class ParentInput extends React.Component {
	state = { myValue: "0" }
	handleChange = e => this.setState({ [e.target.name]: e.target.value })

	render() {
		const { myValue } = this.state
		console.log("Parent", myValue, typeof myValue)

		return (
			<CustomInput
				name="myValue"
				value={myValue}
				onChange={this.handleChange}
				{...props}
				{...this.props}
			/>
		)
	}
}
storiesOf("molecules/CustomInput", module).add(
	"Default",
	withNotes("Note")(() => (
		<BrowserRouter>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider theme={theme}>
					<div>
						int: Only on blur
						<ParentInput formatOnlyOnBlur type="int" />
						int: Always
						<ParentInput type="int" />
						int: step : 1000
						<ParentInput type="int" step={1000} />
						float: Only on blur
						<ParentInput formatOnlyOnBlur type="float" />
						float: Always
						<ParentInput type="float" />
						float: step : 0.001
						<ParentInput type="float" step={0.001} />
						float: step : 0.001 ONly on blur
						<ParentInput type="float" step={0.001} formatOnlyOnBlur />
					</div>
				</ThemeProvider>
			</I18nextProvider>
		</BrowserRouter>
	))
)
