// @flow

import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import {
  professorAddedQuestionNote,
  professorErasedQuestionNote,
} from 'modules/create/actions'

import { selectNote } from 'modules/toolbox/actions'
import Stave from './Stave'

class ProfessorQuestionStave extends Component {
  addQuestionNote(position: number, pitch: string) {
    const currentPosition = position

    this.props.addQuestionNote({
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
        ]}
        addNote={(position, note) => this.addQuestionNote(position, note)}
        selectNote={(note) => this.props.selectNote(note)}
        eraseNote={(note) => this.props.erasedQuestionNote(note)}
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
    addQuestionNote: ((note) => dispatch(professorAddedQuestionNote(note))),
    erasedQuestionNote: ((note) => dispatch(professorErasedQuestionNote(note))),
    selectNote: ((note) => dispatch(selectNote(note))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorQuestionStave)
