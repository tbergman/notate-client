// @flow

import _ from 'lodash'
import uuid from 'uuid'
import React, { Component } from 'react'
import styled from 'styled-components'
import colors from 'views/styles/colors'
import { connect } from 'react-redux'
import Toolbox from 'views/toolbox/Toolbox'
import Stave from 'views/music/Stave'
import { Button, Textarea, Label } from 'views/components'
import Select from 'react-select'
import { RadioGroup, Radio } from 'react-radio-group'
import { saveQuestion } from 'modules/documents/actions'
import { selectStaveNotes } from 'modules/notes/selectors'
import { VALIDATE_PITCH_ONLY, VALIDATE_DURATION_ONLY, VALIDATE_PITCH_DURATION } from 'modules/grading'

type State = {
  description: string,
  clef: string,
  timeSignature: string,
  keySignature: string,
  validators: string,
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
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props)
    this.state = {
      description: '',
      clef: 'treble',
      timeSignature: '4/4',
      keySignature: 'C',
      validators: VALIDATE_PITCH_DURATION,
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.question.id !== this.props.question.id) {
      this.setState({
        description: nextProps.question.description,
        clef: nextProps.question.clef,
        timeSignature: nextProps.question.timeSignature,
        keySignature: nextProps.question.keySignature,
        validators: nextProps.question.validators,
      })
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
      clef: this.state.clef,
      keySignature: this.state.keySignature,
      timeSignature: this.state.timeSignature,
      validators: this.state.validators,
    })
  }

  onDescriptionChange(e: Event) {
    if (e.target instanceof HTMLTextAreaElement) {
      this.setState({ description: e.target.value })
    }
  }

  changeClef(option: any) {
    this.setState({ clef: option.value })
  }

  changeTimeSignature(option: any) {
    this.setState({ timeSignature: option.value })
  }

  changeKeySignature(option: any) {
    this.setState({ keySignature: option.value })
  }

  changeValidators(value: string) {
    this.setState({ validators: value })
  }

  render(): React.Element<any> {
    return (
      <QuestionContainer>

        <StaveContainer>
          <Toolbox />

          <Label>Enter the question text below</Label>
          <QuestionProperties>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <QuestionTextarea value={this.state.description} onChange={(evt) => this.onDescriptionChange(evt)}/>
            </div>

            {this.renderStaveProperties()}
          </QuestionProperties>


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

          <RadioGroup name="validators" selectedValue={this.state.validators}
            onChange={(value) => this.changeValidators(value)}>
            <div><Radio value={VALIDATE_PITCH_ONLY} />Validate pitch only</div>
            <div><Radio value={VALIDATE_DURATION_ONLY} />Validate duration only</div>
            <div><Radio value={VALIDATE_PITCH_DURATION} />Validate pitch & duration</div>
          </RadioGroup>

          <Stave
            clef={this.state.clef}
            keySignature={this.state.keySignature}
            time={this.state.timeSignature}
            editingStaveId={this.props.question.answerLayerId}
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

  renderStaveProperties(): React.Element<any> {
    const propsDisabled = (
      this.props.selectStaveNotes(this.props.question.questionLayerId).length > 0 ||
      this.props.selectStaveNotes(this.props.question.answerLayerId).length > 0
    )

    return (
      <StaveProperties>
        <StaveProperty>
          <StavePropertyLabel>Clef: </StavePropertyLabel>
          <StavePropertySelect name="clef" value={this.state.clef}
            onChange={(option) => this.changeClef(option)}
            clearable={false}
            disabled={propsDisabled}
            options={[
              { value: 'treble', label: 'Treble' },
              { value: 'bass', label: 'Bass' },
              { value: 'alto', label: 'Alto' },
              { value: 'tenor', label: 'Tenor' },
            ]}/>
        </StaveProperty>

        <StaveProperty>
          <StavePropertyLabel>Time: </StavePropertyLabel>
          <StavePropertySelect name="time-signature" value={this.state.timeSignature}
            onChange={(option) => this.changeTimeSignature(option)}
            clearable={false}
            disabled={propsDisabled}
            options={[
              { value: '4/4', label: '4/4' },
              { value: '3/4', label: '3/4' },
              { value: '2/4', label: '2/4' },
              { value: '6/8', label: '6/8' },
              { value: 'C|', label: 'Cut' },
              { value: 'C', label: 'Common' },
            ]}/>
        </StaveProperty>

        <StaveProperty>
          <StavePropertyLabel>Key: </StavePropertyLabel>
          <StavePropertySelect name="key-signature" value={this.state.keySignature}
            onChange={(option) => this.changeKeySignature(option)}
            clearable={false}
            disabled={propsDisabled}
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
        </StaveProperty>
      </StaveProperties>
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
  flex: 1;
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
const QuestionProperties = styled.div`
  display: flex;
`
const StaveProperties = styled.div`
  flex: 1;
  display: inline-block;
  margin-left: 10px;
`
const StaveProperty = styled.div`
  display: flex;
`
const StavePropertyLabel = Label.extend`
  display: inline-block;
  font-size: 14px;
  width: 30px;
  margin-left: 20px;
`
const StavePropertySelect = styled(Select)`
  display: inline-block;
  font-size: 13px;
  flex: 1;
  margin-left: 15px;
  cursor: pointer;

  .Select-control, .Select-input {
    height: 28px;
  }

  &.Select--single .Select-control .Select-value {
    line-height: 29px;
  }
`

const mapStateToProps = (state) => {
  return {
    selectStaveNotes: selectStaveNotes(state),
    question: state.documents.editing,
  }
}
const mapDispatchToProps = ({
  saveQuestion,
})
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPageEditQuestion)
