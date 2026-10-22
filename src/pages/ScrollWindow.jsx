import React from 'react'
import ImgeCardLeft from '../components/imgeCardLeft'
import ImageCardRight from '../components/imageCardRight'
const ScrollWindow = () => {
  return (
    <div className=' w-full px-0 py-40 text-black text-8xl md:px-30 '>
      <ImgeCardLeft />
      <ImageCardRight />
    </div>
  )
}

export default ScrollWindow
