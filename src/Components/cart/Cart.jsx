import { useContext, useEffect, useState } from "react";
import { CartOperationContext } from "../../Context/CartOperation";
import Loading from './../Loading/Loading'; // Import your Loading component
import { Link } from 'react-router-dom';

const Cart = () => {
  let [isLoading, setIsLoading] = useState(true); // Loading state for fetching cart data
  let [isDeleting, setIsDeleting] = useState(false); // Loading state for item deletion
  let [isUpdating, setIsUpdating] = useState(false); // Loading state for cart update
  let [data, setData] = useState(null);
  let { getCart, deleteCart, updateCart  } = useContext(CartOperationContext);



  async function update(id, count) {
    try {
      setIsUpdating(true); // Set updating state to true when update starts
      let res = await updateCart(id, count);
      console.log(res.data);
      get();
    } finally {
      setIsUpdating(false); // Set updating state to false when update is completed (success or failure)
    }
  }

  async function get() {
    try {
      setIsLoading(true); // Set loading state to true when fetching data starts
      let res = await getCart();
      console.log(res.data);
      setData(res.data);
    } finally {
      setIsLoading(false); // Set loading state to false when data is loaded (success or failure)
    }
  }

  async function deleteItem(id) {
    try {
      setIsDeleting(true); // Set deleting state to true when deletion starts
      let res = await deleteCart(id);
      console.log(res.data);
      get(); // Refresh the cart data after deleting an item
    } finally {
      setIsDeleting(false); // Set deleting state to false when deletion is completed (success or failure)
    }
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="container">
      <div className="cart bg-main-light p-3">
        <h1>Shopping Cart</h1>
        {isLoading ? (
          <Loading /> // Display loading indicator while fetching data
        ) : (
          <>
         
            <h3 className="text-main my-3">
              Total Price : {data?.data.totalCartPrice}
            </h3>
            {data?.data.products.map((item) => (
              <div
                key={item.product._id}
                className="cart-item bg-main-light p-3 my-3 row"
              >
                <div className="col-md-2">
                  <img
                    src={item.product.imageCover}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-9">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h3 className="fw-bold">
                        {item.product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <h3 className="fw-bold">{item.product.category.name}</h3>
                      <h4 className="text-main my-2">Price : {item.price}</h4>
                      {isDeleting ? (
                        <Loading /> // Display loading indicator while deleting
                      ) : (
                        <button
                          className="my-2 cursor-pointer text-main btn p-0"
                          onClick={() => deleteItem(item.product._id)}
                        >
                          <i className="fas fa-trash-can text-main"></i> Remove
                        </button>
                      )}
                    </div>
                    <div>
                      <button onClick={() => update(item.product._id, item.count + 1)} className="btn bg-main text-white">+</button>
                      <span className="mx-3 fw-bold">{item.count}</span>
                      <button onClick={() => update(item.product._id, item.count - 1)} className="btn bg-main text-white">-</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Link to="/address" className='btn bg-main w-100 text-light my-3 '>Online Payment</Link>
      <button className='btn bg-main w-100 text-light my-3'>Cash Delivery</button>
  
      </div>
 
      
      
  
  );
};

export default Cart;
