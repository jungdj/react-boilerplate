import axios from "lib/axios"

export const crashReport = err => axios.post("/api/v1/report", err)
