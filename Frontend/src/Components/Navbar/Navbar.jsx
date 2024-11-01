import React, { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cartLogo.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  
  const location = useLocation();  // Get the current route location

  // If the current route is /login, don't show the navbar
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt=""/>
        <p>AYURCARE</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: 'none' }} to='/'>Home</Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("roots")}>
          <Link style={{ textDecoration: 'none' }} to='/roots'>Roots</Link>
          {menu === "roots" && <hr />}
        </li>
        <li onClick={() => setMenu("seeds")}>
          <Link style={{ textDecoration: 'none' }} to='/seeds'>Seed</Link>
          {menu === "seeds" && <hr />}
        </li>
        <li onClick={() => setMenu("herbals")}>
          <Link style={{ textDecoration: 'none' }} to='/herbals'>Herbal</Link>
          {menu === "herbals" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
