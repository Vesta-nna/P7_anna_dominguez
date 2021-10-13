import { checkEqual, formatErrorMessage, validateEmail } from "../../../tools"

const inputError = (email, verifEmail) => {
  if (!email.length || !verifEmail.length) {
    formatErrorMessage({
      inputName: 'emailFormError',
      header: 'Emails vides',
      message: 'Les deux champs doivent être remplis avec la même valeur pour pouvoir modifier votre email'
    })
    if (!email.length) {
      formatErrorMessage({
        inputName: 'emailError',
        header: 'Champ vide',
        message: 'Ce champ est obligatoire'
      })
    }
    if (!verifEmail.length) {
      formatErrorMessage({
        inputName: 'verifEmailError',
        header: 'Champ vide',
        message: 'Ce champ est obligatoire'
      })
    }
    return 1
  }
  if (!checkEqual(email, verifEmail) || !/\S+@\S+\.[\S+]{2,5}/.test(email)) {
    formatErrorMessage({
      inputName: 'emailFormError',
      header: 'Email non égaux',
      message: 'Les email doivent être valides et contenir les mêmes valeurs pour pouvoir modifier votre email'
    })
    validateEmail(email)
    return 1
  }

}

export default inputError
