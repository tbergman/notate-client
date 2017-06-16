/* eslint-disable */

import Vex from 'vexflow'
import _ from 'lodash'

export default class ArtistLayers {
  constructor(artist) {
    this.artist = artist
  }

  drawBaseLayer(context, stave, notesVoice, beams, textNotesVoice) {
    this.rootElement = context.parent

    this.withinGroup(context, ['layer-base'], group => {
      _.each(notesVoice, voice => {
        voice.draw(context, stave)
      })

      _.each(beams, beam => {
        beam.setContext(context).draw()
      })

      _.each(textNotesVoice, voice => {
        voice.draw(context, stave)
      })
    })

    this.staveLayers = context.openGroup()
    this.staveLayers.classList.add('layers')
    context.closeGroup()
  }

  drawOptionsLayer(context, stave, voices) {
    // always draw options layer on root element
    context.parent = this.rootElement

    // if toolbox changed, clear and redraw options, otherwise do nothing
    if (this.toolboxChanged(this.artist.toolbox)) {
      this.clearLayer(context.parent, { id: 'option' })

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
        this.withinGroup(context, ['note-option'], group => {
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

          const clickableArea = this.drawClickableAreaForOption(group, context)

          clickableArea.addEventListener('click', () => {
            this.artist.options.addNote(newNote.tickContext.getX(), x)
          })

          const staveNote = group.getElementsByClassName('vf-stavenote')[0]

          clickableArea.addEventListener('mouseover', () => {
            staveNote.classList.add('hovered')
          })

          clickableArea.addEventListener('mouseout', () => {
            staveNote.classList.remove('hovered')
          })
        })
      })
    }
  }

  drawClickableAreaForOption(group, context) {
    let rect

    this.withinGroup(context, ['clickable-area'], clickableArea => {
      const notehead = group
        .getElementsByClassName('vf-notehead')[0]
        .getElementsByTagName('path')[0]

      const bbox = !!notehead.getBBox && notehead.getBBox()

      const svgns = "http://www.w3.org/2000/svg"
      rect = document.createElementNS(svgns, 'rect')
      rect.setAttributeNS(null, 'x', bbox.x - bbox.width)
      rect.setAttributeNS(null, 'y', bbox.y)
      rect.setAttributeNS(null, 'height', bbox.height)
      rect.setAttributeNS(null, 'width', bbox.width * 3)
      rect.setAttributeNS(null, 'fill', 'transparent')
      rect.setAttributeNS(null, 'stroke', 'transparent')
      clickableArea.appendChild(rect)
    })

    return rect
  }

  clearLayer(parent, layer) {
    const elements = parent.getElementsByClassName('layer-' + layer.id)
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0])
    }
  }

  clearAllUserLayers() {
    const elements = this.staveLayers.children
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0])
    }
  }

  drawLayer(context, stave, notes, layer) {
    this.clearLayer(context.parent, layer)

    const rememberParent = context.parent
    context.parent = this.staveLayers

    this.withinGroup(context, ['layer-' + layer.id], group => {
      const tickContext = new Vex.Flow.TickContext()

      _.each(notes, note => {

        this.withinGroup(context, ['note-layer', 'note-' + layer.className], noteGroup => {
          if (this.artist.toolbox.selectedNote && this.artist.toolbox.selectedNote.id === note.id) {
            noteGroup.classList.add('note-selected')
          }

          const newNote = this.drawableNote(note)

          tickContext.addTickable(newNote)
          tickContext.preFormat().setX(note.position)
          newNote.setContext(context).setStave(stave)
          newNote.draw()

          if (this.artist.toolbox.selectionTool || this.artist.toolbox.eraserSelected) {
            noteGroup.addEventListener('click', () => {
              this.artist.options.selectNote(note)
            })
          }
        })
      })
    })

    context.parent = rememberParent
  }

  drawableNote(note) {
    const duration = note.duration + (note.isRest ? 'r' : '')
    const newNote = new Vex.Flow.StaveNote({ keys: [note.pitch], duration: duration, stem_direction: 1, clef: this.artist.options.clef })
    if (note.accidental && !note.isRest) {
      newNote.addAccidental(0, new Vex.Flow.Accidental(note.accidental))
    }
    if (note.isDotted) {
      newNote.addDot(0)
    }
    return newNote
  }

  withinGroup(context, classes, callback) {
    const group = context.openGroup()
    _.each(classes, x => group.classList.add(x))

    callback(group)

    context.closeGroup()
  }

  toolboxChanged(toolbox) {
    return !_.isEqual(toolbox, this.previousToolbox);
  }
}
