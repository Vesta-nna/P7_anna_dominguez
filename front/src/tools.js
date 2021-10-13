export const checkEqual = (val1, val2) => val1 === val2

export const resetInputs = (inputsArray) => {
  inputsArray.forEach(elem => {
    document.getElementById(elem).innerHTML = ''
  })
}

export const formatErrorMessage = ({ inputName, header, message }) => {
  document.getElementById(inputName).innerHTML = `<div class="ui negative message">
      <i onclick="deleteMessage('${inputName}')" class="close icon"></i>
      <div class="header">${header || ''}</div>
      <p>${message || '' }</p>
    </div>`
}

export const formatSuccessMessage = ({ inputName, header, message }) => {
  document.getElementById(inputName).innerHTML = `<div class="ui positive message">
      <i onclick="deleteMessage('${inputName}')" class="close icon"></i>
      <div class="header">${header || ''}</div>
      <p>${message || '' }</p>
    </div>`
}

export const validateEmail = (email) => {
    const re = /\S+@\S+\.[\S+]{2,5}/
    if (re.test(email)) {
      formatSuccessMessage({
        inputName: 'emailError',
        header: 'Super!',
        message: 'Email valide!'
      })
      return true
    } else {
      formatErrorMessage({
        inputName: 'emailError',
        header: 'Erreur',
        message: 'Cet email n\'est pas valide'
      })
      return false
    }
}

export const validatePassword = (password) => {
  if (password.length < 8) {
    formatErrorMessage({
      inputName: 'passwordError',
      header: 'Erreur',
      message: 'Un mot de passe doit faire 8 caractères minimum'
    })
    return false
  } else {
    formatSuccessMessage({
      inputName: 'passwordError',
      header: 'Super!',
      message: 'Mot de passe valide!'
    })
    return true
  }
}
