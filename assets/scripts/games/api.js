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

module.exports = {
  createGame
}
