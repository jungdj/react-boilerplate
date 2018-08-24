import { createAction, handleActions } from "redux-actions"
import { fromJS, Map } from "immutable"

// action types
const SET_WINDOW_SIZE = "base/SET_WINDOW_SIZE"

// action creator
export const setWindowSize = createAction(SET_WINDOW_SIZE)

// initial state
const initialState = Map({
	window: Map({
		width: 0,
		height: 0,
		device: "",
	}),
})

// reducer
export default handleActions(
	{
		[SET_WINDOW_SIZE]: (state, action) => state.setIn(["window"], fromJS(action.payload)),
	},
	initialState
)
