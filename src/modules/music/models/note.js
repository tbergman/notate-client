// @flow

import StaveElement from 'modules/music/models/stave.element'

export default class Note extends StaveElement {
  pitch: string

  withPitch(pitch: string): Note {
    this.pitch = pitch
    return this
  }

  toString(): string {
    return `:${this.duration} ${this.pitch}`
  }
}
