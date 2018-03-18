const fillers = require('../fillers.js')
const store = require('../store.js')
const errorTemplate = require('../templates/error.handlebars')
const successTemplate = require('../templates/success.handlebars')

const onSignInSuccess = function (data) {
  delete store.autoSignIn
  store.user = data.user
  fillers.showInstructions()
}

const onSignUpSuccess = function (data) {
  let dataPass = {
    credentials: {
      email: data.user.email,
      password: store.autoSignIn
    }
  }
  dataPass = JSON.stringify(dataPass)
  return dataPass
}

const onSignFailure = function (data) {
  const errorHtml = errorTemplate()
  $('#sign-forms').html(errorHtml)
}

const changePassSuccess = function () {
  const successHtml = successTemplate()
  $('#change-password-form')[0].reset()
  $('#user-message').html(successHtml)
}

const changePassFailure = function () {
  const errorHtml = errorTemplate()
  $('#user-message').html(errorHtml)
}

const signOutSuccess = function () {
  delete store.user
  delete store.currentGame
  fillers.showIntro()
}

const signOutFailure = function () {
  const errorHtml = errorTemplate()
  $('#user-message').html(errorHtml)
}

module.exports = {
  onSignFailure,
  onSignInSuccess,
  onSignUpSuccess,
  changePassFailure,
  changePassSuccess,
  signOutSuccess,
  signOutFailure
}
