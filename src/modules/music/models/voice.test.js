// @flow

import Note from 'modules/music/models/note'
import Rest from 'modules/music/models/rest'
import Voice from 'modules/music/models/voice'

describe('voice', () => {
  it('should describe all elements on the voice', () => {
    const voice = new Voice().withNotes([
      new Note().withPitch('C/4'),
      new Note().withPitch('D/4').withDuration('w'),
      new Rest().invisible(),
      new Note().withPitch('E/4')
    ])

    expect(voice.toString()).toEqual(':q C/4 :w D/4 :q #99# :q E/4')
  })
})
