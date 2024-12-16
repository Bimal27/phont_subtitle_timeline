import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="app__navbar">
      <ul className="app__navbar-links">
        <li className="p__opensans">Home</li>
        <li className="p__opensans">About</li>
        <li className="p__opensans">Products</li>
        <li className="p__opensans">Career</li>
        <li className="p__opensans">Contact</li>
      </ul>
      <div className="app__navbar-login">
        <a href="#login" className="p__opensans">Log In/Registration</a>
        <div />
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li>Home</li>
              <li>About</li>
              <li>Menu</li>
              <li>Awards</li>
              <li>Contact</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
