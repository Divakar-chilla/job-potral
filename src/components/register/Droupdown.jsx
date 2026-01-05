import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

const Droupdown = ({dropdownoptions,handelClickDroupdown,nameofEle,selectedEle,setformdata}) => {
  const [showdropdown,setshowdropdown] = useState(false)
  // console.log(selectedEle)


const [dd,setDd]=useState(dropdownoptions)
  const handeldrop = (e) =>{
    setshowdropdown(!showdropdown)
  }
  const handelClick=(val)=>{
    setDd(dd.filter((ele)=>ele!=val))
  } 

  const handelDeleteClick=(e,val)=>{
    e.stopPropagation()
    setDd([...dd,val])
    setformdata((preval)=>({...preval,[nameofEle]:preval[nameofEle].filter((ele)=>ele!=val)}))
  }

  return (
    <div className='border-b-2 h-10 w-full relative' onClick={handeldrop}>
      <div className='size-full flex justify-between items-center px-3'>
        <div className='border-b-2 min-h-10 w-full overflow-x-auto'>
          {
            selectedEle.length==0? <span className='capitalize'>select details</span>:<div className="flex w-full gap-2 flex-wrap">
              {
                selectedEle.map((ele,index)=><span key={index+1} className="bg-gray-400 p-2 rounded-sm min-w-fit uppercase text-nowrap flex gap-2 items-center text-xs sm:text-sm">
                  {ele}
                  <RxCross2 className="text-red-500 cursor-pointer" onClick={(e)=>{
                    handelDeleteClick(e,ele)
                  }}/>
                </span>)
              }
            </div>
          }
          
        </div>
        <span className={`duration-100 ${showdropdown?"rotate-180":"rotate-0"}`}><IoIosArrowDown /></span>
      </div>

        {
                showdropdown && <div className="absolute bg-white rounded-br-2xl rounded-bl-2xl border-2 w-full top-10 overflow-y-scroll max-h-60 z-50">

                  {
                    dd.map((opt,index)=><div key={index+1} className="w-full min-h-3 p-3 hover:bg-gray-300 cursor-pointer" onClick={(e)=>{
                      handelClickDroupdown(e,nameofEle,opt)
                      handelClick(opt)
                    }}>
                            <span className="uppercase font-bold text-xs sm:text-sm">
                              {
                                opt
                              }
                            </span>
                    </div>)
                  }

                </div>
        }
        

      
    </div>
  )
}

export default Droupdown