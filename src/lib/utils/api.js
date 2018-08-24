/* API UTILS */
export const axiosMiddleware = res => {
	if (!res.data) return res
	//return new Promise(resolve => setTimeout(() => resolve(resData.data), 1500));
	return res.data.data
}

export const axiosErrorHandler = err => {
	if (!err.response)
		return Promise.reject({
			data: "connectionRefused",
			message: "connectionRefused",
		})
	const { data } = err.response
	if (!data) return Promise.reject(err)
	if (!data.data && data.message) data.data = data.message
	if (!data.message && data.data) data.message = data.data
	return Promise.reject(data)
}

/* Parsers */
export const camelizeString = snakeCaseString => {
	const find = /(_\w)/g
	const convert = matches => matches[1].toUpperCase()
	return snakeCaseString.replace(find, convert)
}

export const camelize = object =>
	Object.keys(object).reduce(
		(acc, cur) => Object.assign(acc, { [camelizeString(cur)]: object[cur] }),
		{}
	)
