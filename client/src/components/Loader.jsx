import React from 'react'
import {FadeLoader} from "react-spinners"

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FadeLoader color="#CA3E41" />
    </div>
  )
}

export default Loader