const fillers = require('../fillers.js')
const store = require('../store.js')

const onSignInSuccess = function (data) {
  fillers.showInstructions()
  store.user = data.user
  store.autoSignIn = null
  const userGreet = store.user.email.split('@')
  // Greet the user.
  if (userGreet[0].length < 16) {
    $('.user-greeting').html(userGreet[0]).css('text-transform', 'uppercase')
  } else {
    $('.user-greeting').html('HELLO').css('text-transform', 'uppercase')
  }
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
