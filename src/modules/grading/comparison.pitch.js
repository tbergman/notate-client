// @flow

import _ from 'lodash'
import type { StaveNote } from 'modules/types'

const stringToNote = (notation) => {
  return {
    pitch: notation.split('/')[0],
    octave: parseInt(notation.split('/')[1], 10)
  }
}

const noteToInt = (note) => {
  const values = {
    0: 'C',
    2: 'D',
    4: 'E',
    5: 'F',
    7: 'G',
    9: 'A',
    11: 'B',
  }

  const key = _.findKey(values, (x) => (x.indexOf(note.pitch) !== -1))
  const value = parseInt(key)

  return (value + (note.octave * 12))
}

const PitchComparison = {
  equal: (answer: StaveNote) => {
    return (student: StaveNote) =>
      answer.pitch === student.pitch
  },

  equalOrHigher: (answer: StaveNote) => {
    return (student: StaveNote) =>
      noteToInt(stringToNote(student.pitch)) >=
      noteToInt(stringToNote(answer.pitch))
  },

  equalOrLower: (answer: StaveNote) => {
    return (student: StaveNote) =>
      noteToInt(stringToNote(student.pitch)) <=
      noteToInt(stringToNote(answer.pitch))
  },

  sameKey: (answer: StaveNote) => {
    return (student: StaveNote) =>
      (noteToInt(stringToNote(student.pitch)) % 12) ===
      (noteToInt(stringToNote(answer.pitch)) % 12)
  },
}

export default PitchComparison
