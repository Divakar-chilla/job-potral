import React from 'react'
import { createPortal } from 'react-dom'
import useUserContext from '../hooks/useUserContext'

const Logout = () => {
  const { setShowPortal, setGlobalState } = useUserContext()

  const handelClickNo = (e) => {
    e.stopPropagation()
    setShowPortal(false)
  }

  const handelClickYes = () => {
    setGlobalState({
      user: null,
      token: null,
      isLoading: false,
      companies: []
    })
    setShowPortal(false)
  }

  return createPortal(
    <div className='bg-black/60 h-screen w-screen fixed left-0 top-0 flex justify-center items-center'>
      <div className='size-1/2 bg-black/80 flex justify-center items-center flex-col gap-40 p-20 rounded-2xl'>
        <div>
          <h1>Are you sure You want to Logout?</h1>
        </div>
        <div className='flex w-full h-10 gap-10'>
          <button
            className='grow text-2xl text-white rounded-sm bg-red-500'
            onClick={handelClickYes}
          >
            Yes
          </button>
          <button
            className='grow text-2xl text-white rounded-sm bg-lime-500'
            onClick={handelClickNo}
          >
            No
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('logout')
  )
}

export default Logout
