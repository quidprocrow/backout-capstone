const fillers = require('../fillers.js')
const store = require('../store.js')

const showGameSuccess = function (data) {
  delete store.currentGame
  store.currentGame = data.game
  // console.log('I am the data at success', data)
  // console.log('I am the store now', store.currentGame)
  // console.log('I am the data words', data.game.words)
  $('#user-message').html('')
  fillers.showOneGame(data)
}

const showGameFailure = function () {
  const errorHtml = (`
    <p class="message">
    <b>Hmm.<b/> Something went wrong.
    </p>
    `)
  $('#user-message').html(errorHtml)
}

const indexGamesSuccess = function (data) {
  $('#user-message').html('')
  if (data.games.length > 0) {
    fillers.tableFill(data)
  } else {
    $('#display-all-games').html('')
    const noneHtml = (`
      <p class="message">You have no games!</p>
      `)
    $('#user-message').html(noneHtml)
  }
}

const indexGamesFailure = function () {
  const errorHtml = (`
    <p class="message">
    HMM. Something went wrong.
    </p>
    `)
  $('#user-message').html(errorHtml)
}

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
  createGameSuccess,
  indexGamesSuccess,
  indexGamesFailure,
  showGameSuccess,
  showGameFailure
}
