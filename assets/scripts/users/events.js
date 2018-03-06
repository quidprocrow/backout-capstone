const fillers = require('../fillers.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const signInSubmit = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signInUser(data)
    .then(console.log('yay'))
    .catch(console.log('nay'))
}

const addUserEventListeners = function () {
  $('#sign-in-button').on('click', fillers.showSignInForm)
  $('#sign-up-button').on('click', fillers.showSignUpForm)
  $('#sign-forms').on('submit', '#sign-in-form', signInSubmit)
  $('#navigation').hide()
}

module.exports = {
  addUserEventListeners
}
