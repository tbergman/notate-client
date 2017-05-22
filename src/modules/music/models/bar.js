// @flow

import StaveElement from 'modules/music/models/stave.element'

export const BAR_TYPE = {
  SINGLE: '|',
  DOUBLE: '=||',
  END: '=|=',
  REPEAT_BEGIN: '=|:',
  REPEAT_END: '=:|',
  REPEAT_BOTH: '=::',
}

export default class Bar extends StaveElement {
  type: string = BAR_TYPE.SINGLE;

  ofType(type): Rest {
    this.type = type
    return this
  }

  toString(): string {
    return type
  }
}
