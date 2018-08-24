/* Selectors */
import { createSelector } from "reselect"

const decodedTokenSelector = state => state.getIn(["auth", "jwt", "access"])
const userInfoSelect = state => state.getIn(["user", "info"])

const isDecodedTokenAlive = decoded => {
	if (decoded && decoded.get("exp")) {
		return 1000 * decoded.get("exp") - new Date().getTime() >= 5000
	}
	return false
}

const decodedTokenLifetime = decoded => {
	if (decoded && decoded.get("exp")) {
		const remain = decoded.get("exp") * 1000 - Date.now()
		return remain > 0 ? remain : 0
	}
	return 0
}

export const isAuthenticated = createSelector(
	decodedTokenSelector,
	decoded => isDecodedTokenAlive(decoded) && decoded.get("authorized")
)

export const tokenTimeLeft = createSelector(decodedTokenSelector, decodedTokenLifetime)

export const getUserState = createSelector(userInfoSelect, info => info.get("state"))

export const isTwoFactorNeeded = createSelector(
	decodedTokenSelector,
	access => isDecodedTokenAlive(access) && !access.get("authorized")
)
