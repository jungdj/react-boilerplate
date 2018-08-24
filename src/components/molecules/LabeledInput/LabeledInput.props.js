import React from "react"
import TextButton from "atoms/TextButton"

export default {
	label: "Test Label",
	topRight: <TextButton>Top right</TextButton>,
	type: "text",
	placeholder: "Placehoder",
	minLength: 5,
	maxLength: 7,
	required: true,
	autoFocus: true,
}
