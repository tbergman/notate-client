// @flow

import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { studentAddedNote } from 'modules/student-test/actions'
import Stave from './Stave'

class StudentStave extends Component {
  addStudentNote(position: number, pitch: string) {
    const studentNotes = this.props.question.student
    const currentPosition = position
    const studentNotesAtPosition = _
      .filter(studentNotes, x => x.position === currentPosition)
      .length

    const maxNumberOfNotes = (
      this.props.question.options &&
      this.props.question.options.maxNotesPerMeasure) ||
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
      <Stave {...this.props}
        layers={[
          { id: 'question', data: this.props.question.question },
          { id: 'student', data: this.props.question.student },
        ]}
        addNote={(position, note) => this.addStudentNote(position, note)}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentStave)
