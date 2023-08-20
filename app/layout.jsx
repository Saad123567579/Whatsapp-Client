'use client'
import './globals.css';

import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MyWhatsapp',
  description: 'My Great Whatsapp',
};

export default async function RootLayout({ children }) {
  


  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ToastContainer />
        </body>
      </html>
    </Provider>
  );

}


