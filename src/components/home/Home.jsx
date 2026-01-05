import React, { useState } from 'react'
import SideNav from './sidenav/SideNav'
import DashBord from './dashbord/DashBord'



const Home = () => {
  const [isOpen, setOpen]=useState("")
  const handelMouseIn=()=>{
    setOpen(true)
  } 
  const handelMouseOut=()=>{
    setOpen(false)
  }
  const handelClick=()=>{
    setOpen(!isOpen)
  }
  return (
    <div className='size-full'>
      <div className='w-80 h-full  fixed -left-72 hover:left-0
      duration-100  p-5 flex justify-center items-center' onMouseEnter={handelMouseIn} onMouseLeave={handelMouseOut} onClick={(handelClick)}>
        <SideNav></SideNav>
      </div>
      <div className={`duration-100 ${isOpen?"ml-82":"ml-10"} ${isOpen?"max-sm:hidden":""}`}>
     <DashBord></DashBord>
      </div>
    </div>
  )
}

export default Home