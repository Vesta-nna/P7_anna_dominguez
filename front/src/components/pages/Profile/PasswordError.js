import { checkEqual, formatErrorMessage, validatePassword } from "../../../tools"

const inputError = (password, verifPassword) => {
  if (!password.length || !verifPassword.length) {
    formatErrorMessage({
      inputName: 'passwordFormError',
      header: 'Mots de passe vides',
      message: 'Les deux champs doivent être remplis avec la même valeur pour pouvoir modifier votre mot de passe'
    })
    if (!password.length) {
      formatErrorMessage({
        inputName: 'passwordError',
        header: 'Champ vide',
        message: 'Ce champ est obligatoire'
      })
    }
    if (!verifPassword.length) {
      formatErrorMessage({
        inputName: 'verifPasswordError',
        header: 'Champ vide',
        message: 'Ce champ est obligatoire'
      })
    }
    return 1
  }
  if (password.length < 8 || !checkEqual(password, verifPassword)) {
    formatErrorMessage({
      inputName: 'passwordFormError',
      header: 'Erreur',
      message: 'Les mots de passe doivent être valides et contenir les mêmes valeurs pour pouvoir modifier votre mot de passe'
    })
    validatePassword(password)
    return 1
  }
}

export default inputError
