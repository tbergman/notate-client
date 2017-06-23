// @flow
import Utils from 'modules/grading/note.string.utils'
import { ACCIDENTAL } from 'modules/toolbox'
import { DefaultNote } from 'modules/types'

describe('stringToNote', () => {
  it('correctly parses without accidentals', () => {
    const input = 'C8'
    const expected = {...DefaultNote, pitch: 'C/8'}
    const result = Utils.stringToNote(input)
    expect(result.pitch).toEqual(expected.pitch)
  })

  it('correctly parses with flats', () => {
    const input = 'Dbb6'
    const expected = {...DefaultNote, pitch: 'D/6', accidental: ACCIDENTAL.DOUBLE_FLAT}
    const result = Utils.stringToNote(input)
    expect(result.pitch).toEqual(expected.pitch)
    expect(result.accidental).toEqual(expected.accidental)
  })

  it('correctly parses with sharps', () => {
    const input = 'F#12'
    const expected = {...DefaultNote, pitch: 'F/12', accidental: ACCIDENTAL.SHARP}
    const result = Utils.stringToNote(input)
    expect(result.pitch).toEqual(expected.pitch)
    expect(result.accidental).toEqual(expected.accidental)
  })
})
