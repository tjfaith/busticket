import React, { useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  return (
    <>
      <nav className='navbar'>
        <div className='container flex_space'>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? "fas fa-times" : " fas fa-bars"}></i>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li>
              <Link to='/' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to='/about' onClick={closeMobileMenu}>
                About us
              </Link>
            </li>
            <li>
              <Link to='/gallery' onClick={closeMobileMenu}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to='/destinations' onClick={closeMobileMenu}>
                Destinations
              </Link>
            </li>

            <li>
              <Link to='/testimonial' onClick={closeMobileMenu}>
                Testimonial
              </Link>
            </li>
            <li>
              <Link to='/contact' onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to='/booking' onClick={closeMobileMenu}>
                Book Trip
              </Link>
            </li>
          </ul>

          <div className='login-area flex'></div>
        </div>
      </nav>

      <header>
        <div className='container flex_space'>
          <div className='logo flex items-center'>
            <img className="shadow-lg rounded-full bg-green-200 w-24" src='logo.png' alt='' /><span className="ml-5 font-extrabold text-3xl text-green-800">Express Travels</span>
          </div>

          <div className='contact flex_space '>
            <div className='box flex_space'>
              <div className='icons'>
                <i className='fal fa-clock'></i>
              </div>
              <div className='text'>
                <h4>Working Hours</h4>
                <Link to='/contact'>Monday - Sunday: 9.00am to 6.00pm</Link>
              </div>
            </div>
            <div className='box flex_space'>
              <div className='icons'>
                <i className='fas fa-phone-volume'></i>
              </div>
              <div className='text'>
                <h4>Call Us</h4>
                <Link to='/contact'>+234 80378 654</Link>
              </div>
            </div>
            <div className='box flex_space'>
              <div className='icons'>
                <i className='far fa-envelope'></i>
              </div>
              <div className='text'>
                <h4>Mail Us</h4>
                <Link to='/contact'>info@express.com</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar
