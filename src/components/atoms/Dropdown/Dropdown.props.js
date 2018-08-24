import React from "react"
import GoTriangleDown from "react-icons/lib/go/triangle-down"

export default {
	dataList: [
		{
			to: "/my-page/auth-center",
			title: "authenticationCenter",
		},
		{
			to: "/my-page/auth-center",
			title: "otpTitle",
		},
		{
			to: "/my-page/auth-center",
			title: "myAccount",
		},
		{
			to: "#",
			title: "logout",
			onClick: () => {
				console.log("logout")
			},
		},
	],
	head: (
		<span>
			i.am.really.long@coinone.co.id
			<GoTriangleDown />
		</span>
	),
}
