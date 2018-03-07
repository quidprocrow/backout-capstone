const fillers = require('../fillers.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const newGameSubmit = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  data.game.hope = 75
  data.game.wisdom = 50
  data.game.user_id = store.user.id
  data = JSON.stringify(data)
  api.createGame(data)
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

const gameButtonClick = function () {
  fillers.showNewGameForm()
}

const gameLinkClick = function () {
  fillers.showManyGames()
}

const addGamesEventListeners = function () {
  $('#game-link').on('click', gameLinkClick)
  $('#new-game-button').on('click', gameButtonClick)
  $('#new-game-form-area').on('submit', '#new-game-form', newGameSubmit)
}

module.exports = {
  addGamesEventListeners
}
