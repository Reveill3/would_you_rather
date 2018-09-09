export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function receiveQuestions (questions) {
  type: RECEIVE_QUESTIONS,
  questions
}
