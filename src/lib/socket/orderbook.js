const singleton = Symbol()
const singletonEnforcer = Symbol()

export default class OrderBook {
	constructor(enforcer) {
		if (enforcer !== singletonEnforcer) {
			throw new Error("Cannot construct singleton")
		}
		this.bids = []
		this.asks = []
	}

	static get instance() {
		if (!this[singleton]) {
			this[singleton] = new OrderBook(singletonEnforcer)
		}
		return this[singleton]
	}

	convert(content) {
		this.bids = content.buy
		this.asks = content.sell
		return { bids: this.bids, asks: this.asks }
	}

	reset() {
		this.bids = []
		this.asks = []
	}
}
