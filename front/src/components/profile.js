import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"

class Profile extends Component {

  render() {
    const { user: currentUser } = this.props

    if (!currentUser) {
      return <Redirect to="/login" />
    }
    console.log(currentUser)

    return (
       <div className="card card-container bg-dark text-white">
        <header className="jumbotron">
          <h3>
            <strong>Profile</strong>
          </h3>
        </header>
          <h4>Bonjour {currentUser.firstName} {currentUser.lastName}!</h4>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Role:</strong> {currentUser.role}
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth
  return {
    user,
  }
}

export default connect(mapStateToProps)(Profile)