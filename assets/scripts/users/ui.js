const fillers = require('../fillers.js')

const onSignInSuccess = function (data) {
  fillers.refresh()

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
  onSignInSuccess
}
