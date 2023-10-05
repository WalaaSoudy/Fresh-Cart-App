import React, { useContext } from 'react'
import { CartOperationContext } from './../../Context/CartOperation';
import { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    let{getorders}= useContext(CartOperationContext)
    async function gerallorders()
    {
        let res = await getorders()
        console.log(res)
        setOrders(res.data.data);
    }
    useEffect(() => {
        gerallorders()
    }, [])
  return (
    <div className="container my-5">
    <h1 className="mb-4">All Orders</h1>
    <div className="row">
      {orders?.map((order) => (
        <div className="col-md-4" key={order._id}>
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Order ID: {order._id}</h3>
              <p>Total Order Price: ${order.totalOrderPrice}</p>
              <p>Payment Method: {order.paymentMethodType}</p>
              <p>Is Paid: {order.isPaid ? 'Yes' : 'No'}</p>
              <p>Is Delivered: {order.isDelivered ? 'Yes' : 'No'}</p>
              {/* You can display more details about the order here */}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Orders
