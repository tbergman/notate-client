// @flow

import Utils from 'modules/grading/note.string.utils'
import PitchComparison from 'modules/grading/comparison.pitch'
import type { StaveAnswerNote, StaveNote} from  'modules/types'

const RangeComparison = {

  check: (answer: StaveAnswerNote) => {
    return (student: StaveNote) =>
    RangeComparison.checkString(answer.validators[0], student)
  },

  checkString(range: string, student: StaveNote): boolean{
    const commaSplit = range.split(',')
    let notes = []
    let ranges = []
    let result = false
    commaSplit.forEach((split)=>{
      const trimmed = split.trim()
      const rangeSplit = trimmed.split(':')
      if (rangeSplit.length>1) {
        const lowerNoteString = rangeSplit[0].trim()
        const upperNoteString = rangeSplit[1].trim()
        const lowerNote = Utils.stringToNote(lowerNoteString)
        const upperNote = Utils.stringToNote(upperNoteString)
        const range = {
          lowerNote: lowerNote,
          upperNote: upperNote,
        }
        ranges.push(range)
      }
      else {
        notes.push(Utils.stringToNote(trimmed))
      }
    })
    notes.forEach((note) =>{
      if (PitchComparison.equal(note)(student)){
        result = true
      }
    })
    ranges.forEach((range) =>{
      if (PitchComparison.equalOrHigher(range.lowerNote)(student)
        && PitchComparison.equalOrLower(range.upperNote)(student)){
        result = true
      }
    })
    return result
  }
}

export default RangeComparison
