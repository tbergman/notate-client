// @flow

export default class Voice {
  notes: Array<StaveElement> = []

  withNotes(notes: Array<StaveElement>) {
    this.notes = notes
    return this
  }

  toString() {
    return this.notes.map(x => x.toString()).join(' ')
  }
}
