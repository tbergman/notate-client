// @flow

import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { professorAddedAnswerNote } from 'modules/create/actions'
import Stave from './Stave'

class ProfessorAnswersStave extends Component {
  addAnswerNote(position, pitch) {
    const currentPosition = position

    this.props.addAnswerNote({
      pitch: pitch,
      duration: this.props.selectedDuration,
      accidental: this.props.selectedAccidental,
      position: currentPosition,
      isRest: this.props.restSelected,
      isDotted: this.props.isDotted,
    })
  }

  render(): React.Element<any> {
    return (
      <Stave {...this.props}
        layers={[
          { id: 'question', data: this.props.question.notes },
          { id: 'answer', data: this.props.question.answers },
        ]}
        addNote={(position, note) => this.addAnswerNote(position, note)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.create.question.toJS(),
    selectedDuration: state.toolbox.selectedDuration,
    selectedAccidental: state.toolbox.selectedAccidental,
    restSelected: state.toolbox.restSelected,
    isDotted: state.toolbox.dotSelected,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addAnswerNote: ((note) => dispatch(professorAddedAnswerNote(note))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorAnswersStave)
