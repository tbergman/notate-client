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

  drawOptionsLayer(context, stave, voices) {
    _.each(voices, voice => {
      _.each(voice.tickables, x => {
        this.drawOptionsColumn(context, stave, x)
      })
    })
  }

  drawOptionsColumn(context, stave, note) {
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
