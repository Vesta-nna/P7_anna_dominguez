import { formatErrorMessage } from "../../../tools"

const inputError = (email, password) => {
  if (!password.length || !email.length) {
    formatErrorMessage({
      inputName: 'loginFormError',
      header: 'Des champs obligatoires sont vide!',
      message: 'Tous ces champs sont obligatoires pour se connecter'
    })
    if (!password.length) {
      formatErrorMessage({
        inputName: 'passwordError',
        header: 'Champ vide',
        message: 'Ce champ est obligatoire, veuillez renseigner votre mot de passe'
      })
    }
    if (!email.length) {
      formatErrorMessage({
        inputName: 'emailError',
        header: 'Champ vide',
        message: 'Ce champ est obligatoire, veuillez renseigner votre email'
      })
    }
    return 1
  }
}

export default inputError
