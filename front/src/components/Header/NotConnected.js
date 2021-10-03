import React, { useState } from 'react'
import Link from "../Link"

const NotConnected = () => {
  const [activeItem, setActiveItem] = useState('home')

  const handleItemClick = (e, name) => {
    e.preventDefault()
    setActiveItem(name)
  }

  const isActive = (tableName) => activeItem === tableName ? 'active' : ''

  return (
    <div className="ui grid inverted menu">
      <div className="item">
        <img style={{width: '15em'}} className="ui center" alt="logo" src="./Groupomania_Logos/icon-left-font-monochrome-white.svg"/>
      </div>
        <Link href="/"
          className={`item ${isActive('home')}`}
          onClick={(e) => handleItemClick(e, 'home')}
        >
          <i className="home icon"></i> Home
        </Link>

      <div className="right menu">
        <div
          className="item"
          onClick={(e) => handleItemClick(e, 'login')}
        >
          <Link
            href="/login"
            className={`ui inverted ${isActive('login')} button`}
          >
            <i className="user outline icon"></i>Se connecter
          </Link>
        </div>
          <div
          className="item"
          onClick={(e) => handleItemClick(e, 'register')}
        >
          <Link
            href="/register"
            className={`ui inverted ${isActive('register')} button`}
          >
            <i className="user plus icon"></i>S'enregister
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotConnected
