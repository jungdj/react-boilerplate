import axios from "lib/axios"
import { axiosErrorHandler, axiosMiddleware } from "lib/utils"

/* User info */
export const getUser = () => axios.get("/api/v1/info").then(axiosMiddleware, axiosErrorHandler)
