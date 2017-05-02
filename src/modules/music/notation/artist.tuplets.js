/* eslint-disable */

import Vex from 'vexflow';
import _ from 'lodash';

export default class ArtistTuplets {
  constructor(artist) {
    this.artist = artist
  }

  makeTuplets(tuplets, notes) {
    const lastStave = _.last(this.artist.staves)

    if (!lastStave.note) {
      return
    }

    const staveNotes = lastStave.note_notes

    if (notes == null) {
      notes = tuplets;
    }

    if (staveNotes.length < notes) {
      throw new Vex.RERR('ArtistError', 'Not enough notes for tuplet')
    }

    const modifier = new Vex.Flow.Tuplet(staveNotes.slice(staveNotes.length - notes), { num_notes: tuplets })
    this.artist.stave_articulations.push(modifier)
  }
};
