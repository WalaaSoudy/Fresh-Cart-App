import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState,useContext } from "react";
import { CartOperationContext } from './../../Context/CartOperation';

const Details = () => {
  let{addCart} = useContext(CartOperationContext)
async function addToCart(productid){
 let data = await addCart(productid)
 console.log(data)
}
    let [details,setdetails]= useState([]);
  let {id} = useParams();
    console.log(id);
    async function getDetails() {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        console.log(data);
        setdetails(data.data);
    }
    useEffect(() => {
        getDetails();
    },[])
  return (
    <>
    <div className="container">
    <div className="row justify-content-center align-items-center">
    <div className="col-md-5">
    <img src={details.imageCover} className="w-100"  alt="" />
    </div>
    <div className="col-md-6">
    <h1 className="text-main">{details.title}</h1>
    <h3>{details.price} EGP</h3>
    <p>{details.description}</p>
    <button onClick={()=>addToCart(id)} className="btn bg-main text-white w-100">Add to Cart</button>
    </div>
    </div>
    </div>

    </>
  )
}
export default Details