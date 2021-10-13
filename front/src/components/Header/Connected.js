import React, { useState } from 'react'
import Link from "../Link"

const Connected = ({ disconnectUser }) => {
  return (
    <div className="ui grid menu" style={{backgroundColor: 'rgb(9, 32,67)', color: 'white'}}>
      <Link href="/" className="item">
        <img style={{width: '15em'}} className="ui center" alt="logo" src="./Groupomania_Logos/icon-left-font-monochrome-white.svg"/>
      </Link>
      <Link className="item" href="/">
        <i className="home icon"></i> Home
      </Link>
      <Link className="item" href="/profile">
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
