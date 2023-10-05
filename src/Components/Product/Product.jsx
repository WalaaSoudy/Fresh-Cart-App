import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartOperationContext } from './../../Context/CartOperation';


const Product = (props) => {
let{addCart} = useContext(CartOperationContext)
async function addToCart(productid){
 let data = await addCart(productid)
 console.log(data)
}
  return (
    <>
    <div className="col-md-2 my-3">
   <div className="product cursor-pointer">
   <Link to={`/details/${props.prod._id}`} className="nav-link">
   <img src={props.prod.imageCover} className="w-100" alt="" />
   <span className="text-main fw-bold">{props.prod.category.name}</span>
   <h3 className="fw-bold">{props.prod.title.split(' ').slice(0,2).join(" ")}</h3>
   <div className="d-flex justify-content-between px-4">
   <div>{props.prod.price} EGP</div>
  <div> {props.prod.ratingsAverage} <i className="fa fa-star rating-color"></i>
  </div>
   </div>
   </Link>
   <button onClick={()=>addToCart(props.prod._id)} className="btn bg-main text-white w-100">Add to Cart</button>
   
   </div>
    </div>
    </>
  )
}
export default Product