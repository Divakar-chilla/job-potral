import { useState } from "react"
import Inputs from "../register/Inputs"
import { HiOutlineMail } from "react-icons/hi"
import { RiLockPasswordFill } from "react-icons/ri"
import toast from "react-hot-toast"
import SpinnerLoader from "../loaders/SpinnerLoader"
import { useNavigate } from "react-router-dom"
import UserService from "../../service/Userservice"
import useUserContext from "../hooks/useUserContext"

const Login = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { globalState, setGlobalState } = useUserContext() // use globalState

  const handelchange = (e) => {
    const { name, value } = e.target
    setFormdata((prev) => ({ ...prev, [name]: value }))
  }

  const handelsubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { email, password } = formdata

    if (!email || !password) {
      toast.error("All fields are mandatory")
      setIsLoading(false)
      return
    }

    try {
      console.log("Login Data:", formdata)
      const payload = { email, password }
      const resp = await UserService.loginUser(payload)
      const status = resp?.status
      const data = resp?.data

      if (status === 200 || status === 201) {
        toast.success(data?.message || "Login Successful")

        // set user & token in global state
        const userData = data?.user || { email }
        const token = data?.token || null

        setGlobalState(prev => ({
          ...prev,
          user: userData,
          token
        }))

        // optional: save token for persistence
        localStorage.setItem("token", token)

        navigate("/home")
      } else {
        toast.error(data?.message || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      const serverMessage = error?.response?.data?.message || error?.response?.data || error?.message
      toast.error(typeof serverMessage === "string" ? serverMessage : JSON.stringify(serverMessage))
    } finally {
      setIsLoading(false)
    }
  }

  const { email, password } = formdata

  return (
    <div className="size-full flex justify-center items-center px-4 py-4 sm:px-6 sm:py-6">
      <div className="w-full max-w-sm rounded-2xl p-6 sm:p-8 shadow-2xl bg-white">

        <form
          className="flex flex-col gap-4 sm:gap-5"
          onSubmit={handelsubmit}
        >
          <div className="w-full h-10 flex justify-center items-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Login</h1>
          </div>

          {/* Email Input */}
          <Inputs name="email" value={email} handelchange={handelchange}>
            <HiOutlineMail />
          </Inputs>

          {/* Password Input */}
          <Inputs name="password" value={password} handelchange={handelchange}>
            <RiLockPasswordFill />
          </Inputs>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-10 sm:h-12 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <SpinnerLoader size={14} />
                <span>Signing in...</span>
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
