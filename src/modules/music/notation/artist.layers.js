/* eslint-disable */

import Vex from 'vexflow'
import _ from 'lodash'
import { studentAddedNote } from '../../student-test/actions'
import store from '../../store'

export default class ArtistLayers {
  constructor(artist) {
    this.artist = artist
  }

  drawQuestionLayer(context, stave, notesVoice, beams, textNotesVoice) {
    const group = context.openGroup()

    _.each(notesVoice, voice => {
      voice.draw(context, stave)
      this.drawOptionsHighlightingLayer(context, stave, voice)
    })

    _.each(beams, beam => {
      beam.setContext(context).draw()
    })

    _.each(textNotesVoice, voice => {
      voice.draw(context, stave)
    })

    context.closeGroup();
    group.classList.add('layer-question');
  }

  clearStudentLayer() {
    var elements = document.getElementsByClassName('layer-student');
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  drawStudentLayer(context, stave, studentAnswers) {
    const group = context.openGroup()
    const tickContext = new Vex.Flow.TickContext()

    _.each(studentAnswers, note => {
      const studentNote = new Vex.Flow.StaveNote({ keys: [note.pitch], duration: note.duration, stem_direction: 1 })
      tickContext.addTickable(studentNote)
      tickContext.preFormat().setX(note.position)
      studentNote.setContext(context).setStave(stave)
      studentNote.draw()
    })

    context.closeGroup()
    group.classList.add('layer-student')
  }

  drawOptionsHighlightingLayer(context, stave, voice) {
    _.each(voice.tickables, x => {

      this.drawOptions(context, stave, x)
    })
  }

  drawOptions(context, stave, note) {
    if (note.attrs.type === 'StaveNote') {
      const availableOptions = [
        'E/3', 'F/3', 'G/3', 'A/3', 'B/3',
        'C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'A/4', 'B/4',
        'C/5', 'D/5', 'E/5', 'F/5', 'G/5', 'A/5', 'B/5',
      ]

      _(availableOptions).each(x => {
        const group = context.openGroup()
        group.classList.add('layer-option')

        const optionNote = new Vex.Flow.StaveNote({ keys: [x], duration: 'q', stem_direction: 1 })
        note.tickContext.addTickable(optionNote)
        optionNote.setContext(context).setStave(stave)
        optionNote.draw()

        context.closeGroup()

        group.addEventListener('click', () => {
          store.dispatch(studentAddedNote({
            pitch: x,
            duration: 'q',
            position: optionNote.tickContext.getX(),
            questionId: this.artist.question.id,
          }))
        })
      })
    }
  }
}
