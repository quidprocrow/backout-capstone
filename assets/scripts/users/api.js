'use strict'
// Use strict affects what config.apiOrigin does.
const config = require('../config.js')
const store = require('../store')

const signInUser = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

const signUpUser = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

const changePassUser = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOutUser = function () {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signInUser,
  signUpUser,
  changePassUser,
  signOutUser
}
