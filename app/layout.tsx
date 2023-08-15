'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StateProvider } from '../context/stateContext';
import reducer,{initialState} from "../context/stateReducer";
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'MyWhatsapp',
  description:'My Great Whatsapp',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <html lang="en">
       
      <body className={inter.className}>{children}</body>
    </html>
    </StateProvider>
  )
}
