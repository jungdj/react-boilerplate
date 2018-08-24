export * from "./style"
export * from "./api"
export * from "./parsers"
export * from "./selectors"
export * from "./events"

/* Basic utility funcions */
export const isEmpty = obj => Object.keys(obj).length === 0

export const Debugger = function(klass, forceEnable) {
	let debug = {}
	const isObject = klass instanceof Object
	// console.log('instanceOf', klass, (klass instanceof Object));
	// console.log('create', klass, klass.constructor)
	if (
		process.env.NODE_ENV === "development" &&
		klass &&
		(process.env.REACT_APP_DEBUG || forceEnable)
	) {
		for (let m in console)
			if (typeof console[m] === "function")
				debug[m] = console[m].bind(
					window.console,
					`%c ${isObject ? klass.constructor.name : klass}: `,
					"color: #E60909;"
				)
		return debug
	}

	for (let m in console) if (typeof console[m] === "function") debug[m] = function() {}
	return debug
}
