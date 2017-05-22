// @flow

import Note from 'modules/music/models/note'

describe('note', () => {
  it('should describe pitches and duration', () => {
    let note = new Note().withDuration('q').withPitch('C/4')
    expect(note.toString()).toEqual(':q C/4')

    note = new Note().withDuration('w').withPitch('C/4')
    expect(note.toString()).toEqual(':w C/4')

    note = new Note().withDuration('q').withPitch('C##/4')
    expect(note.toString()).toEqual(':q C##/4')
  })
})
