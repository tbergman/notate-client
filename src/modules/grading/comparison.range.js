// @flow

import Utils from 'modules/grading/note.string.utils'
import PitchComparison from 'modules/grading/comparison.pitch'

const RangeComparison = {
  check(input: string): boolean{
    const commaSplit = input.split(',')
    const noteString = commaSplit[0].trim()
    const rangeString = commaSplit[1].trim()
    const rangeSplit = rangeString.split(':')
    const lowerNoteString = rangeSplit[0].trim()
    const upperNoteString = rangeSplit[1].trim()

    const note = Utils.stringToNote(noteString)
    const lowerNote = Utils.stringToNote(lowerNoteString)
    const upperNote = Utils.stringToNote(upperNoteString)

    if (PitchComparison.equalOrHigher(lowerNote)(note) && PitchComparison.equalOrLower(upperNote)(note)){
      return true
    }

    return false
  }
}

export default RangeComparison
