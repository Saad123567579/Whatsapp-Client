'use client'
import React ,{useEffect} from "react";
import { FiPhoneCall } from "react-icons/fi";
import { BsCameraVideo } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { setCIUser } from "redux/userSlice/ ";
import{BsFillEmojiSmileFill} from "react-icons/bs";
import {AiOutlinePaperClip,AiOutlineSend} from "react-icons/ai";

const Message = () => {
  const dispatch = useDispatch();
  const ciUser = useSelector((state) => state?.user?.ciUser);
  const handleSend = () =>{
    let text = document.getElementById('t').value;
    if(text=="") alert("Type something before sending ");
    else alert(`${text}`);
  }
  
  return (
    <div className="h-full w-full">
      {ciUser !== null ? (
        <div className="flex flex-col h-screen">
          <div className="w-full h-16 bg-whatsapp flex">
            <img className="w-12 h-12 m-2 rounded-full" src={ciUser?.image} alt="img" />
            <div className="flex-col justify-end p-2 h-full">
              <h1 className="font-semibold text-xl">{ciUser?.name}</h1>
              <p>online</p>
            </div>
            <div className="flex w-full justify-end items-center">
              <div className="text-2xl ml-4">
                <FiPhoneCall />
              </div>
              <div className="text-2xl ml-4">
                <BsCameraVideo />
              </div>
              <div className="text-2xl ml-4">
                <BiSearch />
              </div>
              <div className="text-2xl ml-4">
                <BiDotsVerticalRounded />
              </div>
            </div>
          </div>
          <div className="w-full h-full bg-mywhite flex-grow flex flex-col justify-end items-end">
            <div className=" w-full h-14 flex items-center border-t-2">
            <div className="text-2xl ml-4  cursor-pointer">
                <BsFillEmojiSmileFill />
              </div>
              <div className="text-2xl ml-4  cursor-pointer">
                <AiOutlinePaperClip />
              </div>
              <div className="ml-2 w-4/5 "><input className="p-2 rounded-l-full rounded-r-full w-full" id="t" type="text" /></div>
              <div className="text-2xl ml-4 cursor-pointer" onClick={handleSend}>
                <AiOutlineSend />
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-mywhite flex justify-center items-center">
          <h1 className="text-4xl font-semibold">Welcome</h1>
        </div>
      )}
    </div>
  );
};

export default Message;




