// @flow
import { ACCIDENTAL } from 'modules/toolbox'
import type { StaveNote } from 'modules/types'
import { DefaultNote } from 'modules/types'

const Utils = {
  stringToNote(input: string): StaveNote{
    let count = 1
    let accidentalString = ''

    while (count < input.length) {
      if (input.charAt(count) === 'b' || input.charAt(count) === '#') {
        accidentalString += input.charAt(count)
      }
      count++
    }

    let accidental = ACCIDENTAL.NONE

    if (accidentalString.length > 0) {
      if (accidentalString.charAt(0) === 'b') {
        if (accidentalString.length === 1) {
          accidental = ACCIDENTAL.FLAT
        }
        else if (accidentalString.length === 2) {
          accidental = ACCIDENTAL.DOUBLE_FLAT
        }
      }
      else if (accidentalString.charAt(0) === '#') {
        if (accidentalString.length === 1) {
          accidental = ACCIDENTAL.SHARP
        }
        else if (accidentalString.length === 2) {
          accidental = ACCIDENTAL.DOUBLE_SHARP
        }
      }
    }
    return{
      ...DefaultNote,
      pitch: input.charAt(0) + '/' + input.substring(1 + accidentalString.length),
      accidental: accidental,
    }
  }
}

export default Utils
