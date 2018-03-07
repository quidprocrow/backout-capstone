const fillers = require('../fillers.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const deleteGameClick = function (event) {
  const id = $(event.target).data('id')
  api.deleteGame(id)
    .then(api.indexGames)
    .then(ui.indexGamesSuccess)
    .catch(ui.indexGamesFailure)
}

const newGameSubmit = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  data.game.hope = 75
  data.game.wisdom = 50
  data.game.user_id = store.user.id
  data = JSON.stringify(data)
  api.createGame(data)
    .then(ui.createGameSuccess)
    .then(api.indexGames)
    .then(ui.indexGamesSuccess)
    .catch(ui.createGameFailure)
}

const gameButtonClick = function () {
  fillers.showNewGameForm()
}

const gameLinkClick = function () {
  fillers.showManyGames()
  api.indexGames()
    .then(ui.indexGamesSuccess)
    .catch(ui.indexGamesFailure)
}

const addGamesEventListeners = function () {
  $('#game-link').on('click', gameLinkClick)
  $('#new-game-button').on('click', gameButtonClick)
  $('#new-game-form-area').on('submit', '#new-game-form', newGameSubmit)
  $('#display-all-games').on('click', '.delete-game', deleteGameClick)
}

module.exports = {
  addGamesEventListeners
}
