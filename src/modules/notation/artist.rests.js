/* eslint-disable */

import Vex from 'vexflow'
import _ from 'lodash'

export default class ArtistRests {
  constructor(artist) {
    this.artist = artist
  }

  addRest(params) {
    let position

    if (params["position"] === 0) {
      this.artist.addStaveNote({
        spec: ["r/4"],
        accidentals: [],
        is_rest: true
      })
    } else {
      position = this.artist.tuning.getNoteForFret((parseInt(params["position"], 10) + 5) * 2, 6)

      this.artist.addStaveNote({
        spec: [position],
        accidentals: [],
        is_rest: true
      })
    }

    let { tab_notes } = _.last(this.artist.staves)

    const currentDuration = this.artist.current_duration

    return tab_notes.push(new Vex.Flow.GhostNote(currentDuration))
  }
};
