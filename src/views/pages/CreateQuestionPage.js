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
import { gradeLayers, clearGrading } from 'modules/grading/actions'
import { clearLayer } from 'modules/notes/actions'
import { saveQuestion } from 'modules/create/actions'
import { selectStaveNotes } from 'modules/notes/selectors'
import { selectGradingById } from 'modules/grading/selectors'
import type { StaveNote, StaveAnswerNote } from 'modules/types'
import { PITCH_EQUAL, DURATION_EQUAL } from 'modules/grading'
import uuid from 'uuid'

const questionLayerId: string = uuid();
const answerLayerId: string = uuid();
const studentLayerId: string = uuid();
const gradingId: string = 'create-question-grading';

type State = {
  description: string
}

type OwnProps = {}
type StateProps = {
  selectStaveNotes: any,
  grade: any,
  question: any,
}
type DispatchProps = {
  gradeLayers: any,
  clearGrading: any,
  clearLayer: any,
  saveQuestion: any,
}
type Props = OwnProps & StateProps & DispatchProps

class CreateQuestionPage extends Component {

  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    this.state = { description: '' }
  }

  onBeforeAddingAnswerNote(note: StaveNote): StaveAnswerNote {
    const newNote = {
      ...note,
      validators: [PITCH_EQUAL, DURATION_EQUAL]
    }
    return newNote
  }

  clearStudentLayer() {
    this.props.clearLayer(studentLayerId)
    this.props.clearGrading(gradingId)
  }

  onDescriptionChange(e: Event) {
    if (e.target instanceof HTMLTextAreaElement) {
      this.setState({ description: e.target.value })
    }
  }

  saveQuestion() {
    this.props.saveQuestion({
      ...this.props.question,
      id: uuid(),
      questionLayerId: questionLayerId,
      answerLayerId: answerLayerId,
      studentLayerId: studentLayerId,
      questionNotes: this.props.selectStaveNotes(questionLayerId),
      answerNotes: this.props.selectStaveNotes(answerLayerId),
      description: this.state.description,
    })

    this.setState({ description: '' })
    this.props.clearLayer(questionLayerId)
    this.props.clearLayer(answerLayerId)
    this.props.clearLayer(studentLayerId)
    this.props.clearGrading(gradingId)
  }

  renderGrade(): React.Element<any>|null {
    if (this.props.grade) {
      return (
        <StyledGrade correct={this.props.grade.correct}>
          {this.props.grade.correct ? 'CORRECT' : 'FAIL'}
        </StyledGrade>
      )
    }
    return null
  }

  render(): React.Element<any> {
    return (
      <Layout className="app">
        <div className="header">
          Create Questions >
          <Link to={'/questions'}>See questions</Link>
        </div>

        <PageContainer>
          <ToolboxContainer>
            <Label>Enter the question description below</Label>
            <QuestionTextarea value={this.state.description} onChange={(evt) => this.onDescriptionChange(evt)}/>

            <Label>Notation Toolbox</Label>
            <Toolbox />

            <Actions>
              <SaveButton type="button" value="Save"
                onClick={() => this.saveQuestion()}
              />
            </Actions>
          </ToolboxContainer>

          <QuestionContainer>

            <StaveContainer>
              <Label>Enter the question notation below</Label>
              <Stave
                editingStaveId={questionLayerId}
                layers={[
                  { id: questionLayerId, className: 'question' }
                ]}
              />
            </StaveContainer>

            <StaveContainer>
              <Label>Enter the answers below</Label>
              <Stave
                editingStaveId={answerLayerId}
                onBeforeAddingNote={(note) => this.onBeforeAddingAnswerNote(note) }
                layers={[
                  { id: questionLayerId, className: 'question' },
                  { id: answerLayerId, className: 'answer' }
                ]}
              />
            </StaveContainer>

            <StaveContainer>
              <Label>Test your question here, as a student would use it</Label>
              <Stave
                editingStaveId={studentLayerId}
                layers={[
                  { id: questionLayerId, className: 'question' },
                  { id: studentLayerId, className: 'student' }
                ]}
              />

              <Button type="button" value="Clear Student's Answers"
                onClick={() => this.clearStudentLayer()}
              />

              <Button type="button" value="Grade"
                onClick={() => this.props.gradeLayers(
                  gradingId,
                  this.props.selectStaveNotes(answerLayerId),
                  this.props.selectStaveNotes(studentLayerId),
                )}
              />

              {this.renderGrade()}
            </StaveContainer>

          </QuestionContainer>
        </PageContainer>
      </Layout>
    )
  }
}

const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`
const QuestionTextarea = styled(Textarea)`
  margin-bottom: 15px;
`
const ToolboxContainer = styled.div`
  flex: 3;
  box-shadow: 2px 0 5px -2px rgba(0, 0, 0, 0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
`
const QuestionContainer = styled.div`
  flex: 7;
  padding: 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
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
const SaveButton = Button.extend`
  float: right;
  margin-right: 0;
`
const StyledGrade = styled.span`
  color: ${props => props.correct ? 'green' : 'red'};
`
const mapStateToProps = (state) => {
  return {
    selectStaveNotes: selectStaveNotes(state),
    grade: selectGradingById(state, gradingId),
    question: state.create.question
  }
}
const mapDispatchToProps = ({
  gradeLayers,
  clearGrading,
  clearLayer,
  saveQuestion,
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestionPage)
