import axios from "axios"

let BASE_URL='https://jobpor-24dq.onrender.com/'

let AxiosInstance=axios.create({
    baseURL:BASE_URL
})
export default AxiosInstance