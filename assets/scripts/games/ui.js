
const indexGamesSuccess = function (data) {
  $('#user-message').html('')
  const halt = data.games.length - 1
  const tableHtml = (`
    <table class="center">
      <tr>
        <td class="table-top" width="200px">
        MNEMONIC
        </td>
        <td class="table-top" width="50px">
        SENTENCES
        </td>
        <td class="table-top" width="75px">
        HOPE
        </td>
        <td class="table-top" width="75px">
        WISDOM
        </td>
        <td class="table-top" width="100px">
        PLAY
        </td>
      </tr>
    `)
  $('#display-all-games').html(tableHtml)
  data.games.forEach((game, index) => {
    const title = game.mnemonic.slice(0, 16)
    const gameHtml = (`
      <tr height="50px">
        <td class="table-cell" width="221px" data-id="${game.id}">
        ${title}<BR>
        <span data-id="${game.id}" class="delete-game">X</span>
        <span data-id="${game.id}" class="update-game"><B>?</B></span>
        </td>
        <td class="table-cell" width="111px" data-id="${game.id}">
        ${game.sentences.length}
        </td>
        <td class="table-cell" width="83px" data-id="${game.id}">
        ${game.hope}
        </td>
        <td class="table-cell" width="83px" data-id="${game.id}">
        ${game.wisdom}
        </td>
        <td class="table-cell" width="111px">
        <span data-id="${game.id}" class="play-game">GO</span>
        </td>
      </tr>
      `)
    $('#display-all-games').append(gameHtml)
    if (index === halt) {
      const endTableHtml = (`
        </table>
        `)
      $('#display-all-games').append(endTableHtml)
    }
  })
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
  indexGamesFailure
}
