/* eslint-disable */

/************************************************************

  LAYERS:

  The staff is being rendered in SVG with a layered concept
  in mind. The layers are being created by SVG groups and css
  classes applied to those groups. The current layers are:

  QUESTION LAYER: used to draw the notes from a question that
  appear for the student. This is the first layer to be rendered.

  OPTIONS LAYER: for each note on the question layer, stavenote
  or rest, we add an array of option notes to the same measure.
  The range of these notes is specified manually in this file.
  This allows the user to hover and click on a note at any given
  measure allowed by this layer.

  STUDENT LAYER: layer containing the answers a student added to
  the staff. Each option note clicked by the user is being handled
  so that it gets added to the student layer.

*************************************************************/

import Vex from 'vexflow'
import _ from 'lodash'

export default class ArtistLayers {
  constructor(artist) {
    this.artist = artist
  }

  drawBaseLayer(context, stave, notesVoice, beams, textNotesVoice) {
    const group = context.openGroup()
    group.classList.add('layer-base');

    _.each(notesVoice, voice => {
      voice.draw(context, stave)
    })

    _.each(beams, beam => {
      beam.setContext(context).draw()
    })

    _.each(textNotesVoice, voice => {
      voice.draw(context, stave)
    })

    context.closeGroup();
  }

  drawOptionsLayer(context, stave, voices) {
    this.staveLayers = context.openGroup()
    this.staveLayers.classList.add('layers')
    context.closeGroup()

    const optionLayer = context.openGroup()
    optionLayer.classList.add('layer-option')
    _.each(voices, voice => {
      _.each(voice.tickables, x => {
        this.drawOptionsColumn(context, stave, x)
      })
    })
    context.closeGroup()
  }

  drawOptionsColumn(context, stave, note) {
    if (note.attrs.type === 'StaveNote') {
      const availableOptions = [
        'E/3', 'F/3', 'G/3', 'A/3', 'B/3',
        'C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'A/4', 'B/4',
        'C/5', 'D/5', 'E/5', 'F/5', 'G/5', 'A/5', 'B/5',
        'C/6', 'D/6',
      ]

      _(availableOptions).each(x => {
        const group = context.openGroup()
        group.classList.add('note-option')

        const optionNote = new Vex.Flow.StaveNote({ keys: [x], duration: 'q', stem_direction: 1 })
        note.tickContext.addTickable(optionNote)
        optionNote.setContext(context).setStave(stave)
        optionNote.draw()

        context.closeGroup()

        group.addEventListener('click', () => {
          this.artist.options.addNote(optionNote.tickContext.getX(), x)
        })
      })
    }
  }

  clearLayer(parent, layerId) {
    const elements = parent.getElementsByClassName('layer-' + layerId)
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0])
    }
  }

  drawLayer(context, stave, notes, layerId) {
    if (_.isEmpty(notes)) {
      return
    }

    this.clearLayer(context.parent, layerId)

    const rememberParent = context.parent
    context.parent = this.staveLayers

    const group = context.openGroup()
    const tickContext = new Vex.Flow.TickContext()

    _.each(notes, note => {
      const noteGroup = context.openGroup()
      noteGroup.classList.add('note-' + layerId)

      const duration = note.duration + (note.isRest ? 'r' : '')
      const newNote = new Vex.Flow.StaveNote({ keys: [note.pitch], duration: duration, stem_direction: 1 })
      if (note.accidental) {
        newNote.addAccidental(0, new Vex.Flow.Accidental(note.accidental))
      }
      console.log(note)
      if (note.isDotted) {
        newNote.addDot(0)
      }

      tickContext.addTickable(newNote)
      tickContext.preFormat().setX(note.position)
      newNote.setContext(context).setStave(stave)
      newNote.draw()

      context.closeGroup()
    })

    group.classList.add('layer-' + layerId)
    context.closeGroup()

    context.parent = rememberParent
  }
}
