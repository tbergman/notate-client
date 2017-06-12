/* eslint-disable */

import Vex from 'vexflow';
import _ from 'lodash';

export default class ArtistArticulations {
  constructor(artist) {
    this.artist = artist
  }

  // This gets the previous (second-to-last) non-bar non-ghost note.
  getPreviousNoteIndex() {
    let { tab_notes } = _.last(this.artist.staves)

    let index = 2

    while (index <= tab_notes.length) {
      let note = tab_notes[tab_notes.length - index]

      if (note instanceof Vex.Flow.TabNote) {
        return (tab_notes.length - index)
      }
      index++
    }

    return -1
  }

  addStaveArticulation(type, first_note, last_note, first_indices, last_indices) {
    let articulation = null

    if (["b", "s", "h", "p", "t", "T"].includes(type)) {
      articulation = new Vex.Flow.StaveTie({
        first_note,
        last_note,
        first_indices,
        last_indices,
      })
    }

    if (articulation != null) {
      return this.artist.stave_articulations.push(articulation)
    }
  }

  addArticulations(articulations) {
    let stave = _.last(this.artist.staves);
    let { tab_notes } = stave;
    let stave_notes = stave.note_notes;

    let current_tab_note = _.last(tab_notes);

    let has_bends = false;
    for (var valid_articulation of ["b", "s", "h", "p", "t", "T", "v", "V"]) {
      var current_indices, i, prev_indices, prev_tab_note
      var indices = ((() => {
        let result = []
        for (i = 0; i < articulations.length; i++) {
          let art = articulations[i]
          if ((art != null) && (art === valid_articulation)) {
            result.push(i)
          }
        }
        return result
      })());

      if (_.isEmpty(indices)) {
        continue
      }

      if (valid_articulation === "b") { has_bends = true; }

      let prev_index = this.getPreviousNoteIndex()

      if (prev_index === -1) {
        prev_tab_note = null;
        prev_indices = null;
      } else {
        var n
        prev_tab_note = tab_notes[prev_index]

        // Figure out which strings the articulations are on
        var this_strings = ((() => {
          let result1 = []
          let iterable = current_tab_note.getPositions()
          for (i = 0; i < iterable.length; i++) {
            n = iterable[i]

            if (Array.from(indices).includes(i)) {
              result1.push(n.str)
            }
          }
          return result1
        })())

        // Only allows articulations where both notes are on the same strings
        var valid_strings = ((() => {
          let result2 = []
          let iterable1 = prev_tab_note.getPositions()
          for (i = 0; i < iterable1.length; i++) {
            let pos = iterable1[i]

            if (Array.from(this_strings).includes(pos.str)) {
              result2.push(pos.str)
            }
          }
          return result2
        })());

        // Get indices of articulated notes on previous chord
        prev_indices = ((() => {
          let result3 = []
          let iterable2 = prev_tab_note.getPositions()
          for (i = 0; i < iterable2.length; i++) {
            n = iterable2[i]
            if (Array.from(valid_strings).includes(n.str)) {
              result3.push(i)
            }
          }
          return result3
        })())

        // Get indices of articulated notes on current chord
        current_indices = ((() => {
          let result4 = []
          let iterable3 = current_tab_note.getPositions()
          for (i = 0; i < iterable3.length; i++) {
            n = iterable3[i]
            if (Array.from(valid_strings).includes(n.str)) {
              result4.push(i)
            }
          }
          return result4
        })())
      }

      if (stave.note != null) {
        this.addStaveArticulation(
          valid_articulation,
          stave_notes[prev_index],
          _.last(stave_notes),
          prev_indices,
          current_indices
        )
      }
    }
  }
};
