'use client';
import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { firebaseAuth } from "../Utils/firebaseConfig";
import { useRouter } from 'next/navigation';
import {useSelector,useDispatch} from "react-redux";
import { updateNewUser } from 'redux/userSlice/ ';
const page = () => {
  const dispatch = useDispatch();
  const [disable, Setdisable] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    Setdisable(true);
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
    let obj = { name: user.displayName, email: user.email, image: user.photoURL }

    const response = await fetch('http://localhost:4000/user/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    const data = await response.json();
    console.log(data);
    Setdisable(false);
    if (data.status == false) { Setdisable(true);
      dispatch(updateNewUser(obj));
      router.push('/onboarding');
     }
     else{
      router.push('/main');
     }
  }
  return (
    <div className="flex items-center justify-center w-full h-screen bg-[url('https://media.giphy.com/media/DRinNvjCXc5Iexx0CH/giphy.gif')] bg-cover bg-center bg-no-repeat">
      <div className="text-center">

        <button
          disabled={disable}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleLogin}
        >
          <FcGoogle className="mr-2" />
          Login with Google
        </button>
      </div>
    </div>
  )
}

export default page

