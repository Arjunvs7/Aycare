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
  <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens'>Spice</Link>{menu ==="mens"?<hr/>:<></>}</li>
  <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'>Seed</Link>{menu ==="womens"?<hr/>:<></>}</li>
  <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>Herbal</Link>{menu ==="kids"?<hr/>:<></>}</li>
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