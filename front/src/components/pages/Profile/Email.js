import React, { useState } from 'react'
import { formatErrorMessage, formatSuccessMessage, resetInputs, validateEmail } from '../../../tools'
import authHeader from '../../auth-header'
import axios from 'axios'
import inputError from './EmailErrors'

const Email = ({ userId, email, setEmail }) => {
  const [verifEmail, setVerifEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    resetInputs(['emailFormSuccess', 'emailFormError', 'emailError', 'verifEmailError'])
    if (inputError(email, verifEmail)) {
      return
    }
    axios.post(`http://localhost:8080/api/profile/email/${userId}`, { email }, { headers: authHeader() })
      .then(res => {
        console.log("success", res)
        formatSuccessMessage({
          inputName: 'emailFormSuccess',
          header: 'Bravo!',
          message: 'Merci d\'avoir mis à jour votre email!'
        })
      }).catch(err => {
        console.log("ERROR", err)
        formatErrorMessage({
          inputName: 'emailFormError',
          header: 'Erreur',
          message: 'Une erreur s\'est produite, veuillez réessayer'
        })
      })
  }

  return (
    <div className="ui container">
      <div className="ui attached message">
        <div className="header">
          <h2>Email</h2>
        </div>
        <p>Vous voulez changer d'email de contact ? Veuillez renseigner votre nouvel email ici:</p>
      </div>
      <form className="ui form attached fluid segment">
        <div className="field">
          <label>Email</label>
          <input
            value={email}
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
          <label>Vérification de l'email</label>
          <input value={verifEmail} onChange={(event) => setVerifEmail(event.target.value)} placeholder="Réécrivez votre email" type="email" />
          <div id="verifEmailError"></div>
        </div>
        <div id="emailFormError"></div>
        <div id="emailFormSuccess"></div>
        <button onClick={handleSubmit} className="ui teal button">Changer mon Email</button>
      </form>
    </div>
  )
}

export default Email
