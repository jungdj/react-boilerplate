import React from "react"

export default {
	options: [
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
		{
			value: "custom",
			label: (
				<h1 onClick={() => console.log("clicked")}>
					<span style={{ colod: "red" }}>AA</span> hmm
				</h1>
			),
		},
	],
	value: {
		value: "custom",
		label: (
			<h1 onClick={() => console.log("clicked")}>
				<span style={{ colod: "red" }}>AA</span> hmm
			</h1>
		),
	},
	onChange: params => console.log("onChange", params),
	placeholder: "Placeholder...",
}
