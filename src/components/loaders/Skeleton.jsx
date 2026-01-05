import React from 'react'

const Skeleton = () => {
    return (
        <div className='h-[280px] w-[400px] min-w-[400px] max-sm:min-w-0 max-sm:w-full max-sm:h-[360px] bg-white rounded-2xl p-5 flex flex-col gap-5'>
            
            <div className='text-2xl font-bold w-full bg-gray-200 h-5 animate-pulse'>
                <span></span>
            </div>

            <div className='flex gap-2 overflow-x-scroll bg-gray-200 h-5 animate-pulse'>
                <span className='bg-sky-50 p-1.5 text-sm rounded-xl text-blue-400'></span>
            </div>

            <div className='flex gap-2 overflow-x-scroll bg-gray-200 h-5 animate-pulse'>
                <span className='bg-lime-50 p-1.5 text-sm rounded-xl text-lime-800'></span>
            </div>

            <div className='w-full flex gap-1 max-sm:flex-col animate-pulse bg-gray-200 h-5'>
                <div className='grow flex items-center font-bold'>
                    <span className='pr-1'></span>
                    <span></span>
                </div>
                <div className='grow font-bold max-sm:flex max-sm:flex-col animate-pulse'>
                    <span></span>
                    <span className='text-red-500'></span>
                </div>
            </div>

            <div className='w-full h-10 bg-slate-200 rounded-2xl animate-pulse'>
                <button className='size-full flex justify-center items-center text-white font-bold'></button>
            </div>
        </div>
    )
}

export default Skeleton