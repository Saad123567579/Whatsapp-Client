'use client'
import React from 'react'
import Contact from "./Contact";
import Message from "./Message";

const page = () => {
  return (
    <div className='flex w-full h-screen bg-black'>
      <div className='w-1/4 h-full '>
      <Contact />
      
      </div>
      <div className='w-3/4 h-full bg-slate-900'>
        <Message />
      </div>
      
    </div>
  )
}

export default page
