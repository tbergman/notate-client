// @flow
import type { StaveNote } from 'modules/types'

export type CreateQuestionState = {
  question: {
    bars: number,
    notes: Array<StaveNote>,
    answers: Array<StaveNote>,
  }
}
