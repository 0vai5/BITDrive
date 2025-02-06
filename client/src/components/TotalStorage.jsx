import React from 'react'

const TotalStorage = () => {
  return (
    <div className='h-1/2 w-1/2 bg-white p-4 rounded-md shadow-md'>
    <h1 className='text-2xl font-semibold'>Storage</h1>
    <p>The total storage used by you out of 2GBs</p>
    
    <div className='flex justify-center flex-col gap-2 items-center mt-4'>
      <p>1.0 GB / 2.0GB</p>
    </div>
  </div>
  )
}

export default TotalStorage