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
import { RadioGroup, Radio } from 'react-radio-group'
import { selectStaveNotes } from 'modules/notes/selectors'
import { VALIDATE_PITCH_ONLY, VALIDATE_DURATION_ONLY, VALIDATE_PITCH_DURATION } from 'modules/grading'
import { saveQuestion, setSelectedDescription, setSelectedValidators } from 'modules/documents/actions'
import EditingQuestionStaveProperties from 'views/pages/Document/EditingQuestionStaveProperties'

type OwnProps = {}
type StateProps = {
  selectStaveNotes: any,
  question: any,
  selectedDescription: string,
  selectedClef: string,
  selectedTimeSignature: string,
  selectedKeySignature: string,
  selectedMeasures: number,
  selectedValidators: string,
}
type DispatchProps = {
  saveQuestion: any,
  setSelectedDescription: any,
  setSelectedValidators: any,
}
type Props = OwnProps & StateProps & DispatchProps

class EditingQuestion extends Component {
  props: Props;

  saveQuestion() {
    this.props.saveQuestion({
      ...this.props.question,
      id: this.props.question.id || uuid(),
      questionLayerId: this.props.question.questionLayerId || uuid(),
      answerLayerId: this.props.question.answerLayerId || uuid(),
      studentLayerId: this.props.question.studentLayerId || uuid(),
      questionNotes: this.props.selectStaveNotes(this.props.question.questionLayerId),
      answerNotes: this.props.selectStaveNotes(this.props.question.answerLayerId),
      description: this.props.selectedDescription,
      clef: this.props.selectedClef,
      keySignature: this.props.selectedKeySignature,
      timeSignature: this.props.selectedTimeSignature,
      measures: this.props.selectedMeasures,
      validators: this.props.selectedValidators,
    })
  }

  onDescriptionChange(e: Event) {
    if (e.target instanceof HTMLTextAreaElement) {
      this.props.setSelectedDescription(e.target.value)
    }
  }

  render(): React.Element<any> {
    return (
      <QuestionContainer>

        <StaveContainer>
          <Toolbox />

          <Label>Enter the question text below</Label>
          <QuestionProperties>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <QuestionTextarea value={this.props.selectedDescription} onChange={(evt) => this.onDescriptionChange(evt)}/>
            </div>

            <EditingQuestionStaveProperties />
          </QuestionProperties>

          <Stave
            clef={this.props.selectedClef}
            keySignature={this.props.selectedKeySignature}
            time={this.props.selectedTimeSignature}
            measures={this.props.selectedMeasures}
            editingStaveId={this.props.question.questionLayerId}
            layers={[
              { id: this.props.question.questionLayerId, className: 'question' }
            ]}
          />
        </StaveContainer>

        <StaveContainer>
          <Label>Enter the answers below</Label>

          <RadioGroup name="validators" selectedValue={this.props.selectedValidators}
            onChange={(value) => this.props.setSelectedValidators(value)}>
            <div><Radio value={VALIDATE_PITCH_ONLY} />Validate pitch only</div>
            <div><Radio value={VALIDATE_DURATION_ONLY} />Validate duration only</div>
            <div><Radio value={VALIDATE_PITCH_DURATION} />Validate pitch & duration</div>
          </RadioGroup>

          <Stave
            clef={this.props.selectedClef}
            keySignature={this.props.selectedKeySignature}
            time={this.props.selectedTimeSignature}
            measures={this.props.selectedMeasures}
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
const mapStateToProps = (state) => {
  return {
    selectStaveNotes: selectStaveNotes(state),
    question: state.documents.editing,
    selectedDescription: state.documents.selectedDescription,
    selectedClef: state.documents.selectedClef,
    selectedTimeSignature: state.documents.selectedTimeSignature,
    selectedKeySignature: state.documents.selectedKeySignature,
    selectedMeasures: state.documents.selectedMeasures,
    selectedValidators: state.documents.selectedValidators,
  }
}
const mapDispatchToProps = ({
  saveQuestion,
  setSelectedDescription,
  setSelectedValidators,
})
export default connect(mapStateToProps, mapDispatchToProps)(EditingQuestion)
