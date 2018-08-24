import { createAction, handleActions } from "redux-actions"
import { fromJS, Map } from "immutable"
import { pender } from "redux-pender"
import * as UserAPI from "lib/api/user"

/* Identity */
const GET_USER = "user/GET_USER"

// action creator
/* User Info */
export const getUser = createAction(GET_USER, UserAPI.getUser)

// initial state
const initialState = Map({
	info: Map({}),
})

// reducer
export default handleActions(
	{
		...pender({
			type: GET_USER,
			onSuccess: (state, action) => {
				const user = action.payload
				return state.set("info", fromJS(user))
			},
		}),
		"auth/LOGOUT": (state, action) => {
			return initialState
		},
	},
	initialState
)
