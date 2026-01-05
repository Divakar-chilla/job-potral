import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Inputs from "./Inputs"
import { HiOutlineMail } from "react-icons/hi"
import { RiLockPasswordFill } from "react-icons/ri"
import UserService from "../../service/Userservice"
import toast from "react-hot-toast"
import SpinnerLoader from "../loaders/SpinnerLoader"

const Verifyotp = () => {
  const location = useLocation()
   const navigate=useNavigate()
  const email = location.state?.email || ""
  const formdata = location.state?.formdata || {}
  const registrationId = location.state?.registrationId || formdata?.registrationId || ""
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handelVerifyOtp = async(e) => {
    e.preventDefault()
    console.log({ email, otp, formdata })

    try {
      setIsLoading(true)
      // build a payload that includes many possible identifier keys
      const payload = { email, otp }
      if (registrationId) {
        payload.registrationId = registrationId
        payload['Registration ID'] = registrationId
        payload.id = registrationId
        payload._id = registrationId
        payload.userId = registrationId
      }
      // include other formdata fields to help server locate the user
      if (formdata) {
        payload.mobile = payload.mobile || formdata.mobile || formdata.phone || ""
        payload.name = payload.name || formdata.name || formdata.fullName || ""
        payload.formdata = formdata
      }
      console.log("Verify payload:", payload)
      const { data, status } = await UserService.VerifyUser(payload)

      if (status === 200) {
        toast.success(data?.message || "Verified successfully")
        navigate("/login")
      } else {
        toast.error(data?.message || "Something went wrong")
      }
    } catch (error) {
      console.error("Verify error:", error)
      const serverMessage = error?.response?.data?.message || error?.response?.data || error?.message
      toast.error(typeof serverMessage === "string" ? serverMessage : JSON.stringify(serverMessage))
    } finally {
      setIsLoading(false)
    }
}
  return (
    <div className="size-full flex justify-center items-center px-4 py-4">
     
      <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl">

        <form
          className="flex flex-col gap-4"
          onSubmit={handelVerifyOtp}
        >
          <div className="w-full h-10 flex justify-center items-center">
            <h1 className="text-2xl font-bold">Verify OTP</h1>
          </div>

          {/* Email */}
          {email && (
            <Inputs name="email" value={email} handelchange={() => {}}>
              <HiOutlineMail />
            </Inputs>
          )}

          {/* OTP */}
          <Inputs name="otp" value={otp} handelchange={(e) => setOtp(e.target.value)}>
            <RiLockPasswordFill />
          </Inputs>

          {/* Button */}
          <button
            type="submit"
            className="w-full h-10 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <SpinnerLoader size={14} />
                <span>Verifying..</span>
              </span>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Verifyotp
