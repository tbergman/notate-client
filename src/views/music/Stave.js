// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Flow } from 'vexflow'
import { studentAddedNote } from 'modules/student-test/actions'
import type { Question as QuestionType } from 'modules/student-test'

import VexTab from 'modules/music/notation/vextab'
import Artist from 'modules/music/notation/artist'
import StyledLayers from './StyledLayers'

type Props = {
  width?: number,
  height?: number,
  clef?: string,
  keySignature?: string,
  time?: string,
  description?: string,
  notes: string,
  annotations?: string,
  question?: QuestionType,
  disableEditing?: boolean,
}

class Stave extends Component {
  staveContainer: React.Element<any>
  artist: Artist
  props: Props

  componentDidUpdate() {
    this.artist.redrawQuestion(this.props.question)
  }

  componentDidMount() {
    const {
      width = 800,
      clef = 'treble',
      keySignature = 'C',
      time = '4/4',
      annotations = '',
      notes = '',
      question = {},
    } = this.props

    const text = (annotations ? `text ${annotations}` : '')
    const notation = `
      stave notation=true tablature=false
        key=${keySignature.trim()}
        time=${time.trim()}
        clef=${clef.trim()}
      notes ${notes.trim()}
      ${text}
    `
    this.artist = new Artist(10, 10, width, {
      scale: 1,
      addNote: (position, pitch) => this.addStudentNote(position, pitch)
    }, question)
    
    const vextab = new VexTab(this.artist)
    const renderer = new Flow.Renderer(this.staveContainer, Flow.Renderer.Backends.SVG)
    vextab.parse(notation)

    this.artist.render(renderer)
  }

  addStudentNote(position, pitch) {
    const studentNotes = this.props.question.student
    const currentPosition = position
    const studentNotesAtPosition = _
      .filter(studentNotes, x => x.position === currentPosition)
      .length

    const maxNumberOfNotes = (
      this.artist.question.options &&
      this.artist.question.options.maxNotesPerMeasure) ||
      -1

    if (maxNumberOfNotes === -1 || studentNotesAtPosition < maxNumberOfNotes) {
      this.props.studentAddedNote({
        pitch: pitch,
        duration: 'q',
        position: currentPosition,
        questionId: this.props.question.id,
      })
    }
  }

  render(): React.Element<any> {
    return (
      <StyledLayers>
        <div className="description">
          {this.props.description}
        </div>

        <div className="stave" ref={(div) => { this.staveContainer = div }} />
      </StyledLayers>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return { }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    studentAddedNote: ((note) => dispatch(studentAddedNote(note))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stave)
