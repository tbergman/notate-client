/* eslint-disable */

import Vex from 'vexflow'
import _ from 'lodash'

export default class ArtistBars {
  constructor(artist) {
    this.artist = artist
  }

  addBar(type) {
    this.artist.key_manager.reset()

    let stave = _.last(this.artist.staves)

    type = (() => { switch (type) {
      case 'single': return Vex.Flow.Barline.type.SINGLE
      case 'double': return Vex.Flow.Barline.type.DOUBLE
      case 'end': return Vex.Flow.Barline.type.END
      case 'repeat-begin': return Vex.Flow.Barline.type.REPEAT_BEGIN
      case 'repeat-end': return Vex.Flow.Barline.type.REPEAT_END
      case 'repeat-both': return Vex.Flow.Barline.type.REPEAT_BOTH
      default: return Vex.Flow.Barline.type.SINGLE
    }})()

    let barNote = new Vex.Flow.BarNote().setType(type)
    stave.tab_notes.push(barNote)

    if (stave.note != null) {
      return stave.note_notes.push(barNote)
    }
  }
};
