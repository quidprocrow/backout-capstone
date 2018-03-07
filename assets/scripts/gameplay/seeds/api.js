'use strict'
// Use strict affects what config.apiOrigin does.
const config = require('../../config.js')
const store = require('../../store')

const showSeedSentence = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/seededsentences/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const indexSeedSentences = function () {
  return $.ajax({
    url: config.apiOrigin + '/seededsentences/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showSeedWord = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/seededsentences/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const indexSeedWords = function () {
  return $.ajax({
    url: config.apiOrigin + '/seededsentences/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  showSeedSentence,
  indexSeedSentences,
  showSeedWord,
  indexSeedWords
}
