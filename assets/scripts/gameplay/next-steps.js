
const getNextSteps = function (stepNumber) {
  const nextStep = {}
  // Each iteration of the next step object is expected to have
  // a sentence, a redaction array, and modifiers for hope and wisdom.
  switch (stepNumber) {
    case 1:
      nextStep.sentence = 'You\'re an idiot for bringing <span class="clickable" data-id="3">him</span> here. What were <span class="clickable" data-id="13">you</span> thinking?'
      nextStep.redaction = [2, 3, 4, 5, 6]
      nextStep.hopemodifier = -10
      nextStep.wisdommodifier = 25
      break
    case 2:
      nextStep.sentence = 'Not the situation, per se, or your response to it, but rather the <span class="clickable" data-id="5">figure</span> in the dark, bent over Bertram\'s <span class="clickable" data-id="4">body</span>, with a book.'
      nextStep.redaction = [2, 3, 4, 5, 6]
      nextStep.hopemodifier = -10
      nextStep.wisdommodifier = 0
      break
    case 3:
      nextStep.sentence = 'You should have thought of him grabbing the book. <span class="clickable" data-id="13">Naturally</span> Bertram would go for the most <span class="clickable" data-id="12">sinister</span>, the most hands-off very-scary big-magic dusty-tome thing in sight.'
      nextStep.redaction = [0, 1, 2, 3, 4, 5, 6]
      nextStep.hopemodifier = -10
      nextStep.wisdommodifier = 0
      break
    case 4:
      nextStep.sentence = 'surely. Bertram <span class="clickable" data-id="6">laughed</span> about death while still in the village, since avoiding dying there with untold ancestors just amounted to a walk, and so certainly you <span class="clickable" data-id="7">both</span> could manage that little. He hadn\'t.'
      nextStep.redaction = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24]
      nextStep.hopemodifier = -20
      nextStep.wisdommodifier = 10
      break
    case 5:
      nextStep.sentence = 'The book was responsible. And anyway, it\'s not wrong that Bertram should die; it\'s wrong that you would be the one to do it.'
      nextStep.redaction = [5, 6, 7, 8, 9, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
      nextStep.hopemodifier = -100
      nextStep.wisdommodifier = -40
      break
    case 6:
      nextStep.sentence = 'You <span class="clickable" data-id="8">both</span> really had nothing to <span class="clickable" data-id="9">lose</span> there.'
      nextStep.redaction = [5, 6, 7, 8, 9, 11, 13, 14, 15, 16, 17, 20, 21, 22, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35]
      nextStep.hopemodifier = -20
      nextStep.wisdommodifier = 10
      break
    case 7:
      nextStep.sentence = 'You were the cautious one. The <span class="clickable" data-id="12">planner</span>. Which just means that Bertram picking up the wrong book is all the more on you -- shouldn\'t you have <span class="clickable" data-id="13">anticipated</span> this?'
      nextStep.redaction = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31]
      nextStep.hopemodifier = -40
      nextStep.wisdommodifier = 10
      break
    case 8:
      nextStep.sentence = ', as you were orphaned early, without real <span class="clickable" data-id="9">prospects</span>. '
      nextStep.redaction = [2, 7]
      nextStep.hopemodifier = 0
      nextStep.wisdommodifier = 10
      break
    case 9:
      nextStep.sentence = 'That was what had <span class="clickable" data-id="10">propelled</span> you towards <span class="clickable" data-id="11">working</span> with the enchanter.'
      nextStep.redaction = [1, 7]
      nextStep.hopemodifier = -20
      nextStep.wisdommodifier = 10
      break
    case 10:
      nextStep.sentence = 'Any way out, you\'d thought. Any way at all. And now your oldest friend was dead.'
      nextStep.redaction = [1, 2, 3]
      nextStep.hopemodifier = -100
      nextStep.wisdommodifier = 10
      break
    case 11:
      nextStep.sentence = 'Everything has its price, one must suppose. Perhaps the loss of a friend was just one such price.'
      nextStep.redaction = [7, 8]
      nextStep.hopemodifier = -5
      nextStep.wisdommodifier = -50
      break
    case 12:
      nextStep.sentence = 'And now all you can think of is to keep reading from it, like the story might be rewritten, like repetition ever changed something. Idiot, idiot, idiot.  '
      nextStep.redaction = []
      nextStep.hopemodifier = -60
      nextStep.wisdommodifier = -30
      break
    case 13:
      nextStep.sentence = 'Not your fault that he\'s a fool, but certainly your fault that you leapt after him, to read from the book. Maybe his error had been stopping. Or perhaps it was trying to change the words as he spoke. He\'d resisted.'
      nextStep.redaction = []
      nextStep.hopemodifier = -90
      nextStep.wisdommodifier = -30
      break
    default:
      nextStep.sentence = 'It worked!'
      nextStep.redaction = [0, 2, 3, 4]
      nextStep.hopemodifier = -100
      nextStep.wisdommodifier = 0
      break
  }
  return nextStep
}

module.exports = getNextSteps
