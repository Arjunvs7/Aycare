import React, { useState } from 'react';
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cartLogo.png'
import { Link, NavLink } from 'react-router-dom';
const Navbar = () => {
  const [menu,setMenu] = useState("Shop")
  return (
    <div className='navbar'>
<div className="nav-logo">
  <img src={logo} alt=""/>
  <p>AYURCARE</p>
</div>
<ul className="nav-menu">
  <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu ==="shop"?<hr/>:<></>}</li>
  <li onClick={()=>{setMenu("spices")}}><Link style={{textDecoration:'none'}} to='/spices'>Spice</Link>{menu ==="spices"?<hr/>:<></>}</li>
  <li onClick={()=>{setMenu("seeds")}}><Link style={{textDecoration:'none'}} to='/seeds'>Seed</Link>{menu ==="seeds"?<hr/>:<></>}</li>
  <li onClick={()=>{setMenu("herbals")}}><Link style={{textDecoration:'none'}} to='/herbals'>Herbal</Link>{menu ==="herbals"?<hr/>:<></>}</li>
</ul>
<div className="nav-login-cart">  
     <Link to='/login'><button>login</button></Link>
     <Link to='/cart'><img src={cart_icon} alt="" /></Link>
     <div className="nav-cart-count">0</div>
</div>

    </div>
  );
}

export default  Navbar;