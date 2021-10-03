import React, { useEffect, useState } from 'react'

import Header from './Header'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Presentation from './pages/Presentation'
import PageNotFound from './pages/PageNotFound'
import Route from './Route'

import './App.css'

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user'))

  const disconnectUser = () => {
    setUser(null)
    localStorage.clear()
  }

  const logUser = (user) => {
    console.log(user)
    setUser(user)
    localStorage.setItem('user', user)
  }

  return (
    <div id="page">
      <Header style={{marginBottom: '3em'}} user={user} disconnectUser={disconnectUser} />
      <Route path="/">
        {user ? <Home /> : <Presentation />}
      </Route>
      <Route path="/profile">
        {user ? <Profile userId={user[0]}/> : <PageNotFound />}
      </Route>
      <Route path="/login">
        { user ? <PageNotFound /> : <Login logUser={logUser} /> }
      </Route>
      <Route path="/register">
        { user ? <PageNotFound /> : <Register /> }
      </Route>
      <div className="ui inverted vertical footer segment">
        <div className="ui container">
          Groupomania {new Date().getFullYear()}. All Rights Reserved
        </div>
      </div>
    </div>
  )
}

export default App
