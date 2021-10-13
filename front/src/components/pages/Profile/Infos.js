import React, { useEffect, useState } from 'react'
import authHeader from '../../auth-header'
import { formatErrorMessage, formatSuccessMessage, resetInputs } from '../../../tools'
import inputError from './InfosErrors'
import axios from 'axios'



const Infos = ({ userId, firstName, setFirstName, lastName, setLastName, bio, setBio }) => {
  const handleSubmit = (e) => {
    e.preventDefault()

    resetInputs(['infosFormSuccess', 'infosFormError', 'firstNameError', 'lastNameError', 'bioError'])
    if (inputError(firstName, lastName)) {
      return
    }
    axios.post(`http://localhost:8080/api/profile/infos/${userId}`, { firstName, lastName, bio }, { headers: authHeader() })
      .then(res => {
        formatSuccessMessage({
          inputName: 'infosFormSuccess',
          header: 'Bravo!',
          message: 'Merci d\'avoir mis à jour vos informations!'
        })
      }).catch(err => {
        formatErrorMessage({
          inputName: 'infosFormError',
          header: 'Erreur',
          message: 'Une erreur s\'est produite, veuillez réessayer'
        })
      })
  }

  return (
    <div className="ui container">
      <div className="ui attached message">
        <div className="header">
          <h2>Profile</h2>
        </div>
        <p>Voici votre page de profile! Vous pouvez modifier vos informations dans les champs ci-dessous:</p>
      </div>
      <form className="ui form attached fluid segment">
        <div className="two fields">
          <div className="field">
            <label>Prénom</label>
            <input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Prénom" type="text" required />
            <div id="firstNameError"></div>
          </div>
          <div className="field">
            <label>Nom</label>
            <input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Nom" type="text" required />
            <div id="lastNameError"></div>
          </div>
        </div>
        <div className="field">
          <label>Bio</label>
          <input value={bio} onChange={(event) => setBio(event.target.value)} placeholder="Bio" type="text" />
          <div id="bioError"></div>
        </div>
        <div id="infosFormError"></div>
        <div id="infosFormSuccess"></div>
        <button onClick={handleSubmit} className="ui teal button">Changer mes infos</button>
      </form>
    </div>
  )
}

export default Infos
