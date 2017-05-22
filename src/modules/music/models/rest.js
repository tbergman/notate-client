// @flow

import StaveElement from 'modules/music/models/stave.element'

export default class Rest extends StaveElement {
  visible: boolean = true;

  invisible(): Rest {
    this.visible = false
    return this
  }

  toString(): string {
    const rest = this.visible ? '##' : '#99#'
    return `:${this.duration} ${rest}`
  }
}
