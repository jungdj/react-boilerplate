import axios from "axios"
import { Debugger } from "lib/utils"

const singleton = Symbol()
const singletonEnforcer = Symbol()

const debug = Debugger("Axios")

class Axios {
	constructor(enforcer) {
		if (enforcer !== singletonEnforcer) {
			throw new Error("Cannot construct singleton")
		}
		this.session = axios.create({
			headers: {
				post: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
			timeout: 10000,
		})
		this._interceptor = null
		this.token = ""

		this._proxyRequest()
	}

	static get instance() {
		if (!this[singleton]) {
			this[singleton] = new Axios(singletonEnforcer)
		}
		return this[singleton]
	}

	updateToken(newToken) {
		if (this.token === newToken) return
		this.token = newToken
		debug.log("token changed", this.token, newToken)
		this._interceptRequestWithToken()
	}

	_interceptRequestWithToken() {
		if (this._interceptor !== null) {
			this.session.interceptors.request.eject(this._interceptor)
			this._interceptor = null
		}
		//if (!token || typeof token === 'undefined' || token === '') return

		this._interceptor = this.session.interceptors.request.use(config => {
			if (
				config.url[0] === "/" ||
				config.url.indexOf(`${process.env.REACT_APP_PROD_HOST}/`) !== -1
			)
				Object.assign(config, {
					headers: {
						Authorization: `Bearer ${this.token}`,
						...config["headers"],
					},
				})
			return config
		})
	}

	_proxyRequest() {
		let proxy = ""
		if (process.env.REACT_APP_PROXY) proxy = `https://${process.env.REACT_APP_PROXY}`
		// proxy = "https://test-staging.coinoneid.com"
		//proxy = "https://coinone.co.id"

		this.session.interceptors.request.use(config => {
			if (config.url[0] === "/")
				Object.assign(config, {
					url: proxy + config.url,
				})
			return config
		})
	}

	get = (...params) => this.session.get(...params)
	post = (...params) => this.session.post(...params)
	put = (...params) => this.session.put(...params)
	delete = (...params) => this.session.delete(...params)
	patch = (...params) => this.session.patch(...params)
	head = (...params) => this.session.head(...params)
}

export default Axios.instance
