'use client'
import React from 'react'
import Contact from "./Contact";
import Message from "./Message";
import { useDispatch,useSelector } from 'react-redux';
import { getUserAsync,getallContactsAsync } from 'redux/userSlice/ ';
import { useEffect } from 'react';
const page = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.user);
  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUserAsync());
      await dispatch(getallContactsAsync());
    };
    fetchUser();
  }, []);
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
