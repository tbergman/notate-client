// @flow
import Utils from 'modules/grading/note.string.utils'
import { ACCIDENTAL } from 'modules/toolbox'

describe('stringToNote', () => {
  it('correctly parses without accidentals', () => {
    const input = 'C8'
    const expected = Utils.createNote('C/8')
    const result = Utils.stringToNote(input)
    expect(result.pitch).toEqual(expected.pitch)
  })

  it('correctly parses with flats', () => {
    const input = 'Dbb6'
    const expected = Utils.createNote('D/6', ACCIDENTAL.DOUBLE_FLAT)
    const result = Utils.stringToNote(input)
    expect(result.pitch+result.accidental).toEqual(expected.pitch+expected.accidental)
  })

  it('correctly parses with sharps', () => {
    const input = 'F#12'
    const expected = Utils.createNote('F/12', ACCIDENTAL.SHARP)
    const result = Utils.stringToNote(input)
    expect(result.pitch+result.accidental).toEqual(expected.pitch+expected.accidental)
  })
})
