/* Event Manager */
export const debounce = (fn, fn2, delay) => {
	let timer = null
	return e => {
		fn(e)
		clearTimeout(timer)
		timer = setTimeout(() => fn2(e), delay)
	}
}

export const preventEDOT = e => (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()

export const copyToClipboard = (copyText, message = "Default") => {
	const element = document.createElement("textarea")
	element.value = copyText
	element.setAttribute("readonly", "")
	element.style.position = "absolute"
	element.style.left = "-9999px"
	document.body.appendChild(element)

	const selected =
		document.getSelection().rangeCount > 0 // Check if there is any content selected previously
			? document.getSelection().getRangeAt(0) // Store selection if found
			: false // Mark as false to know no selection existed before

	if (navigator.userAgent.match(/ipad|iphone/i)) {
		let range = document.createRange()
		range.selectNodeContents(element)
		let selection = window.getSelection()
		selection.removeAllRanges()
		selection.addRange(range)
		element.setSelectionRange(0, 999999)
	} else {
		element.select()
	}

	document.execCommand("copy")

	document.body.removeChild(element)

	if (selected) {
		// If a selection existed before copying
		document.getSelection().removeAllRanges() // Unselect everything on the HTML document
		document.getSelection().addRange(selected) // Restore the original selection
	}

	alert(message)
}
