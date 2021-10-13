import React, { useState } from 'react'
import { resetInputs, formatErrorMessage, formatSuccessMessage, validatePassword } from '../../../tools'
import inputError from './PasswordError'
import axios from 'axios'
import authHeader from '../../auth-header'

const Password = ({ userId }) => {
  const [password, setPassword] = useState('')
  const [verifPassword, setVerifPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    resetInputs(['passwordFormSuccess', 'passwordFormError', 'passwordError', 'verifPasswordError'])
    if (inputError(password, verifPassword)) {
      return
    }
    axios.post(`http://localhost:8080/api/profile/pwd/${userId}`, { password }, { headers: authHeader() })
      .then(res => {
        console.log("success", res)
        formatSuccessMessage({
          inputName: 'passwordFormSuccess',
          header: 'Bravo!',
          message: 'Merci d\'avoir mis à jour votre mot de passe!'
        })
      }).catch(err => {
        console.log("ERROR", err)
        formatErrorMessage({
          inputName: 'passwordFormError',
          header: 'Erreur',
          message: 'Une erreur s\'est produite, veuillez réessayer'
        })
      })
  }

  return (
    <div className="ui container">
      <div className="ui attached message">
        <div className="header">
          <h2>Mot de passe</h2>
        </div>
        <p>Vous voulez changer de mot de passe ? Veuillez renseigner votre nouveau mot de passe ici:</p>
      </div>
      <form className="ui form attached fluid segment">
        <div className="field">
          <label>Mot de passe</label>
          <input
            value={password}
            onChange={(event) => {
              const { value } = event.target
              validatePassword(value)
              setPassword(value)
            }}
            placeholder="Mot de passe"
            type="password" />
          <div id="passwordError"></div>
        </div>
        <div className="field">
          <label>Vérification du mot de passe</label>
          <input value={verifPassword} onChange={(event) => setVerifPassword(event.target.value)} placeholder="Réécrivez votre mot de passe" type="password" />
          <div id="verifPasswordError"></div>
        </div>
        <div id="passwordFormError"></div>
        <div id="passwordFormSuccess"></div>
        <button onClick={handleSubmit} className="ui teal button">Changer mon mot de passe</button>
      </form>
    </div>
  )
}

export default Password
