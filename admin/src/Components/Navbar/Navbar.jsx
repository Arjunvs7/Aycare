import React from 'react';
import './Navbar.css';
import navLogo from '../../assets/nav-logo.png';
import navProfile from '../../assets/nav-profile.svg';


const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navLogo} alt="" className="nav-logo" />
      <img src={navProfile}  className="nav-Profile"  alt=""/>

    </div>
  );
}

export default Navbar;
