// @flow

export default class StaveElement {
  duration: string = 'q';

  withDuration(duration: string): StaveElement {
    this.duration = duration
    return this
  }

  toString(): string {
    throw new TypeError('Cannot construct Stave Elements directly')
  }
}
