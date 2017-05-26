// @flow
import type { StaveNote } from 'modules/types'
import { Record } from 'immutable'

export type CreateQuestion = {
  bars: number,
  notes: Array<StaveNote>,
  answers: Array<StaveNote>,
}

// create new record "class"
const newICreateQuestion = Record({
  bars: 1,
  notes: [],
  answers: [],
})

// create a dummy instance of that record to use for typing
const dummyICreateQuestionInst = newICreateQuestion()

// create the type to use when declaring the interface to a component
export type iCreateQuestion = typeof dummyICreateQuestionInst

export type CreateQuestionState = {
  question: CreateQuestion | iCreateQuestion
}
