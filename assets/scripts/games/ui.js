
const createGameSuccess = function (data) {
  $('#new-game-form-area').html('')
}

const createGameFailure = function (data) {
  const errorHtml = (`
    <p class="message">
    <b>Hmm.<b/> Something went wrong.
    </p>
    `)
  $('#new-game-form-area').html(errorHtml)
}

module.exports = {
  createGameFailure,
  createGameSuccess
}
