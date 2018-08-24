import Loadable from "react-loadable"
import Loading from "molecules/ComponentLoading"

export const HomePage = Loadable({
	loader: () => import("pages/HomePage").then(preLoad),
	loading: Loading,
})

const preLoad = params => {
	const timeout = 5000
	setTimeout(() => {
		import("pages/HomePage")
	}, timeout)
	return params
}
