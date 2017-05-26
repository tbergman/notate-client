/* eslint-disable */

import Vex from 'vexflow'
import _ from 'lodash'

export default class ArtistLayers {
  constructor(artist) {
    this.artist = artist
  }

  drawBaseLayer(context, stave, notesVoice, beams, textNotesVoice) {
    this.rootElement = context.parent

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

    this.staveLayers = context.openGroup()
    this.staveLayers.classList.add('layers')
    context.closeGroup()
  }

  drawOptionsLayer(context, stave, voices) {
    // always draw options layer on root element
    context.parent = this.rootElement

    // if toolbox changed, clear and redraw options, otherwise do nothing
    if (this.toolboxChanged(this.artist.toolbox)) {
      this.clearLayer(context.parent, 'option')

      if (!this.artist.toolbox.selectionTool && !this.artist.toolbox.eraserSelected) {
        const optionLayer = context.openGroup()
        optionLayer.classList.add('layer-option')

        _.each(voices, voice => {
          _.each(voice.tickables, x => {
            this.drawOptionsColumn(context, stave, x)
          })
        })

        context.closeGroup()
      }
    }

    this.previousToolbox = this.artist.toolbox
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

        const optionNote = {
          pitch: x,
          duration: this.artist.toolbox.selectedDuration,
          accidental: this.artist.toolbox.selectedAccidental,
          isRest: this.artist.toolbox.restSelected,
          isDotted: this.artist.toolbox.dotSelected
        }
        const newNote = this.drawableNote(optionNote)

        note.tickContext.addTickable(newNote)
        note.tickContext.preFormat()
        newNote.setContext(context).setStave(stave)
        newNote.draw()

        context.closeGroup()

        group.addEventListener('click', () => {
          this.artist.options.addNote(newNote.tickContext.getX(), x)
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
      noteGroup.classList.add('note-layer')
      noteGroup.classList.add('note-' + layerId)
      if (this.artist.toolbox.selectedNote && this.artist.toolbox.selectedNote.id === note.id) {
        noteGroup.classList.add('note-selected')
      }

      const newNote = this.drawableNote(note)

      tickContext.addTickable(newNote)
      tickContext.preFormat().setX(note.position)
      newNote.setContext(context).setStave(stave)
      newNote.draw()

      context.closeGroup()

      if (this.artist.toolbox.selectionTool || this.artist.toolbox.eraserSelected) {
        noteGroup.addEventListener('click', () => {
          this.artist.options.selectNote(note)
        })
      }
    })

    group.classList.add('layer-' + layerId)
    context.closeGroup()

    context.parent = rememberParent
  }

  drawableNote(note) {
    const duration = note.duration + (note.isRest ? 'r' : '')
    const newNote = new Vex.Flow.StaveNote({ keys: [note.pitch], duration: duration, stem_direction: 1 })
    if (note.accidental) {
      newNote.addAccidental(0, new Vex.Flow.Accidental(note.accidental))
    }
    if (note.isDotted) {
      newNote.addDot(0)
    }
    return newNote
  }

  toolboxChanged(toolbox) {
    return !_.isEqual(toolbox, this.previousToolbox);
  }
}
