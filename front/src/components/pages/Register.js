import React, { useState } from 'react'
import inputError from './Register/RegisterErrors'
import { formatErrorMessage, formatSuccessMessage, resetInputs, validateEmail, validatePassword } from '../../tools'
import axios from 'axios'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit =  event => {
    event.preventDefault()
    resetInputs(['registerFormError', 'registerFormSuccess', 'firstNameError', 'lastNameError', 'passwordError', 'emailError'])
    if (inputError(firstName, lastName, password, email)){
      return
    }

    axios.post('http://localhost:8080/api/auth/signup',
      {
        firstName,
        lastName,
        email,
        password
      }).then(res => {
        formatSuccessMessage({
          inputName: 'registerFormSuccess',
          header: 'Votre compte a été créé !',
          message: 'Vous pouvez maintenant vous connecter sur votre compte'
        })
      }).catch(err => {
        console.log("error=", err)
        formatErrorMessage({
          inputName: 'registerFormError',
          header: 'Erreur',
          message: 'Cet email est déjà utilisé'
        })
      })
  }

  return (
    <div className="ui container">
      <div className="ui attached message">
        <div className="header">
          <h2>S'enregister</h2>
        </div>
        <p>Veuillez remplir le formulaire ci-dessous pour vous créer votre compte</p>
      </div>
      <form className="ui form attached fluid segment">
        <div className="two fields">
          <div className="field">
            <label>Prénom</label>
            <input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Prénom" type="text" />
            <div id="firstNameError"></div>
          </div>
          <div className="field">
            <label>Nom</label>
            <input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Nom" type="text" />
            <div id="lastNameError"></div>
          </div>
        </div>
        <div className="field">
          <label>Email</label>
          <input value={email}
            onChange={(event) => {
              const { value } = event.target
              validateEmail(value)
              setEmail(value)
            }}
            placeholder="Email"
            type="email" />
          <div id="emailError"></div>
        </div>
        <div className="field">
          <label>Mot de passe</label>
          <input value={password}
            onChange={(event) => {
              const { value } = event.target
              validatePassword(value)
              setPassword(value)
            }}
            placeholder="Mot de passe"
            type="password" />
          <div id="passwordError"></div>
        </div>
        <div id="registerFormError"></div>
        <div id="registerFormSuccess"></div>
        <div onClick={onSubmit} className="ui teal submit button">Submit</div>
      </form>
    </div>
  )
}

export default Register
