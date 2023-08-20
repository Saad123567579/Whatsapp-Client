'use client'
import React from 'react'
import { AiOutlineMessage } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { useSelector,useDispatch } from 'react-redux';
import Allcontacts from "./Allcontacts";
import Current from "./Current";
import { toggleContact } from 'redux/userSlice/ ';
const Contact = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.user?.user);
    const show = useSelector((state)=>state?.user?.show);
 

    return (
        <div className='w-full h-full bg-white'>
            <div className='flex flex-col'>
                <div className='flex  align-middle bg-whatsapp '>
                    <img className='w-12 h-12 m-2 rounded-full' src={user?.image} alt="img" />
                    <div className="flex  items-center w-full justify-end">
                        <div className='m-2 text-2xl cursor-pointer' onClick={async()=> await dispatch(toggleContact())}>
                            <AiOutlineMessage />
                        </div>
                        <div className='text-2xl'>
                            <BiDotsVerticalRounded />
                        </div>
                    </div>
                </div>
                <div className='w-full h-12  flex items-center'>
                    <input className='w-full  bg-mywhite text-white ml-2 mr-2 mt-2 mb-2 rounded-lg p-1' type="text" placeholder='seach or start a new chat' />
                    <span className='w-8 m-2'><BiSearch /></span>
                </div>
                <div className='w-full h-full'>{show =="contact"?(<div className='overflow-y-auto'><Allcontacts/></div>):(<Current/>) }</div>
            </div>
        </div>
    )
}

export default Contact
