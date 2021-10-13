import React, { useState } from 'react'
import { formatErrorMessage, formatSuccessMessage, resetInputs } from '../../../tools'
import authHeader from '../../auth-header'
import axios from 'axios'

const inputError = (content) => {
  if (!content.length) {
    formatErrorMessage({
      inputName: 'contentError',
      header: 'Champ vide',
      message: 'Ce champ est obligatoire'
    })
    return 1
  }
}

const CreatePost = ({ changePosts, userId }) => {
  const [content, setContent] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    resetInputs(['contentError', 'postFormError'])
    if (inputError( content)) {
      return
    }
    await axios.post(`http://localhost:8080/api/feed`, { content, userId }, { headers: authHeader() })
    formatSuccessMessage({
      inputName: 'postFormSuccess',
      header: 'Bravo!',
      message: 'Votre post a bien été enregistré et devrais maintenant apparaitre!'
    })
    setContent('')
    const postRes = await axios.get(`http://localhost:8080/api/feed/all`, { headers: authHeader() })
    changePosts(postRes.data.posts)
  }

  return (
    <div className="ui container">
      <div className="ui attached message">
        <div className="header">
          <h2>Créer un post</h2>
        </div>
        <p>Veuillez remplir le formulaire ci-dessous pour créer un nouveaux post</p>
      </div>
      <form className="ui form attached fluid segment">
        <div className="field">
          <label>Mon post</label>
          <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Corps de la publication" type="text"></textarea>
          <div id="contentError"></div>
        </div>
        <div id="postFormError"></div>
        <div id="postFormSuccess"></div>
        <div onClick={onSubmit} className="ui teal submit button">Envoyer</div>
      </form>
    </div>
  )
}

export default CreatePost
