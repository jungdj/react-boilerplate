import axios from "lib/axios"
import { axiosErrorHandler, axiosMiddleware } from "lib/utils"

export const login = ({ email, password, response }) =>
	axios
		.post("/api/v1/login", {
			email,
			password,
			response,
		})
		.then(axiosMiddleware, axiosErrorHandler)
export const verifyOTP = token =>
	axios.post("/api/v1/login/2fa", { token }).then(axiosMiddleware, axiosErrorHandler)

/* OTP */
export const initiateOTP = () =>
	axios.get("/api/v1/user/otp").then(axiosMiddleware, axiosErrorHandler)
export const activateOTP = token =>
	axios.post("/api/v1/user/otp", { token }).then(axiosMiddleware, axiosErrorHandler)
