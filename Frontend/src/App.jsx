import "./App.css";
import {Routes,Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import UserSignup from "./Authentication/User/UserSignup";
import UserLogin from "./Authentication/User/UserLogin";
import ProductList from "./Pages/ProductList";

import GotoCart from "./Pages/Cart/GotoCart";
import Singleproduct from "./Pages/SingleProduct";
import WishList from "./Pages/Wishlist";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import { ToastContainer } from "react-toastify";


const App=()=>{
  return <div className="app">
    <ToastContainer />
    
   <Routes>
   
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>


    <Route path="/user/signup" element={<UserSignup/>}/>
    <Route path="/user/login" element={<UserLogin/>}/>
    <Route path="/product" element={<ProductList/>}/>
    <Route path="/cart" element={<GotoCart/>}/>
    <Route path="/product/:id" element={<Singleproduct/>}/>
    <Route path="/wishlist" element={<WishList/>}/>






   </Routes>
 
  </div>


}

export default App;