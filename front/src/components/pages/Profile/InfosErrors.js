import { formatErrorMessage } from "../../../tools"

const inputError = (firstName, lastName) => {
  if (!firstName.length || !lastName.length) {
    formatErrorMessage({
      inputName: 'infosFormError',
      header: 'Des champs obligatoires sont vide!',
      message: 'Les champs prénom et nom doivent obligatoirement être remplis pour pouvoir modifier ses infos'
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
    return 1
  }
}

export default inputError
