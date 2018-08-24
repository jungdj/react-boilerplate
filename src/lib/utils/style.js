import { css } from "styled-components"

import { mediaSizes } from "lib/variables"

// Iterate through the sizes and create a media template
export const media = Object.keys(mediaSizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (min-width: ${mediaSizes[label] / 16}em) {
			${css(...args)};
		}
	`

	return acc
}, {})

export const get = prop => props => props[prop] || props.theme[prop]
export const getSize = prop => props =>
	typeof props[prop] === "number" ? `${props[prop]}px` : props[prop]

export const cx = (...classNames) => {
	let result = ""
	classNames.forEach(className => {
		if (typeof className === "string") result += `${className} `
		if (typeof className === "object") {
			for (const key in className) {
				if (className.hasOwnProperty(key)) if (className[key]) result += `${key} `
			}
		}
	})
	return result.trim()
}

export function flexCenter() {
	return `
		display: flex;
		align-items: center;
		justify-content: center;
 	`
}
