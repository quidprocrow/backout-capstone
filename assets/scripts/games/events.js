const fillers = require('../fillers.js')
// const getFormFields = require('../../../lib/get-form-fields.js')
// const api = require('./api.js')
// const ui = require('./ui.js')
// const store = require('../store.js')

const gameButtonClick = function () {
  const newGameHtml = (`
    sup
    `)
  $('#new-game-form').html(newGameHtml)
}

const gameLinkClick = function () {
  fillers.showManyGames()
}

const addGamesEventListeners = function () {
  $('#game-link').on('click', gameLinkClick)
  $('#new-game-button').on('click', gameButtonClick)

}

module.exports = {
  addGamesEventListeners
}
