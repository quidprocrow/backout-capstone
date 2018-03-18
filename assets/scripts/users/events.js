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

const signOutClick = function () {
  api.signOutUser()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const addUserEventListeners = function () {
  $('#content').on('click', '#sign-in-button', fillers.showSignInForm)
  $('#content').on('click', '#sign-up-button', fillers.showSignUpForm)
  $('#content').on('submit', '#sign-in-form', signInSubmit)
  $('#content').on('submit', '#sign-up-form', signUpSubmit)
  $('#content').on('click', '#instructions-link', fillers.showInstructions)
  $('#content').on('click', '#change-password-link', fillers.showChangePass)
  $('#content').on('submit', '#change-password-form', changePassSubmit)
  $('#content').on('click', '#sign-out-link', signOutClick)
}

module.exports = {
  addUserEventListeners
}
