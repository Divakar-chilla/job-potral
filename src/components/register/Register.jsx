import { useState } from "react";
import Inputs from "./Inputs";
import { FaPhone } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsCalendarDate } from "react-icons/bs";
import { SiNamebase } from "react-icons/si";
import { IoSchool } from "react-icons/io5";
import Droupdown from "./Droupdown";
import toast from "react-hot-toast";
import * as valPass from "val-pass";
import { useNavigate } from "react-router-dom";
import UserService from "../../service/Userservice";
import SpinnerLoader from "../loaders/SpinnerLoader";
import useUserContext from "../hooks/useUserContext";





const Register = () => {

  const data = {
    email:"",
    name:"",
    mobile:"",
    password:"",
    re_type_password:"",
    skills:[],
    year_of_passout:"",
    positionApplyingFor: "",
    joined_institute:"",
    institute_name:"",
    college:""
  }

  let [formdata,setformdata] = useState(data)
  let [passwordRequirements, setPasswordRequirements] = useState([])
  let [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useUserContext()

  const validatePasswordField = (pass) => {
    const requirements = []
    requirements.push({ text:'At least 8 characters', valid: pass.length >= 8 })
    requirements.push({ text:'One uppercase letter', valid: /[A-Z]/.test(pass) })
    requirements.push({ text:'One lowercase letter', valid: /[a-z]/.test(pass) })
    requirements.push({ text:'One number', valid: /[0-9]/.test(pass) })
    requirements.push({ text:'One special character', valid: /[!@#$%^&*(),.?":{}|<>]/.test(pass) })
    return requirements
  }

  let handelchange = (e) =>{
    let {name,value} = e.target
    setformdata((preval)=>({...preval,[name]:value}))

    if(name === "password"){
      setPasswordRequirements(validatePasswordField(value))
      setConfirmPasswordError(
        formdata.re_type_password && value !== formdata.re_type_password
          ? "Passwords do not match" : ""
      )
    }

    if(name === "re_type_password"){
      setConfirmPasswordError(
        value !== formdata.password ? "Passwords do not match" : ""
      )
    }
  }

  const handelClickDroupdown = (e,nameofEle,value) =>{
    e.stopPropagation()
    setformdata((preval)=>({...preval,[nameofEle]:[...preval[nameofEle],value]}))
  }

  // ✅ API CALL FIXED HERE
  let handelsubmit = async (e) =>{
    e.preventDefault()

    let {email,mobile,password,re_type_password,year_of_passout,positionApplyingFor,joined_institute,institute_name,college,skills} = formdata

    if(!email || !password || !re_type_password || !year_of_passout || !positionApplyingFor || !skills.length || !mobile || !joined_institute || !college){
      toast.error('all fields are mandatory')
      return
    }

    if(password !== re_type_password){
      toast.error('password do not matched')
      return
    }

    if(joined_institute === "yes" && !institute_name){
      toast.error('enter a institute name')
      return
    }

    try {
      console.log("Register payload:", formdata)
      setIsLoading(true)
      const apiPayload = {
        ...formdata,
        yearOfPassout: formdata.year_of_passout,
        positionApplyingFor: formdata.positionApplyingFor ? formdata.positionApplyingFor.trim() : formdata.positionApplyingFor
      }
      const resp = await UserService.registerUser(apiPayload)
      console.log("Register response:", resp)

      const status = resp?.status
      const data = resp?.data

      // Try common keys for registration id and log it for debugging
      const registrationId = data?.registrationId || data?.id || data?._id || data?.userId || data?.user?.id
      console.log("Registration ID:", registrationId)

      if (status === 200 || status === 201) {
        toast.success(data?.message || "OTP sent to your email")
        // Save minimal user info to context so SideNav can render it
        try {
          setUser({ name: formdata.name, email: formdata.email })
          // debug: confirm setUser invoked and what was set
          // eslint-disable-next-line no-console
          console.debug('Register debug - setUser called', { name: formdata.name, email: formdata.email, respData: data })
        } catch (e) {}
        // pass registrationId to the verify page so we can verify against it
        navigate("/verifyotp", { state: { email, formdata, registrationId } })
      } else {
        toast.error(data?.message || "Registration failed")
      }

    } catch (error) {
      console.error("Registration error:", error)
      const serverMessage = error?.response?.data?.message || error?.response?.data || error?.message
      toast.error(typeof serverMessage === "string" ? serverMessage : JSON.stringify(serverMessage))
    } finally {
      setIsLoading(false)
    }
  }

  let {name,email,mobile,password,re_type_password,year_of_passout,positionApplyingFor,joined_institute,institute_name,college} = formdata

  return (
    <div className="size-full flex justify-center items-center px-4 py-4">
      <div className="w-full xl:w-1/3 h-[90vh] rounded-2xl p-6 shadow-2xl overflow-y-scroll no-scrollbar">
        <form className="size-full flex flex-col gap-4" onSubmit={handelsubmit}>
          <h1 className="text-3xl font-bold text-center">Register</h1>

          <Inputs name="name" value={name} handelchange={handelchange}><AiOutlineUser /></Inputs>
          <Inputs name="email" value={email} handelchange={handelchange}><HiOutlineMail /></Inputs>
          <Inputs name="mobile" value={mobile} handelchange={handelchange}><FaPhone /></Inputs>
          <Inputs name="password" value={password} handelchange={handelchange}><RiLockPasswordFill /></Inputs>
          <Inputs name="re_type_password" value={re_type_password} handelchange={handelchange}><RiLockPasswordFill /></Inputs>
          <Inputs name="year_of_passout" value={year_of_passout} handelchange={handelchange}><BsCalendarDate /></Inputs>

          <select name="positionApplyingFor" value={positionApplyingFor} onChange={handelchange} className="h-10 border-b-2">
            <option value="">Select position applying for</option>
            <option value="development">development</option>
            <option value="testing">testing</option>
          </select>

          <select name="joined_institute" value={joined_institute} onChange={handelchange} className="h-10 border-b-2">
            <option value="">Joined institute</option>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>

          <Droupdown
            dropdownoptions={['HTML','CSS','JAVA SCRIPT','REACT.JS','PYTHON','FLASK','DJANGO','SQL']}
            nameofEle="skills"
            handelClickDroupdown={handelClickDroupdown}
            selectedEle={formdata.skills}
            setformdata={setformdata}
          />

          <Inputs name="institute_name" value={institute_name} handelchange={handelchange}><SiNamebase /></Inputs>
          <Inputs name="college" value={college} handelchange={handelchange}><IoSchool /></Inputs>

          <button type="submit" className="h-12 bg-blue-600 text-white rounded-lg" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <SpinnerLoader size={16} />
                <span>Registering..</span>
              </span>
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
