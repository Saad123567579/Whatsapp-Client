'use client';
import React from 'react'
import { useStateProvider } from 'context/stateContext/ '
const page = () => {
  const [state,dispatch] = useStateProvider();
  console.log(state);
  return (
    <div>
      onboarding
    </div>
  )
}

export default page
