const fillers = require('../fillers.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const signInSubmit = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  data = JSON.stringify(data)
  api.signInUser(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignFailure)
}

const signUpSubmit = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  store.autoSignIn = data.credentials.password
  data = JSON.stringify(data)
  api.signUpUser(data)
    .then(ui.onSignUpSuccess)
    .then(api.signInUser)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignFailure)
}

const changePassSubmit = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  data = JSON.stringify(data)
  api.changePassUser(data)
    .then(ui.changePassSuccess)
    .catch(ui.changePassFailure)
}

const addUserEventListeners = function () {
  $('#sign-in-button').on('click', fillers.showSignInForm)
  $('#sign-up-button').on('click', fillers.showSignUpForm)
  $('#sign-forms').on('submit', '#sign-in-form', signInSubmit)
  $('#sign-forms').on('submit', '#sign-up-form', signUpSubmit)
  $('#instructions-link').on('click', fillers.showInstructions)
  $('#change-password-link').on('click', fillers.showChangePass)
  $('#change-password-form').on('submit', changePassSubmit)
}

module.exports = {
  addUserEventListeners
}
