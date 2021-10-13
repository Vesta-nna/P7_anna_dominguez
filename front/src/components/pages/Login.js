import React, { useState } from 'react'
import inputError from './Login/LoginErrors'
import axios from 'axios'
import { resetInputs, formatErrorMessage } from '../../tools'


const Login = ({ logUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    resetInputs(['emailError', 'passwordError', 'loginFormError'])
    if (inputError(email, password)) {
      return
    }
    axios.post('http://localhost:8080/api/auth/login',
      {
        email, password
      })
      .then(res => {
        logUser({id: res.data.id, role: res.data.role, accessToken: res.data.accessToken})
        window.location = 'http://localhost:3000/'
      }).catch(err => {
        if (err && err.response) {
          const {status} = err.response
          if (status === 404) {
            formatErrorMessage({
              inputName: 'loginFormError',
              header: "Cet email n'a pas été trouvé, veuillez réessayer!"
            })
          } else if (status === 401) {
            formatErrorMessage({
              inputName: 'loginFormError',
              header: "Le mot de passe erroné, veuillez réessayer!"
            })
          }
        }
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
          <div id="emailError"></div>
        </div>
        <div className="field">
          <label>Mot de passe</label>
          <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mot de passe" type="password" />
          <div id="passwordError"></div>
        </div>
        <div id="loginFormError"></div>
        <div onClick={onSubmit} className="ui teal submit button">Submit</div>
      </form>
    </div>
  )
}

export default Login
