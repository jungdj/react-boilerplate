import jwtDecode from "jwt-decode"
import axios from "lib/axios"
//import socket from "lib/socket"
import storage from "lib/storage"

export const isTokenAlive = decoded => {
	return 1000 * decoded.exp - new Date().getTime() >= 5000
}

export const isTokenAuthenticated = token => {
	const decoded = jwtDecode(token)
	return isTokenAlive(decoded) && decoded.authorized
}

export const updateTokens = token => {
	//if (!isTokenAuthenticated(token)) {
	//	console.warn("Token not authenticated")
	//	clearTokens()
	//	return false
	//}
	storage.setItem("token", token)
	axios.updateToken(token)
	//socket.updateToken(token)
	return true
}

export const clearTokens = () => {
	storage.removeItem("token")
	axios.updateToken("")
	//socket.updateToken("")
}
