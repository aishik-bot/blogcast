import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <header>
            <div className='header-brand'>
                <div className='nav-search'>Search</div>
                <div className='logo'>
                  <NavLink className='nav-link-logo' to="/">
                    <h1>BlogCast</h1>
                  </NavLink>
                </div>
                <div className='login-button'>
                  <button>Login</button>
                </div>
            </div>
            <nav className='nav-bar'>
                <NavLink className='nav-link' to="/travel">Travel</NavLink>
                <NavLink className='nav-link' to="/business">Business</NavLink>
                <NavLink className='nav-link' to="/sports">Sports</NavLink>
                <NavLink className='nav-link' to="/entertainment">Entertainment</NavLink>
                <NavLink className='nav-link' to="/my-blogs">My Blogs</NavLink>
            </nav>
        </header>
    </>
  )
}

export default Navbar