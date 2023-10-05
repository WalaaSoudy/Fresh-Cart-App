import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Category from "./Components/Category/Category";
import Gallery from "./Components/Gallery/Gallery";
import { useContext, useEffect } from "react";
import Products from "./Components/Products/Products";
import MainLayout from "./Components/MainLayout/MainLayout";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Details from "./Components/Details/Details";
import Brands from "./Components/Brands/Brands";
import Register from "./Components/Register/Register";
import LogIn from "./Components/Login/LogIn";
import TokenContextProvider, { TokenContext } from "./Context/Token";
import ProductedRoute from "./Components/ProductedRoute/ProductedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import Cart from "./Components/cart/Cart";
import CartOperationContextProvider from "./Context/CartOperation";
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders';


function App() {
 let query = new QueryClient()
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <ProductedRoute><Home /></ProductedRoute>},
        { path: "/home", element: <ProductedRoute><Home /></ProductedRoute> },
        { path: "/products", element:  <ProductedRoute><Products /></ProductedRoute>},
        { path: "/brands", element:  <ProductedRoute><Brands /></ProductedRoute>},
        { path: "/category", element: <ProductedRoute><Category /></ProductedRoute> },
        { path: "/details/:id", element:  <ProductedRoute><Details /></ProductedRoute>},
        { path: "/address", element:  <ProductedRoute><Address/></ProductedRoute>},
        { path: "/allorders", element:  <ProductedRoute><Orders/></ProductedRoute>},
        { path: "/register", element: <Register /> },
        { path: "/login", element: <LogIn /> },
        { path: "/cart", element: <Cart/> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return ( 
    <CartOperationContextProvider> <QueryClientProvider client={query}>
    <TokenContextProvider>
   <RouterProvider router={routers} />
  
   
   
  </TokenContextProvider>
    </QueryClientProvider></CartOperationContextProvider>
   
    
  
  );
}

export default App;
