import React from "react"

const parser = array => {
	//console.log('parser', array);
	if (array.length < 5) return array[0]
	return parser([
		<React.Fragment>
			{array[0]}
			<strong>{array[2]}</strong>
			{array[4]}
		</React.Fragment>,
		...array.slice(5),
	])
}

class Bold {
	type = "postProcessor"
	name = "Bold"
	process = (value, key, options, translator) => {
		/* return manipulated value */
		if (value.indexOf("<b>") !== -1) {
			//console.log(value.split(/(<b>|<\/b>)/))
			return parser(value.split(/(<b>|<\/b>)/))
		}
		return value
	}
}

export default Bold
