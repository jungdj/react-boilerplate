"use strict"

if (typeof Promise === "undefined") {
	// Rejection tracking prevents a common issue where React gets into an
	// inconsistent state due to an error, but it gets swallowed by a Promise,
	// and the user has no idea what causes React's erratic future behavior.
	require("promise/lib/rejection-tracking").enable()
	window.Promise = require("promise/lib/es6-extensions.js")
}

// fetch() polyfill for making API calls.
require("whatwg-fetch")

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require("object-assign")

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === "test") {
	require("raf").polyfill(global)
}

var areIntlLocalesSupported = require("intl-locales-supported")

var localesMyAppSupports = [
	/* list locales here */
	"en",
	"ko",
	"id"
]

if (global.Intl) {
	// Determine if the built-in `Intl` has the locale data we need.
	if (!areIntlLocalesSupported(localesMyAppSupports)) {
		// `Intl` exists, but it doesn't have the data we need, so load the
		// polyfill and patch the constructors we need with the polyfill's.
		var IntlPolyfill = require("intl")
		Intl.NumberFormat = IntlPolyfill.NumberFormat
		Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
	}
} else {
	// No `Intl`, so use and load the polyfill.
	global.Intl = require("intl")
}


// FOR IE
Math.log10 = Math.log10 || function(x) {
	return Math.log(x) * Math.LOG10E;
};

//FOR IE
if (typeof Symbol === 'undefined')
	require('es6-symbol/implement')

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
	require('raf').polyfill(global);
}
