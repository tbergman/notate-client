//@flow

import RangeComparison from 'modules/grading/comparison.range'
import { DefaultNote } from 'modules/types'
import { ACCIDENTAL } from 'modules/toolbox'

describe('RangeComparison.check', () => {
  it('Returns true for value within range.', () => {
    let student = { ...DefaultNote, pitch: 'C/5'}
    let answer = {
      ...DefaultNote,
    }
    let result = RangeComparison.check(answer, 'G4:A5')(student)
    expect(result).toEqual(true)
  })

  it('Returns false for value outside range.', () => {
    let student = { ...DefaultNote, pitch: 'F/4'}
    let answer = { ...DefaultNote}
    let result = RangeComparison.check(answer, 'G4:A5')(student)
    expect(result).toEqual(false)
  })
  it('Ranges with flats.', () => {
    let student = { ...DefaultNote, pitch: 'F/4'}
    let answer = { ...DefaultNote}
    let result = RangeComparison.check(answer, 'Gbb4:Abb5')(student)
    expect(result).toEqual(true)
  })
  it('Ranges with sharps.', () => {
    let student = { ...DefaultNote, pitch: 'F/4', accidental: ACCIDENTAL.DOUBLE_SHARP}
    let answer = { ...DefaultNote}
    let result = RangeComparison.check(answer, 'G4:A#5')(student)
    expect(result).toEqual(true)
  })
  it('Returns true for note outside of range but enumerated.', () => {
    let student = { ...DefaultNote, pitch: 'C/4'}
    let answer = { ...DefaultNote}
    let result = RangeComparison.check(answer, 'C4, G4:A5')(student)
    expect(result).toEqual(true)
  })
})
