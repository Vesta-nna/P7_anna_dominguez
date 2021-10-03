import React from 'react'

const Presentation = () => {
  return (
    <div className="ui container">
      <div className="ui fluid card">
        <div className="content">
          <div className="header"><h2>Bienvenue sur le réseau social interne de Groupomania</h2></div>
          <div className="description">
            <p>Groupomania vous propose d'échanger avec vos collègues!</p>
            <p>Pour vous enregister il vous suffit de renseigner votre nom et prénom, votre adresse mail ainsi qu'un mot de passe personnel.</p>
            <p>Vous pouvez modifier à tout moment les informations de votre profil une fois connecté à partir de l'onglet correspondant.</p>
            <p>Une fois connecté vous pourrez également retrouver les derniers posts de vos collègues, ainsi qu'écrire le votre.</p>
          </div>
        </div>
        <div className="extra content">
          <div className="right floated author">
            <img className="ui avatar image" src="./Groupomania_Logos/icon.svg" alt="icone"/> Groupomania
          </div>
        </div>
      </div>
    </div>
  )
}

export default Presentation
