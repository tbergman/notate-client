// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from 'views/styles/colors'
import { connect } from 'react-redux'
import Layout from './Layout'
import Toolbox from 'views/toolbox/Toolbox'
import Stave from 'views/music/Stave'
import { Button, Textarea, Label } from 'views/components'
import Select from 'react-select'
import { saveQuestion } from 'modules/documents/actions'
import { selectStaveNotes } from 'modules/notes/selectors'
import type { StaveNote, StaveAnswerNote } from 'modules/types'
import { PITCH_EQUAL, DURATION_EQUAL } from 'modules/grading'
import uuid from 'uuid'

type State = {
  description: string
}

type OwnProps = {}
type StateProps = {
  selectStaveNotes: any,
  question: any,
}
type DispatchProps = {
  saveQuestion: any,
}
type Props = OwnProps & StateProps & DispatchProps

class DocumentPageEditQuestion extends Component {
  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      description: '',
      clef: 'treble',
      timeSignature: '4/4',
      keySignature: 'C',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.question.id !== this.props.question.id) {
      this.setState({ description: nextProps.question.description })
    }
  }

  onBeforeAddingAnswerNote(note: StaveNote): StaveAnswerNote {
    const newNote = {
      ...note,
      validators: [PITCH_EQUAL, DURATION_EQUAL]
    }
    return newNote
  }

  onDescriptionChange(e: Event) {
    if (e.target instanceof HTMLTextAreaElement) {
      this.setState({ description: e.target.value })
    }
  }

  saveQuestion() {
    this.props.saveQuestion({
      ...this.props.question,
      id: this.props.question.id || uuid(),
      questionLayerId: this.props.question.questionLayerId || uuid(),
      answerLayerId: this.props.question.answerLayerId || uuid(),
      studentLayerId: this.props.question.studentLayerId || uuid(),
      questionNotes: this.props.selectStaveNotes(this.props.question.questionLayerId),
      answerNotes: this.props.selectStaveNotes(this.props.question.answerLayerId),
      description: this.state.description,
    })
  }

  changeClef(option) {
    this.setState({ clef: option.value })
  }

  changeTimeSignature(option) {
    this.setState({ timeSignature: option.value })
  }

  changeKeySignature(option) {
    this.setState({ keySignature: option.value })
  }

  render(): React.Element<any> {
    return (
      <QuestionContainer>

        <StaveContainer>
          <Toolbox />

          <Label>Enter the question text below</Label>

          <QuestionTextarea value={this.state.description} onChange={(evt) => this.onDescriptionChange(evt)}/>

          <StaveProperties>
            <Select name="clef" value={this.state.clef}
              onChange={(option) => this.changeClef(option)}
              clearable={false}
              options={[
                { value: 'treble', label: 'Treble' },
                { value: 'bass', label: 'Bass' },
                { value: 'alto', label: 'Alto' },
                { value: 'tenor', label: 'Tenor' },
              ]}/>

            <Select name="time-signature" value={this.state.timeSignature}
              onChange={(option) => this.changeTimeSignature(option)}
              clearable={false}
              options={[
                { value: '4/4', label: '4/4' },
                { value: '3/4', label: '3/4' },
                { value: '2/4', label: '2/4' },
                { value: '6/8', label: '6/8' },
                { value: 'C|', label: 'C |' },
              ]}/>

            <Select name="key-signature" value={this.state.keySignature}
              onChange={(option) => this.changeKeySignature(option)}
              clearable={false}
              options={[
                { value: 'C', label: 'C' },
                { value: 'Am', label: 'Am' },
                { value: 'F', label: 'F' },
                { value: 'Dm', label: 'Dm' },
                { value: 'Bb', label: 'Bb' },
                { value: 'Gm', label: 'Gm' },
                { value: 'Eb', label: 'Eb' },
                { value: 'Cm', label: 'Cm' },
                { value: 'Ab', label: 'Ab' },
                { value: 'Fm', label: 'Fm' },
                { value: 'Db', label: 'Db' },
                { value: 'Bbm', label: 'Bbm' },
                { value: 'Gb', label: 'Gb' },
                { value: 'Ebm', label: 'Ebm' },
                { value: 'Cb', label: 'Cb' },
                { value: 'Abm', label: 'Abm' },
                { value: 'G', label: 'G' },
                { value: 'Em', label: 'Em' },
                { value: 'D', label: 'D' },
                { value: 'Bm', label: 'Bm' },
                { value: 'A', label: 'A' },
                { value: 'F#m', label: 'F#m' },
                { value: 'E', label: 'E' },
                { value: 'C#m', label: 'C#m' },
                { value: 'B', label: 'B' },
                { value: 'G#m', label: 'G#m' },
                { value: 'F#', label: 'F#' },
                { value: 'D#m', label: 'D#m' },
                { value: 'C#', label: 'C#' },
                { value: 'A#m', label: 'A#m' },
              ]}/>
          </StaveProperties>

          <Stave
            clef={this.state.clef}
            keySignature={this.state.keySignature}
            time={this.state.timeSignature}
            editingStaveId={this.props.question.questionLayerId}
            layers={[
              { id: this.props.question.questionLayerId, className: 'question' }
            ]}
          />

        </StaveContainer>

        <StaveContainer>
          <Label>Enter the answers below</Label>
          <Stave
            clef={this.state.clef}
            keySignature={this.state.keySignature}
            time={this.state.timeSignature}
            editingStaveId={this.props.question.answerLayerId}
            onBeforeAddingNote={(note) => this.onBeforeAddingAnswerNote(note) }
            layers={[
              { id: this.props.question.questionLayerId, className: 'question' },
              { id: this.props.question.answerLayerId, className: 'answer' }
            ]}
          />
        </StaveContainer>

        <Actions>
          <Button type="button" value="Save"
            onClick={() => this.saveQuestion()}
          />
        </Actions>

      </QuestionContainer>
    )
  }
}

const QuestionContainer = styled.div`
  flex: 7;
  padding: 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
`
const QuestionTextarea = styled(Textarea)`
  display: inline-block;
  margin-bottom: 15px;
  width: 50%;
`
const StaveContainer = styled.div`
  flex: 1;

  &:not(:last-child) {
    border-bottom: 1px dashed ${colors.teal};
    margin-bottom: 30px;
    padding-bottom: 30px;
  }
`
const Actions = styled.div`
  padding: 10px 0;
  margin-top: 20px;
`
const StaveProperties = styled.div`
  display: inline-block;
  width: 20%;
  margin-left: 10px;

`
const mapStateToProps = (state) => {
  return {
    selectStaveNotes: selectStaveNotes(state),
    question: state.documents.editing.toJS(),
  }
}
const mapDispatchToProps = ({
  saveQuestion,
})
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPageEditQuestion)
