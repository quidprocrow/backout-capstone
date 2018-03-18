const fillers = require('../fillers.js')
const store = require('../store.js')

const onSignInSuccess = function (data) {
  store.user = data.user
  store.autoSignIn = null
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
  const errorHtml = (`
    <p class="message">
    <b>Hmm.<b/> Something went wrong.
    </p>
    `)
  $('#sign-forms').html(errorHtml)
}

const changePassSuccess = function () {
  const errorHtml = (`
    <p class="message">
    Well done.
    </p>
    `)
  $('#user-message').html(errorHtml)
}

const changePassFailure = function () {
  const errorHtml = (`
    <p class="message">
    <b>Hmm.<b/> Something went wrong.
    </p>
    `)
  $('#user-message').html(errorHtml)
}

const signOutSuccess = function () {
  delete store.user
  delete store.currentGame
  fillers.showIntro()
}

const signOutFailure = function () {
  const errorHtml = (`
    <p class="message">
    <b>Hmm.<b/> Something went wrong.
    </p>
    `)
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
