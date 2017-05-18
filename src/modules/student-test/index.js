// @flow

import type { List } from 'immutable'
import { Record } from 'immutable'

export type StudentNote = {
  pitch: string,
  duration: string,
  position: number,
  questionId?: string,
}

export type AnswerNote = {
  pitch: Function,
  duration: string,
  position: number,
}

export type Question = {
  id: string,
  index: string,
  statement: string,
  notation: string,
  student: Array<StudentNote>,
  answers: Array<AnswerNote>,
  options?: QuestionOptions,
}

export type QuestionOptions = {
  maxNotesPerMeasure?: number
}

// create new record "class"
const newIQuestion = Record({
  id: '',
  index: '',
  statement: '',
  notation: '',
  student: [],
})

// create a dummy instance of that record to use for typing
const dummyIQuestionInst = newIQuestion()

// create the type to use when declaring the interface to a component
export type iQuestion = typeof dummyIQuestionInst

export type StudentTestState = {
  questions: List<Question | iQuestion>,
}
