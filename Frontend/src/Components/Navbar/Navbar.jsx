import React, { useContext, useState } from 'react';
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cartLogo.png'
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {

  const [menu,setMenu] = useState("shop");
  const {getTotalCartItems}= useContext(ShopContext);
   
  return (
    <div className='navbar'>
<div className="nav-logo">
  <img src={logo} alt=""/>
  <p>AYURCARE</p>
</div>
<ul className="nav-menu">
  <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Home</Link>{menu ==="shop"?<hr/>:<></>}</li>
  <li onClick={()=>{setMenu("spices")}}><Link style={{textDecoration:'none'}} to='/spices'>Spice</Link>{menu ==="spices"?<hr/>:<></>}</li>
  <li onClick={()=>{setMenu("seeds")}}><Link style={{textDecoration:'none'}} to='/seeds'>Seed</Link>{menu ==="seeds"?<hr/>:<></>}</li>
  <li onClick={()=>{setMenu("herbals")}}><Link style={{textDecoration:'none'}} to='/herbals'>Herbal</Link>{menu ==="herbals"?<hr/>:<></>}</li>
</ul>
<div className="nav-login-cart">  
     <Link to='/login'><button>login</button></Link>
     <Link to='/cart'><img src={cart_icon} alt="" /></Link>
     <div className="nav-cart-count">{getTotalCartItems()}</div>
</div>

    </div>
  );
}

export default  Navbar;