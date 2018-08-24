/* NOT RELIABLE VARIABLES */
/* THIS IS ONLY FOR REDUX INITIAL STATE */
/* USE REDUX STATE INSTEAD */

export const EXPECTED_PAIR_SORT = [
	"IDR:BTC",
	"IDR:BCH",
	"IDR:LTC",
	//'IDR:QTUM',
	//'IDR:XRP',
]

export const EXPECTED_CURRENCY_SORT = [
	"idr",
	"btc",
	"bch",
	"ltc",
	"qtum",
	//'eth',
	//'etc',
	//'xrp',
]

/* DANGEROUS_VARIABLES DON"T BELIEVE */

export const CONFIRMATIONS = {
	btc: 3,
	bch: 6,
	ltc: 10,
	qtum: 16,
}

export const TRANSACTION_TIMES = {
	btc: 60,
	bch: 30,
	ltc: 30,
	qtum: 30,
	xrp: 5,
}

export const cryptocurrencyFullName = coin => {
	switch (coin) {
		case "btc":
			return "Bitcoin"
		case "bch":
			return "Bitcoin Cash"
		case "ltc":
			return "Litecoin"
		case "qtum":
			return "Qtum"
		case "eth":
			return "Ethereum"
		case "etc":
			return "Ethereum Classic"
		case "xrp":
			return "Ripple"
		default:
			return coin
	}
}

export const EXPLORERS = {
	btc: "https://www.blockchain.com/btc/tx/",
	bch: "https://bitcoincash.blockexplorer.com/tx/",
	ltc: "https://live.blockcypher.com/ltc/tx/",
	qtum: "https://qtumexplorer.io/tx/",
	eth: "https://etherscan.io/tx/",
	etc: "https://gastracker.io/block/",
	xrp: "https://xrpcharts.ripple.com/#/transactions/",
}

export const mediaSizes = {
	desktop: 992,
	tablet: 768,
	mobile: 576,
}
