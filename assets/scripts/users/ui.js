const fillers = require('../fillers.js')
const store = require('../store.js')

const onSignInSuccess = function (data) {
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

module.exports = {
  onSignFailure,
  onSignInSuccess,
  onSignUpSuccess
}
