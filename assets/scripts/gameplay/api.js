'use strict'
// Use strict affects what config.apiOrigin does.
const config = require('../config.js')
const store = require('../store')

const createSentence = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sentences/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const createWord = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/words/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const updateWord = function (data) {
  const parsed = JSON.parse(data)
  return $.ajax({
    url: config.apiOrigin + '/words/' + parsed.word.id,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const showSentence = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/sentences/' + id,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createWord,
  createSentence,
  updateWord,
  showSentence
}
