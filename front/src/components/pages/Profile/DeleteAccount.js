import React from 'react'
import axios from 'axios'
import authHeader from '../../auth-header'

const DeleteAccount = ({ userId }) => {
  const onClick = (e) => {
    e.preventDefault()

    axios.delete(`http://localhost:8080/api/profile/${userId}`, { headers: authHeader() })
      .then(res => {
        console.log("success", res)
      }).catch(err => {
        console.log("ERROR", err)
      })
      localStorage.clear()
      window.location = 'http://localhost:3000/'

  }

  return (
    <div className="ui container">
      <div className="ui attached message">
        <div className="header">
          <h2>Supprimer mon compte</h2>
        </div>
        <p>Nous sommes tristes de vous voir partir...</p>
        <p>Si vous êtes sûr de vouloir supprimer toutes les informations et posts que vous avez pu partager avec nous, cliquez sur le bouton ci-dessous:</p>
      </div>
      <form className="ui form attached fluid segment">
        <button onClick={onClick} className="negative ui button">Supprimer mon compte</button>
      </form>
    </div>
  )
}

export default DeleteAccount
