'use client'
import React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux";
import {updateCurrent,setCIUser} from "../../redux/userSlice";
const Current = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state?.user?.user?.id);
  useEffect(() => {
    if(!user) return;
    const fetchData = async() => {

      const response = await fetch(`http://localhost:4000/message/getmy/${user}`);
      const data = await response.json();
      await dispatch(updateCurrent(data));
    }
    fetchData();
  }, [user])
  const current = useSelector((state)=>state?.user?.current);
  function formatDate(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    const timeDifference = currentDate - inputDate;
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDay) {
      return 'Today';
    } else if (timeDifference < 2 * oneDay) {
      return 'Yesterday';
    } else {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return inputDate.toLocaleDateString(undefined, options);
    }
  }
  
  return (
    <div className=''>
      {!current && <>loading...</>}
      {current && current.length!==0 &&  
      <div className='w-full h-full bg-white'>
        {current?.map((obj)=>(
          
          <div className=' h-16  flex justify-start items-center  bg-mywhite hover:shadow:lg cursor-pointer border-b-2 border-r-2' onClick={async()=>await dispatch(setCIUser(obj?.senderId === user?(obj?.receiver):(obj?.sender)))}>
            <div><img alt="img" className='w-10 h-10 rounded-full ml-2' src={obj?.senderId === user?(obj?.receiver?.image):( obj?.sender?.image)} /></div>
            <div className='flex-col ml-2'>
              <h1 className='font-semibold'>{obj?.senderId === user?(obj?.receiver?.name):( obj?.sender?.name)}</h1>
              <p>{obj?.message.substring(0,20)}...</p>
              
            </div>
            <div className='self-end m-2'><p>({formatDate(obj?.createdAt)})</p></div>
          </div>
        )
        )}
      </div>
      }
      {current && current.length===0 && <div className='flex w-full h-full justify-center items-center font-bold'>
        No Chats Log Found.
        </div>}
    </div>
  )
}

export default Current
