'use strict'
// Use strict affects what config.apiOrigin does.
const config = require('../config.js')
const store = require('../store')

const createGame = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const indexGames = function () {
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteGame = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showGame = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createGame,
  indexGames,
  deleteGame,
  showGame
}
