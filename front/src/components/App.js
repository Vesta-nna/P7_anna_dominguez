import React, { useEffect, useState } from 'react'

import Header from './Header'
import Footer from './Footer'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Presentation from './pages/Presentation'
import PageNotFound from './pages/PageNotFound'
import Route from './Route'

import './App.css'

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const disconnectUser = () => {
    setUser(null)
    localStorage.clear()
  }

  const logUser = (logedUser) => {
    setUser(logedUser)
    localStorage.setItem('user', JSON.stringify(logedUser))
  }

  return (
    <div id="page">
      <Header style={{marginBottom: '3em'}} user={user} disconnectUser={disconnectUser} />
      <Route path="/">
        {user ? <Home userId={user.id}/> : <Presentation />}
      </Route>
      <Route path="/profile">
        {user ? <Profile userId={user.id}/> : <PageNotFound />}
      </Route>
      <Route path="/login">
        { user ? <PageNotFound /> : <Login logUser={logUser} /> }
      </Route>
      <Route path="/register">
        { user ? <PageNotFound /> : <Register /> }
      </Route>
      <Footer />
    </div>
  )
}

export default App
