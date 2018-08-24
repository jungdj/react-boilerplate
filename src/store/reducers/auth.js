import { createAction, handleActions } from "redux-actions"

import { Map } from "immutable"
import { pender } from "redux-pender"
import * as AuthAPI from "lib/api/auth"
import jwtDecode from "jwt-decode"
import { updateTokens, clearTokens } from "lib/utils/token"

// action types
const INITIATE_OTP = "auth/INITIATE_OTP"
const ACTIVATE_OTP = "auth/ACTIVATE_OTP"

const SET_ACCESS_TOKEN = "auth/SET_ACCESS_TOKEN"
const LOGIN = "auth/LOGIN"
const VERIFY_OTP = "auth/VERIFY_OTP"
const LOGOUT = "auth/LOGOUT"

// action creator
export const initiateOTP = createAction(INITIATE_OTP, AuthAPI.initiateOTP)
export const activateOTP = createAction(ACTIVATE_OTP, AuthAPI.activateOTP)

export const setAccessToken = createAction(SET_ACCESS_TOKEN)
export const login = createAction(LOGIN, AuthAPI.login)
export const verifyOTP = createAction(VERIFY_OTP, AuthAPI.verifyOTP)
export const logout = createAction(LOGOUT)

// initial state
const initialState = Map({
	jwt: Map({
		access: Map({
			email: "",
		}),
	}),
	otp: Map({
		secret: "",
	}),
})

// reducer
export default handleActions(
	{
		[SET_ACCESS_TOKEN]: (state, action) => {
			const token = action.payload
			updateTokens(token)
			return state.setIn(
				["jwt", "access"],
				Map({
					token: token,
					...jwtDecode(token),
				})
			)
		},
		[LOGOUT]: (state, action) => {
			clearTokens()
			return initialState
		},
		...pender({
			type: INITIATE_OTP,
			onSuccess: (state, action) => {
				const secret = action.payload
				return state.setIn(["otp", "secret"], secret)
			},
		}),
		...pender({
			type: LOGIN,
			onSuccess: (state, action) => {
				const token = action.payload
				updateTokens(token)
				return state.setIn(
					["jwt", "access"],
					Map({
						token: token,
						...jwtDecode(token),
					})
				)
			},
			onFailure: (state, action) => {
				return state
			},
		}),
		...pender({
			type: VERIFY_OTP,
			onSuccess: (state, action) => {
				const token = action.payload
				updateTokens(token)
				return state.setIn(
					["jwt", "access"],
					Map({
						token: token,
						...jwtDecode(token),
					})
				)
			},
		}),
	},
	initialState
)
