import React from 'react'

const Footer = () => {
  return (
    <div className="ui vertical footer segment" style={{backgroundColor: 'rgb(209, 81, 90)', color: 'white'}}>
      <div className="ui container">
        <h2>Groupomania {new Date().getFullYear()}. All Rights Reserved</h2>
      </div>
      <div className="ui container">
        <button className="ui circular facebook icon button">
          <i className="facebook icon"></i>
        </button>
        <button className="ui circular twitter icon button">
          <i className="twitter icon"></i>
        </button>
        <button className="ui circular linkedin icon button">
          <i className="linkedin icon"></i>
        </button>
      </div>
    </div>
  )
}

export default Footer
