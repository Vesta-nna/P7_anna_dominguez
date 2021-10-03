import React from 'react'

const PageNotFound = () => {
  return (
    <div className="ui container">
      <div className="ui fluid card">
        <div className="content">
          <div className="header"><h2>Oups!!!</h2></div>
          <div className="description">
            <p>Cette page n'existe pas ou vous n'y avez pas accès, vous avez dû vous tromper.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
