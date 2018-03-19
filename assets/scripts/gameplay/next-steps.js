
const getNextSteps = function (stepNumber) {
  const nextStep = {}
  // Each iteration of the next step object is expected to have
  // a sentence, a redaction array, and modifiers for hope and wisdom.
  switch (stepNumber) {
    case 1:
      nextStep.sentence = 'First <span class="clickable" data-id="3">sentence</span>.'
      nextStep.redaction = [1, 2, 3, 5]
      nextStep.hopemodifier = 10
      nextStep.wisdommodifier = -25
      break
    case 2:
      nextStep.sentence = 'Second  <span class="clickable" data-id="3">sentence</span>.'
      nextStep.redaction = [0, 2, 3, 4]
      nextStep.hopemodifier = -10
      nextStep.wisdommodifier = 25
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
