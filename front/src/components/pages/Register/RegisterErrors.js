import { formatErrorMessage, validateEmail, validatePassword } from "../../../tools"

const inputError = (firstName, lastName, password, email) => {
  if (!firstName.length || !lastName.length || !password.length || !email.length) {
    formatErrorMessage({
      inputName: 'registerFormError',
      header: 'Des champs obligatoires sont vide!',
      message: 'Tous ces champs sont obligatoires pour créer son compte'
    })
    if (!firstName.length) {
      formatErrorMessage({
        inputName: 'firstNameError',
        header: 'Champ vide',
        message: 'Ce champ est obligatoire, veuillez renseigner un prénom'
      })
    }
    if (!lastName.length) {
      formatErrorMessage({
        inputName: 'lastNameError',
        header: 'Champ vide',
        message: 'Ce champ est obligatoire, veuillez renseigner un nom'
      })
    }
    if (!email.length) {
      formatErrorMessage({
        inputName: 'emailError',
        header: 'Champ vide',
        message: 'Ce champ est obligatoire, veuillez renseigner votre email'
      })
    }
    if (!password.length) {
      formatErrorMessage({
        inputName: 'passwordError',
        header: 'Champ vide',
        message: 'Ce champ est obligatoire, veuillez renseigner un mot de passe valide'
      })
    }
    validateEmail(email)
    validatePassword(password)
    return 1
  }
}

export default inputError
