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

      this.artist. addStaveNote({
        spec: [position],
        accidentals: [],
        is_rest: true
      })
    }

    let { tab_notes } = _.last(this.artist.staves)

    const currentDuration = this.artist.current_duration

    if (this.artist.customizations["tab-stems"] === "true") {
      let tab_note = new Vex.Flow.StaveNote({
        keys: [position || "r/4"],
        duration: currentDuration + "r",
        clef: "treble",
        auto_stem: false
      })

      if (_.last(currentDuration) === "d") {
        tab_note.addDot(0)
      }

      return tab_notes.push(tab_note)
    } else {
      return tab_notes.push(new Vex.Flow.GhostNote(currentDuration))
    }
  }
};
