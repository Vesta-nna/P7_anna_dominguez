import React, { useState } from 'react'
import Link from "../Link"

const NotConnected = () => {
return (
    <div className="ui grid menu" style={{backgroundColor: 'rgb(9, 32,67)', color: 'white'}}>
      <Link href="/" className="item">
        <img style={{width: '15em'}} className="ui center" alt="logo" src="./Groupomania_Logos/icon-left-font-monochrome-white.svg"/>
      </Link>
      <Link href="/" className="item">
        <i className="home icon"></i> Home
      </Link>

      <div className="right menu">
        <div className="item">
          <Link href="/login" className="ui inverted button">
            <i className="user outline icon"></i>Se connecter
          </Link>
        </div>
          <div className="item">
          <Link href="/register" className="ui inverted button">
            <i className="user plus icon"></i>S'enregister
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotConnected
