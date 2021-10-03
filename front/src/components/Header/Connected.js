import React, { useState } from 'react'
import Link from "../Link"

const Connected = ({ disconnectUser }) => {
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
        <Link
          className={`item ${isActive('home')}`}
          onClick={(e) => handleItemClick(e, 'home')}
          href="/"
        >
          <i className="home icon"></i> Home
        </Link>
        <Link
           className={`item ${isActive('profile')}`}
          onClick={(e) => handleItemClick(e, 'profile')}
          href="/profile"
        >
          <i className="user icon"></i> Profile
        </Link>

      <div className="right menu">
        <div onClick={() => disconnectUser()} className="item">
          <a href="/" className="ui inverted button">
            <i className="power icon"></i> Se déconnecter
          </a>
        </div>
      </div>
    </div>
  )
}

export default Connected
