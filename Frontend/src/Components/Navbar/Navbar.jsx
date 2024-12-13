import React, { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cartLogo.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, clearCart } = useContext(ShopContext);

  const location = useLocation();

  // Hide navbar on /login route
  if (location.pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    clearCart(); // Clear cart items on logout
    window.location.replace('/');
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt=""/>
        <p>AYURCARE</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to='/'>Home</Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("roots")}>
          <Link to='/roots'>Roots</Link>
          {menu === "roots" && <hr />}
        </li>
        <li onClick={() => setMenu("seeds")}>
          <Link to='/seeds'>Seed</Link>
          {menu === "seeds" && <hr />}
        </li>
        <li onClick={() => setMenu("herbals")}>
          <Link to='/herbals'>Herbal</Link>
          {menu === "herbals" && <hr />}
        </li>
      </ul>
      
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
          ? <button onClick={handleLogout}>Logout</button>
          : <Link to='/login'><button>Login</button></Link>
        }
        
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
        
        {localStorage.getItem('auth-token') && (
          <div className="profile">
            <Link to="/profile" className="profile-link">
              <h3>Profile</h3>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
