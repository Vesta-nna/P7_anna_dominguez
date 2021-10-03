import React, { useState } from 'react'
import axios from 'axios'

const resetErrorMessages = () => {
  document.getElementById('globalError').innerHTML = ''
  document.getElementById('passwordError').innerHTML = ''
  document.getElementById('emailError').innerHTML = ''
}

const formatInputEmptyError = (inputName) => `<div class="ui negative message">
        <div class="header">Champ vide</div>
        <p>Veuillez renseigner ${inputName} que vous avez utiliser lors de votre inscription</p>
      </div>`

const checkError = (email, password) => {
  if (email.length === 0 || password.length === 0){
    if (email.length === 0) {
      document.getElementById('emailError').innerHTML = formatInputEmptyError('l\'email')
    }
    if (password.length === 0) {
      document.getElementById('passwordError').innerHTML = formatInputEmptyError('le mot de passe')
    }
    document.getElementById('globalError').innerHTML = `<div class="ui negative message">
      <div class="header">Tous les champs doivent être remplis pour pouvoir se connecter</div>
    </div>`
    return 1
  }
}

const handleError = (errorStatus) => {
  if (errorStatus === 404) {
    document.getElementById('globalError').innerHTML = `<div class="ui negative message"><div class="header">Cet email n'a pas été trouvé, veuillez réessayer!</div></div>`
  } else if (errorStatus === 401) {
    document.getElementById('globalError').innerHTML = `<div class="ui negative message"><div class="header">Le mot de passe erroné, veuillez réessayer!</div></div>`
  }
}

const Login = ({ logUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    resetErrorMessages()
    if (checkError(email, password)) {
      return
    }
    axios.post('http://localhost:8080/api/auth/login',
      {
        email, password
      })
      .then(res => {
        console.log(res)
        logUser([res.data.id, res.data.accessToken])
        window.location = 'http://localhost:3000/'
      }).catch(err => {
        handleError(err.response.status)
      })
  }

  return (
    <div className="ui container">
      <div className="ui attached message">
        <div className="header">
         <h2>Connexion</h2>
        </div>
        <p>Veuillez remplir le formulaire ci-dessous pour vous connecter</p>
      </div>
      <form className="ui form attached fluid segment">
        <div className="field">
          <label>Email</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" type="email" />
          <div id="emailError">
          </div>
        </div>
        <div className="field">
          <label>Mot de passe</label>
          <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mot de passe" type="password" />
          <div id="passwordError">
          </div>
        </div>
        <div id="globalError">
        </div>
        <div onClick={onSubmit} className="ui blue submit button">Submit</div>
      </form>
    </div>
  )
}

export default Login
