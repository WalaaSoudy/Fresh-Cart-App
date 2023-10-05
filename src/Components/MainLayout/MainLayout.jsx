import React, { useContext } from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { TokenContext } from '../../Context/Token';
import { useEffect } from 'react';

const MainLayout = () => {
  const { setUserToken } = useContext(TokenContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
  }, [setUserToken]);

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default MainLayout
