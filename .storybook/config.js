import { configure } from "@storybook/react"
//import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import "../src/index.scss"

import socket from "../src/lib/socket"
import storage from "../src/lib/storage"
import store from "../src/store"
import { setAccessToken } from "../src/store/reducers/auth"

let socketURI =
	window.location.hostname === "localhost"
		? "ws://localhost:3001/ws"
		: `wss://${window.location.host}/ws`

socket.initialize(store, socketURI)
let token = storage.getItem("token")
if (token) {
	store.dispatch(setAccessToken(token))
}

const req = require.context("../src/components", true, /\.stories\.js$/)

function loadStories() {
	req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

//const newViewports = {
//	kindleFire2: {
//		name: 'Kindle Fire 2',
//		styles: {
//			width: '600px',
//			height: '963px'
//		}
//	},
//	kindleFireHD: {
//		name: 'Kindle Fire HD',
//		styles: {
//			width: '533px',
//			height: '801px'
//		}
//	}
//};
//
//configureViewport({
//	viewports: {
//		...INITIAL_VIEWPORTS,
//		...newViewports
//	},
//	//defaultViewport: 'iphone6'
//});
