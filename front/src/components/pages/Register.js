import React, { useState } from 'react'
import axios from 'axios'

const resetErrorMessages = () => {
  document.getElementById('globalError').innerHTML = ''
  document.getElementById('firstNameError').innerHTML = ''
  document.getElementById('lastNameError').innerHTML = ''
  document.getElementById('passwordError').innerHTML = ''
  document.getElementById('emailError').innerHTML = ''
}

const formatInputEmptyError = (errorMessage) => `<div class="ui negative message">
        <div class="header">Champ vide</div>
        <p>Veuillez renseigner ${errorMessage}</p>
      </div>`

const checkError = (firstName, lastName, email, password) => {
  if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0) {
    if (firstName.length === 0) {
      document.getElementById('firstNameError').innerHTML = formatInputEmptyError('votre prénom')
    }
    if (lastName.length === 0) {
      document.getElementById('lastNameError').innerHTML = formatInputEmptyError('votre nom')
    }
    if (email.length === 0) {
      document.getElementById('emailError').innerHTML = formatInputEmptyError('votre email')
    }
    if (password.length === 0) {
      document.getElementById('passwordError').innerHTML = formatInputEmptyError('votre mot de passe')
    }
    document.getElementById('globalError').innerHTML = `<div class="ui negative message"><div class="header">Tous les champs doivent être remplis pour pouvoir créer son compte</div></div>`
    return 1
  }
}

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit =  event => {
    event.preventDefault()
    resetErrorMessages()
    if (checkError(firstName, lastName, email, password)){
      return
    }
    axios.post('http://localhost:8080/api/auth/signup',
      {
        firstName,
        lastName,
        email,
        password
      }).then(res => {
        document.getElementById('successMessage').innerHTML = `
        <div class="ui success message">
          <i class="close icon"></i>
          <div class="header">
            Votre compte a été créé !
          </div>
          <p>Vous pouvez maintenant vous connecter sur votre compte</p>
        </div>
        `
        // window.location = 'http://localhost:3000/'
      }).catch(err => {
        console.log("error=", err)
        document.getElementById('passwordError').innerHTML = `<div class="ui negative message">
          <div class="header">Erreur</div>
          <p>Cet email est déjà utilisé</p>
        </div>`
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
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" type="email" />
          <div id="emailError"></div>
        </div>
        <div className="field">
          <label>Mot de passe</label>
          <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mot de passe" type="password" />
          <div id="passwordError"></div>
        </div>
        <div id="globalError"></div>
        <div id="successMessage"></div>
        <div onClick={onSubmit} className="ui blue submit button">Submit</div>
      </form>
    </div>
  )
}

export default Register
