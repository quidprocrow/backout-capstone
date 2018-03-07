
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
        <td class="table-top" width="50px">
        DELETE
        </td>
        <td class="table-top" width="50px">
        EDIT
        </td>
      </tr>
    `)
  $('#display-all-games').html(tableHtml)
  data.games.forEach((game, index) => {
    const title = game.mnemonic.slice(0, 20)
    const gameHtml = (`
      <tr height="50px">
        <td class="table-cell" width="212px" data-id="${game.id}">
        ${title}
        </td>
        <td class="table-cell" width="107px" data-id="${game.id}">
        ${game.sentences.length}
        </td>
        <td class="table-cell" width="79px" data-id="${game.id}">
        ${game.hope}
        </td>
        <td class="table-cell" width="80px" data-id="${game.id}">
        ${game.wisdom}
        </td>
        <td class="table-cell" width="76px">
        <span data-id="${game.id}" class="delete-game"><B>X</B></span>
        </td>
        <td class="table-cell" width="55px">
        <span data-id="${game.id}" class="update-game"><B>?</B></span>
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
