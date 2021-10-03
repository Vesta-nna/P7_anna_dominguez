import React, { useEffect, useState } from 'react'
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

const Profile = ({ userId }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    (async() => {
      const res = await axios.get(`http://localhost:8080/api/profile/${userId}`)
      const { firstName, lastName, bio, user } = res.data.userProfile
      setFirstName(firstName)
      setLastName(lastName)
      setBio(bio || '')
      setEmail(user.email)
    })()
  }, [])

  return (
    <div className="ui container">
      <div className="ui attached message">
        <div className="header">
          <h2>Profile</h2>
        </div>
        <p>Voici votre page de profile! Vous pouvez modifier vos informations dans les champs ci-dessous</p>
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
          <label>Bio</label>
          <input value={bio} onChange={(event) => setBio(event.target.value)} placeholder="Bio" type="text" />
          <div id="bioError"></div>
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
      </form>
    </div>
  )
}

export default Profile
