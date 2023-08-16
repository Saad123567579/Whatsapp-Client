'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'MyWhatsapp',
  description: 'My Great Whatsapp',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <html lang="en">

        <body className={inter.className}>
          {children}
          <ToastContainer />
        </body>
      </html>
    </Provider>
  )
}