// @flow

import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { professorAddedQuestionNote } from 'modules/create/actions'
import Stave from './Stave'

class ProfessorQuestionStave extends Component {
  addQuestionNote(position, pitch) {
    const currentPosition = position

    this.props.addQuestionNote({
      pitch: pitch,
      duration: this.props.selectedDuration,
      accidental: this.props.selectedAccidental,
      position: currentPosition,
    })
  }

  render(): React.Element<any> {
    return (
      <Stave {...this.props}
        layers={[
          { id: 'question', data: this.props.question.notes },
        ]}
        addNote={(position, note) => this.addQuestionNote(position, note)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.create.question.toJS(),
    selectedDuration: state.toolbox.selectedDuration,
    selectedAccidental: state.toolbox.selectedAccidental,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addQuestionNote: ((note) => dispatch(professorAddedQuestionNote(note))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorQuestionStave)
