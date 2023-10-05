// Import Axios
import axios from 'axios';

// Now, you can use Axios to make HTTP requests.

import { createContext} from "react";
import { useState } from 'react';
import { useContext } from 'react';
import { TokenContext } from './Token';
import { useEffect } from 'react';

export const CartOperationContext = createContext()

export default function CartOperationContextProvider(props){
  let [cartid,setcartid] = useState(null)
    let [cartNums,setCartNums] = useState(0)
    
     
      let headers = {token:localStorage.getItem('token')}
      let BaseUrl = 'https://ecommerce.routemisr.com'
    //add to cart
  
    function addCart(productId)
    {
       return axios.post(`${BaseUrl}/api/v1/cart`,{productId},{headers})
      .then(res=>res)
      .catch(err=>err)
    }
    //get cart data
    function getCart()
    {
       return axios.get(`${BaseUrl}/api/v1/cart`,{headers})
      .then(res=>res)
      .catch(err=>err)
    }
    //delete ite,
    function deleteCart(id)
    {
       return axios.delete(`${BaseUrl}/api/v1/cart/${id}`,{headers})
      .then(res=>res)
      .catch(err=>err)
    }
    //update count
    function updateCart(id,count)
    {
       return axios.put(`${BaseUrl}/api/v1/cart/${id}`,{count},{headers})
      .then(res=>res)
      .catch(err=>err)
    }
      
  
  
    //checkout
  
    function checkout(id,shippingAddress)
    {
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`,
      {shippingAddress},{headers})
      .then(res=>res)
      .catch(err=>err)
    }
    async function get () {
     
     let {data} = await getCart()
     console.log(data)
     setcartid(data?.data._id)
     console.log(data?.data._id)
     }
     useEffect(() => {
      get();
    },[]);

    function getorders()
    {
      return axios.get(`${BaseUrl}/api/v1/orders`,{headers})
      .then(res=>res)
      .catch(err=>err)
    }
    return <CartOperationContext.Provider value={{getorders,cartid,addCart,checkout,getCart,deleteCart,updateCart}}>
    
            {props.children}
        </CartOperationContext.Provider>
    
}