import React, { Component } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import { isEmail } from "validator"

import { connect } from "react-redux"
import { register } from "../actions/auth"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    )
  }
}

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}

class Register extends Component {
  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      email: "",
      password: "",
      successful: false,
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  handleRegister(e) {
    e.preventDefault()

    this.setState({
      successful: false,
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.email, this.state.password)
        )
        .then(() => {
          this.setState({
            successful: true,
          })
        })
        .catch(() => {
          this.setState({
            successful: false,
          })
        })
    }
  }

  render() {
    const { message } = this.props

    return (
      <div className="col-md-12">
        <div className="card card-container bg-dark text-white">
          <h3>Créer un compte</h3>
          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label className="visually-hidden" htmlFor="inlineFormInputEmail">Email</label>
                  <Input
                    type="email"
                    className="form-control text-white border-secondary"
                    style={{backgroundColor:'#343a40'}}
                    name="email"
                    id="inlineFormInputGroupUsername"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label className="visually-hidden" htmlFor="inlineFormInputPassword">Mot de passe</label>
                  <Input
                    type="password"
                    className="form-control text-white border-secondary"
                    style={{backgroundColor:'#343a40'}}
                    name="password"
                    id="inlineFormInputGroupPassword"
                    placeholder="Mot de passe"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-secondary btn-block">S'enregistrer</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c
              }}
            />
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { message } = state.message
  return {
    message,
  }
}

export default connect(mapStateToProps)(Register)