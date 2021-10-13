import React from 'react'

const Post = ({ handlePostDelete, id, bio, content, dateFromNow, avatarUrl, authorId, fullName }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className="ui container">
      <div className="ui fluid card">
        <div className="content">
          <div className="header">
            {authorId === user.id || user.role === 'ADMIN' 
              ? <p className="right floated">
                  <button onClick={(e) => handlePostDelete(e, id)} className="ui red button">
                    <i className="trash alternate icon"></i>Supprimer
                  </button>
                </p>
              : '' }
          </div>
          <div className="description">
            {content}<br/><br/>
          </div>
        </div>
        <div className="extra content">
          <div className="left floated date">
            {avatarUrl ? <img className="ui avatar image" src="./Groupomania_Logos/icon.svg" alt="icone"/> : <i className="user circle icon"></i>}{fullName}
          </div>
          <div className="right floated author">
            {dateFromNow}
          </div><br/>
          <div><i>{bio ? `« ${bio} »` : ''}</i></div>
        </div>
      </div>
    </div>
  )
}

export default Post
