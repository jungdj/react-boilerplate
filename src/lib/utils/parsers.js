import i18n from "../i18n"

export let device = "mobile"
export const setDevice = newDevice => {
	device = newDevice
}
export const isMobile = () => device === "mobile"

const isValidDate = date => date instanceof Date && !isNaN(date)

export function formatDate(timestamp) {
	if (!timestamp) return

	const date = new Date(1000 * timestamp)
	if (isValidDate(date)) {
		return getDateTime(new Date(1000 * timestamp))
	} else {
		return getDateTime(new Date(timestamp))
	}
}

const getDateTime = now => {
	let date = [
		now.getDate(),
		now.getMonth() + 1,
		now
			.getFullYear()
			.toString()
			.substr(-2),
	].map(d => (d.toString().length === 1 ? "0" + d : d))

	let time
	if (isMobile) {
		time = [now.getHours(), now.getMinutes()]
	} else {
		time = [now.getHours(), now.getMinutes(), now.getSeconds()]
	}

	return date.join("/") + " - " + time.join(":")
}

const numberFormaters = {}

export function decimalToPercentString(decimal, toFixedParam = 2) {
	const currentLng = i18n.language
	if (isNaN(decimal)) return "0 %"
	if (decimal !== 0 && !decimal) return "-- %"

	const key = `${currentLng}:PERCENT:${toFixedParam}`
	if (!numberFormaters.hasOwnProperty(key)) {
		numberFormaters[key] = new Intl.NumberFormat(currentLng, {
			style: "percent",
			maximumFractionDigits: toFixedParam,
		})
	}
	const formatter = numberFormaters[key]

	return formatter.format(decimal)
	//return (Math.round(decimal * 10000) / 100).toFixed(toFixedParam)
}

export function floorFloat(value, digits) {
	const regex = new RegExp(`^-?\\d+(?:\\.\\d{0,${digits}})?`)
	// console.log('true regex', /^-?\d+(?:\.\d{0,2})?/)
	//console.log('regex', regex)
	const match = value.toString().match(regex)
	return match ? match[0] : NaN
}

export function formatNumber(value, maxFracDigit = 4, options) {
	const currentLng = i18n.language
	const decimal = typeof value === "string" ? parseFloat(value) : value
	if (typeof decimal === "undefined") return "--"
	if (isNaN(decimal)) return 0
	if (decimal !== 0 && !decimal) return "--"

	let key = `${currentLng}:NUMBER:${maxFracDigit}`
	if (options) key = `${key}:${JSON.stringify(options)}`
	if (!numberFormaters.hasOwnProperty(key)) {
		numberFormaters[key] = new Intl.NumberFormat(currentLng, {
			maximumFractionDigits: maxFracDigit >= 0 ? maxFracDigit : 20,
			...options,
		})
	}
	const formatter = numberFormaters[key]

	return formatter.format(decimal)
	// return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export function subfixFiatAmount(num) {
	const currentLang = i18n.language
	if (typeof num === "undefined") return "--"
	if (isNaN(num)) return 0
	const harga = parseInt(num, 10)
	const options = { maximumSignificantDigits: 4 }
	const format = number => formatNumber(number, 4, options)
	switch (currentLang) {
		case "id":
			if (harga > 1000000000) return format(harga / 1000000000) + " bn"
			if (harga > 1000000) return format(harga / 1000000) + " jt"
			if (harga > 1000) return format(harga / 1000) + " rb"
			return harga
		case "en":
			if (harga > 1000000000) return format(harga / 1000000000) + " B"
			if (harga > 1000000) return format(harga / 1000000) + " M"
			if (harga > 1000) return format(harga / 1000) + " K"
			return harga
		case "ko":
			if (harga > 100000000) return format(harga / 100000000) + " 억"
			//if (harga > 1000000) return format(harga / 1000000) + ' 백만'
			if (harga > 10000) return format(harga / 10000) + " 만"
			return harga
		default:
			return harga
	}
}

export function addLeadingZeros(value) {
	const str = value.toString()
	return str.length === 1 ? `0${str}` : str
}

const satoshiMultiplier = Math.pow(10, 8)
export const addSatoshis = (x1, x2) => {
	return (x1 * satoshiMultiplier + x2 * satoshiMultiplier) / satoshiMultiplier
}
