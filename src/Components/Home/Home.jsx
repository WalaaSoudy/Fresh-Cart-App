import React from 'react'
import Navbar from '../Navbar/Navbar'
import Gallery from './../Gallery/Gallery';
import Category from '../Category/Category';
import Products from '../Products/Products';
import Brands from '../Brands/Brands';

const Home = () => {
  
  return (
    <>
      
      <Gallery/>
      <Category/>
      <Products/>
      <Brands/>
    </>
  )
}

export default Home
