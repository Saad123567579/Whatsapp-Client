'use client'
import React, {useRef , useState, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { BsCameraVideo } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { setCIUser } from "redux/userSlice/ ";
import { TiTickOutline, TiTick } from "react-icons/ti";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import { toast } from "react-toastify";
import { setMsgLog , setSocket , updateMsglog } from "../../redux/userSlice";
import io from 'socket.io-client';
import Picker from "emoji-picker-react";



const Message = () => {
  const [picker,setPicker] = useState(false);
  const [status,setStatus] = useState("offline");
  const socket = useRef();
  const [socketEvent,setsocketEvent] = useState(false);
  const dispatch = useDispatch();
  const ciUser = useSelector((state) => state?.user?.ciUser);
  const cUser = useSelector((state) => state?.user?.user);
  const messages = useSelector((state) => state?.user?.msglog);
  const handleSend = async () => {
    setPicker(false);
    let text = document.getElementById('t').value;
    if (text == "") return toast.error("Type something before sending ");
    const obj = { message: text, from: cUser.id, to: ciUser.id };
    const response = await fetch('http://localhost:4000/message/add', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    const data = await response.json();
    if (data == "Internal Server Error") return toast.error("Internal Server Error");
    document.getElementById('t').value = "";
    socket?.current?.emit("send-msg",data);
    return toast.success("Sent");
  }
  useEffect(() => {
    let element = document.getElementById('t');
    if (!element) return;
    else { document.getElementById('t').value = ""; return; }
  }, [ciUser])
  useEffect(() => {
    if (!ciUser) return;
    const fetchMessage = async () => {
      const response = await fetch(`http://localhost:4000/message/get/${cUser.id}/${ciUser.id}`);
      const data = await response.json();
      dispatch(setMsgLog(data));
    }
    fetchMessage();
  }, [ciUser])
  useEffect(() => {
    if(!cUser) return ;
    const fdata = async() => {
       socket.current = io('http://localhost:4000');
       await dispatch(setSocket(socket?.current?.id));
      socket.current.emit("adduser",cUser?.id);
      return () => {
        socket.current.emit("disconnect");
      }
     
    }
   fdata(); 
  }, [cUser])

  useEffect(() => {
    if (!ciUser) return;
  
    // Emit an event to get the current users
    socket.current.emit("getcurrentusers", cUser?.id);
  
    // Define the event handler for receiving current users
    const handleCurrentUsers = (users) => {
      if (!ciUser) return;
  
      // console.log("the users are ", users);
  
      // Check if the current user is online in the received list of users
      if (users.includes(ciUser.id)) {
        // console.log("online");
        setStatus("online");
      } else {
        setStatus("offline");
        // console.log("offline");
      }
    };
  
    // Subscribe to the "herecurrentusers" event
    socket?.current?.on("herecurrentusers", handleCurrentUsers);
  
    // Clean up by unsubscribing from the "herecurrentusers" event
    return () => {
      socket?.current?.off("herecurrentusers", handleCurrentUsers);
    };
  }, [ciUser, cUser]); // Make sure to include cUser as a dependency
  
  socket?.current?.on("getOnlineusers",async(users)=>{
    if (!ciUser) return;
    // console.log("the users are ", users);
  
      // Check if the current user is online in the received list of users
      if (users.includes(ciUser.id)) {
        const response = await fetch(`http://localhost:4000/message/get/${cUser?.id}/${ciUser?.id}`);
      const data = await response.json();
      dispatch(setMsgLog(data));
        setStatus("online");
      } else {
        setStatus("offline");
        // console.log("offline");
      }
  });
  socket?.current?.on("typing",()=>{
    setStatus("typing...");
  })
  useEffect(() => {
    if (socket.current) {
      const receiveMsgHandler = async (message) => {
        // await dispatch(updateMsglog(message));
        const response = await fetch(`http://localhost:4000/message/get/${cUser?.id}/${ciUser?.id}`);
      const data = await response.json();
      dispatch(setMsgLog(data));
      };
  
      socket.current.on("receive-msg", receiveMsgHandler);
  
      return () => {
        socket.current.off("receive-msg", receiveMsgHandler);
      };
    }
  }, []);
  
  const handleTextChange = () => {
    if(!ciUser) return;
    socket?.current?.emit("typing",{"from":cUser.id,"to":ciUser.id}); }

  const onEmojiClick = ( emojiObject) => {
      console.log(emojiObject);
      const updatedMessage = document.getElementById('t').value + emojiObject.emoji;
      document.getElementById('t').value = updatedMessage;
    };
    
  
  return (
    <div className="h-full w-full  ">
      {ciUser !== null ? (
        <div className="flex flex-col h-full">
          <div className="w-full h-16 bg-whatsapp flex">
            <img className="w-12 h-12 m-2 rounded-full" src={ciUser?.image} alt="img" />
            <div className="flex-col justify-end p-2 h-full">
              <h1 className="font-semibold text-lg">{ciUser?.name?.split(' ')[0]}</h1>
              <p>{status}</p>
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
          <div className="w-full h-5/6 bg-mywhite  flex flex-col justify-end items-end">
            <div className=" w-full h-full max-h-full overflow-y-auto flex-grow">
              {
                messages && messages.length ? (
                  messages.map((message) => ( 
                    message?.senderId === cUser.id ? (<div className={`items-center h-8 flex mt-10 justify-end border-box `}>
                      <h1 className="bg-green-400 rounded-xl flex-row-reverse justify-end p-2 m-8  ">{message.message}
                        {message.status === "seen" ?
                          (<div className="text-2xl ml-4  cursor-pointer"><TiTick /></div>)
                          :
                          (<div className="text-2xl ml-4  cursor-pointer"><TiTickOutline /></div>)}
                      </h1>

                    </div>) : (
                      <div className={`items-center h-8 flex m-2 mt-4 p-2 justify-start  `}>
                        <h1 className="bg-slate-400 rounded-xl flex  p-2">{message.message}

                        </h1>

                      </div>
                    )


                  ))
                ) :


                  (<div className="w-full h-full bg-mywhite flex justify-center items-center">
                    <h1 className="text-4xl font-semibold">Start A Conversation Now</h1>
                  </div>)

              }
            </div>
            <div className=" w-full h-1/6 flex items-center mt-4 border-t-2">
              <div className="text-2xl ml-4  cursor-pointer">
                <BsFillEmojiSmileFill onClick={()=>setPicker(!picker)} />
                {picker && (
    <div className="absolute bottom-14 left-90 z-10">
      <Picker
        pickerStyle={{ width: "100%", position: "static" }} // Use inline style to match Tailwind classes
        onEmojiClick={onEmojiClick}
      />
    </div>
  )}
              </div>
              <div className="text-2xl ml-4  cursor-pointer">
                <AiOutlinePaperClip />
              </div>
              <div className="ml-2 w-4/5 "><input onChange={handleTextChange} className="p-2 rounded-l-full rounded-r-full w-full" id="t" type="text" /></div>
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




