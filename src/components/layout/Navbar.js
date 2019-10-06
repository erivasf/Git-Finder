import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({title}) => {
  return (
    <div>
      <nav className = "navbar bg-primary">
      <h1>
        <i className="fab fa-github"/> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      </nav>
    </div>
  )
}

export default Navbar
