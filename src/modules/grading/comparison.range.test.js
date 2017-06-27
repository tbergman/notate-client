//@flow

import RangeComparison from 'modules/grading/comparison.range'
import { DefaultNote } from 'modules/types'
import { ACCIDENTAL } from 'modules/toolbox'

describe('RangeComparison.check', () => {
  it('Returns true for value within range.', () => {
    let student = { ...DefaultNote, pitch: 'C/5'}
    let answer = {
      ...DefaultNote,
      pitch: 'G4',
      // ^^^ where the note was clicked/inserted.
      // we still dont know how to display that on the stave,
      // so for now, let's render it as a normal note
    }

    // range should come at the validator level.
    // i am not sure atm, but maybe this could be difficult to implement
    // in which case, we can store it at the note level, but on a separate
    // property, definetly not on `validators`.
    // it may be the case that we will have refactor how the validators get
    // attached to the note.
    let result = RangeComparison.check(answer, 'G4:A5')(student)
    expect(result).toEqual(true)
  })

  it('Returns false for value outside range.', () => {
    let student = { ...DefaultNote, pitch: 'F/4'}
    let answer = { ...DefaultNote, validators: ["G4:A5"]}
    let result = RangeComparison.check(answer)(student)
    expect(result).toEqual(false)
  })
  it('Ranges with flats.', () => {
    let student = { ...DefaultNote, pitch: 'F/4'}
    let answer = { ...DefaultNote, validators: ["Gbb4:Abb5"]}
    let result = RangeComparison.check(answer)(student)
    expect(result).toEqual(true)
  })
  it('Ranges with sharps.', () => {
    let student = { ...DefaultNote, pitch: 'F/4', accidental: ACCIDENTAL.DOUBLE_SHARP}
    let answer = { ...DefaultNote, validators: ["G4:A#5"]}
    let result = RangeComparison.check(answer)(student)
    expect(result).toEqual(true)
  })
  it('Returns true for note outside of range but enumerated.', () => {
    let student = { ...DefaultNote, pitch: 'C/4'}
    let answer = { ...DefaultNote, validators: ["C4, G4:A5"]}
    let result = RangeComparison.check(answer)(student)
    expect(result).toEqual(true)
  })
})
