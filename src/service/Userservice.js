import AxiosInstance from "../instance/axiosInstance"

const UserService={
    registerUser:async(payload)=>{
        let data= await AxiosInstance.post("/api/users/register",payload)
        return data
    },  VerifyUser:async(payload)=>{
        let data= await AxiosInstance.post("/api/users/verify-otp",payload)
        return data
    
        }
    , loginUser: async (payload) => {
        const data = await AxiosInstance.post("/api/users/login", payload)
        return data
    },// Userservice.js

  getAllCompanies: async () => {
        const data = await AxiosInstance.get("/api/companies")
        return data

},  applyAllCompanies: async (payload, token) => {
        const data = await AxiosInstance.post("/api/companies/apply", payload,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        return data
}
}
export default UserService