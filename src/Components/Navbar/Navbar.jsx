import React, { useContext } from 'react'
import Products from './../Products/Products';
import Category from './../Category/Category';
import logo from '../../assets/imgs/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Gallery from './../Gallery/Gallery';
import Brands from './../Brands/Brands';
import Register from './../Register/Register';
import Cart from './../cart/Cart';
import LogIn from './../Login/LogIn';
import LogOut from './../Logout/LogOut';

import { TokenContext } from './../../Context/Token';

const Navbar = () => {
  let {UserToken,setUserToken} = useContext(TokenContext)
  let navigate = useNavigate()
  function logout(){
    setUserToken(null)
    localStorage.removeItem("token")
    navigate("/login")
}
  
 

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container py-2">
    <a className="navbar-brand" href="#">
        <img src={logo} alt="" />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
     
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {UserToken !== null ? <>
          <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
      <NavLink className="nav-link" to="/products">Products</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/category">Category</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/brands">Brands</NavLink>
      </li>
      <li className="nav-item">
      <NavLink className="nav-link" to="/cart">Cart</NavLink>
    </li>
      </> 
    :''}
      
      </ul>
  
        
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
        <li className="nav-item d-flex align-items-center">
        <i className="fab fa-facebook mx-2"></i>
        <i className="fab fa-twitter  mx-2"></i>
        <i className="fab fa-instagram  mx-2"></i>
        <i className="fab fa-youtube  mx-2"></i>
        

        </li>
        {UserToken !==null?
         <>
         <li className="nav-item">
         <span onClick={()=>logout()} className="nav-link cursor-pointer">LogOut</span>
         
       </li>
         </>
         :<>
         <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
         <li className="nav-item">
         <NavLink className="nav-link" to="/login">Log In</NavLink>
       </li>
      </>}
        
        
        
       
        
        
        </ul>
        </div>
  </div>
</nav>

  </>
  )
}
export default Navbar