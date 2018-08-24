import { Debugger } from "lib/utils"

const parseJSON = str => {
	let parsed = null
	try {
		parsed = JSON.parse(str)
	} catch (e) {
		console.log("filaed to parse data", e)
		return null
	}
	return parsed
}

const SUBSCRIBE = "SUBSCRIBE"
const UNSUBSCRIBE = "UNSUBSCRIBE"

// packet types

const P_CHANNELS = []

export default (function() {
	let _store = null
	let _socket = null
	let _uri = null
	let _retry = false
	let _subscribed = []
	let _pSubscribed = []
	let _callbacks = {}

	let _isInitialized = false
	let _token = ""
	let _isAuthenticated = false

	let _enableLogging = false
	let _debug = Debugger("=LOG FROM SOCKET v2=", _enableLogging)

	let doVisualUpdates = true
	document.addEventListener("visibilitychange", function() {
		doVisualUpdates = !document.hidden
	})

	const _handlePacket = packet => {
		_debug.log("**** handlePacket start ****")
		_debug.log(packet)
		const { type, data } = packet
		_debug.log("type", type)
		_debug.log("data", data)

		switch (type) {
			default:
				console.log(data)
		}
		_debug.log("==== handlePacket end ====")
	}

	const _listener = async message => {
		const data = parseJSON(message.data)
		if (!data) return
		_handlePacket(data)
	}

	const updateToken = newToken => {
		if (_token === newToken) return
		_debug.log("token changed", _token, newToken)
		_token = newToken
		if (_socket.readyState !== _socket.OPEN || _isAuthenticated === 0) return
		_authenticate()
	}

	const _authenticate = () => {
		if (!_token) return
		_isAuthenticated = 0 // Means pending
		_socket.send(
			JSON.stringify({
				event: "AUTH",
				token: _token,
			})
		)
	}

	const _connect = uri => {
		_uri = uri
		_socket = new WebSocket(uri)
		_socket.onmessage = _listener
		_socket.onopen = () => {
			_debug.log("connected websocket to ", uri)
			_retry = false
			_authenticate()
			_resubscribe()
		}
		_socket.onerror = err => console.log("socket error", err)
		_socket.onclose = _reconnect
	}

	const subscribe = ({ channel, pair, callback }) => {
		if (P_CHANNELS.indexOf(channel) !== -1) return _pSubscribe({ channel, pair, callback })

		const key = `${channel} ${pair}`
		_debug.log("subscribing to ", key)
		if (_subscribed.indexOf(key) === -1) {
			_subscribed.push(key)
		}

		if (callback) _callbacks[channel] = callback

		if (_socket.readyState !== _socket.OPEN) return

		_socket.send(
			JSON.stringify({
				event: SUBSCRIBE,
				channel: channel,
				pair: pair,
			})
		)
	}

	const _pSubscribe = ({ channel, pair, callback }) => {
		const key = `${channel} ${pair}`
		_debug.log("subscribing to ", key)
		if (_pSubscribed.indexOf(key) === -1) {
			_pSubscribed.push(key)
		}

		if (callback) _callbacks[channel] = callback

		if (_socket.readyState !== _socket.OPEN) return
		if (!_isAuthenticated) return

		_socket.send(
			JSON.stringify({
				event: SUBSCRIBE,
				channel: channel,
				pair: pair,
			})
		)
	}

	const unsubscribe = ({ channel, pair }) => {
		const key = `${channel} ${pair}`
		_debug.log("unsubscribing " + key)
		const index = _subscribed.indexOf(key)
		const pIndex = _pSubscribed.indexOf(key)
		if (index === -1 && pIndex === -1) return

		if (index !== -1) _subscribed.splice(index, 1)
		if (pIndex !== -1) _pSubscribed.splice(pIndex, 1)
		if (_callbacks[channel]) _callbacks[channel] = () => {}

		if (_socket.readyState !== _socket.OPEN) return

		_socket.send(
			JSON.stringify({
				event: UNSUBSCRIBE,
				channel: channel,
				pair: pair,
			})
		)
	}

	const _resubscribe = () => {
		_debug.log("resubscribing : ", _subscribed)
		_subscribed.forEach(key => {
			const channel = key.split(" ")[0]
			const pair = key.split(" ")[1]
			subscribe({ channel, pair })
		})
	}

	const _pResubscribe = () => {
		_debug.log("resubscribing private : ", _subscribed)
		_pSubscribed.forEach(key => {
			const channel = key.split(" ")[0]
			const pair = key.split(" ")[1]
			_pSubscribe({ channel, pair })
		})
	}

	const _reconnect = event => {
		_debug.log("reconnecting to socket...")
		if (_retry) {
			// retry after 5 sec
			setTimeout(() => _connect(_uri), 5000)
			return
		}
		_retry = true
		_connect(_uri)
	}

	const close = () => {
		_socket.close()
	}

	return {
		initialize: (store, uri) => {
			if (_isInitialized) return
			_isInitialized = true
			_store = store
			_connect(uri)
		},
		updateToken,
		subscribe,
		unsubscribe,
		close,
	}
})()
