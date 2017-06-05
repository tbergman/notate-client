// @flow

import _ from 'lodash'
import type { StaveNote } from 'modules/types'
import { ACCIDENTAL } from 'modules/toolbox'

const parseNote = (note) => {
  return {
    pitch: note.pitch.split('/')[0],
    octave: parseInt(note.pitch.split('/')[1], 10),
    accidental: note.accidental,
  }
}

const noteValue = (note) => {
  const pitchValues = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  }

  const accidentalsValues = {}
  accidentalsValues[ACCIDENTAL.NATURAL] = 0
  accidentalsValues[ACCIDENTAL.SHARP] = 1
  accidentalsValues[ACCIDENTAL.DOUBLE_SHARP] = 2
  accidentalsValues[ACCIDENTAL.FLAT] = -1
  accidentalsValues[ACCIDENTAL.DOUBLE_FLAT] = -2

  const pitchValue = pitchValues[note.pitch]

  const accidentalValue = (note.accidental !== ACCIDENTAL.NONE)
    ? accidentalsValues[note.accidental]
    : 0

  return (pitchValue + accidentalValue + (note.octave * 12))
}

const PitchComparison = {
  equal: (answer: StaveNote) => {
    return (student: StaveNote) =>
      noteValue(parseNote(student)) ===
      noteValue(parseNote(answer))
  },

  equalOrHigher: (answer: StaveNote) => {
    return (student: StaveNote) =>
      noteValue(parseNote(student)) >=
      noteValue(parseNote(answer))
  },

  equalOrLower: (answer: StaveNote) => {
    return (student: StaveNote) =>
      noteValue(parseNote(student)) <=
      noteValue(parseNote(answer))
  },

  sameKey: (answer: StaveNote) => {
    return (student: StaveNote) =>
      (noteValue(parseNote(student)) % 12) ===
      (noteValue(parseNote(answer)) % 12)
  },
}

export default PitchComparison
