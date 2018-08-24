import { Component } from "react"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActions from "store/reducers/user"
import { Debugger, isAuthenticated } from "lib/utils"

class Core extends Component {
	debug = Debugger(this)
	coreActions = []
	privateActions = []

	execute = actions => {
		const promises = actions.map(action => action())
		return Promise.all(promises)
	}

	componentDidMount() {
		const { coreActions, privateActions, execute } = this
		const { isAuthenticated } = this.props

		// coreActions.push(**action**)

		// privateActions.push(**action**)

		setTimeout(() => {
			execute(coreActions) // .then(res => console.log('coreActions execute done', res))
			isAuthenticated && execute(privateActions)
		}, 0)
	}

	componentDidUpdate(prevProps) {
		const { execute, privateActions, coreActions } = this
		if (!prevProps.isAuthenticated && this.props.isAuthenticated) execute(privateActions)
		if (prevProps.isAuthenticated && !this.props.isAuthenticated) execute(coreActions)
	}

	render() {
		return null
	}
}

export default connect(
	state => ({
		isAuthenticated: isAuthenticated(state),
	}),
	dispatch => ({
		UserActions: bindActionCreators(userActions, dispatch),
	})
)(Core)
