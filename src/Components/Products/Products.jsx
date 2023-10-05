import React, { useEffect, useState } from 'react'
import Product from './../Product/Product';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useQuery } from 'react-query';
const Products = () => {
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true);

function getProducts() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/products');
}
let {data,isLoading} = useQuery("products",getProducts)
console.log(data?.data.data);
  // async function getProducts() {
  //   const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  //   console.log(data);
  //   setProducts(data.data);
  //   setLoading(false);
  // }
  // useEffect(() => {
  //   getProducts();
  // },[])
  return (
    <>
   
    <h1 className="text-center my-5">Products</h1>
      <div className="container-fluid">
      {isLoading?<Loading/>:<>
      <div className="row">

      {data?.data.data.map((elm) => <Product key={elm._id} prod={elm} />)}

      </div>
      </>}
    
      </div>
    </>
  )
}

export default Products
