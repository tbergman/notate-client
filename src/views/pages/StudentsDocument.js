// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import colors from 'views/styles/colors'
import { connect } from 'react-redux'
import Layout from './Layout'
import Toolbox from 'views/toolbox/Toolbox'
import Stave from 'views/music/Stave'
import { gradeLayers, clearGrading } from 'modules/grading/actions'
import { clearLayer } from 'modules/notes/actions'
import { selectStaveNotes } from 'modules/notes/selectors'
import { selectGradingById } from 'modules/grading/selectors'
import { Button, Label } from 'views/components'
import type { Question } from 'modules/types'

class StudentsDocument extends Component {
  clearStudentLayer(id: string, gradingId: string) {
    this.props.clearLayer(id)
    this.props.clearGrading(gradingId)
  }

  renderGrade(question: Question): React.Element<any>|null {
    const grade = this.props.grade(question.id)
    if (grade) {
      return (
        <StyledGrade correct={grade.correct}>
          {grade.correct ? 'CORRECT' : 'INCORRECT'}
        </StyledGrade>
      )
    }
    return null
  }

  render(): React.Element<any> {
    return (
      <PageContainer>
        <ToolboxContainer>
          <Toolbox />

          <DocumentDescriptionLabel>Description:</DocumentDescriptionLabel>
          <DocumentDescription>{this.props.document.description}</DocumentDescription>
        </ToolboxContainer>

        <QuestionContainer>
          {_.map(this.props.questions, x => this.renderQuestion(x))}
        </QuestionContainer>
      </PageContainer>
    )
  }

  renderQuestion(question: Question): React.Element<any> {
    const questionLayerId = question.questionLayerId
    const answersLayerId = question.answerLayerId
    const studentLayerId = question.studentLayerId
    const gradingId = question.id

    return (
      <StaveContainer key={question.id}>
        <Label>{question.description}</Label>
        <Stave
          clef={question.clef}
          keySignature={question.keySignature}
          time={question.timeSignature}
          editingStaveId={studentLayerId}
          layers={[
            { id: questionLayerId, className: 'question' },
            { id: studentLayerId, className: 'student' }
          ]}
        />

        {this.props.gradingAllowed ? (
          <Button type="button" value="Clear Student's Answers"
            onClick={() => this.clearStudentLayer(studentLayerId, gradingId)}
          />) : null}

        {this.props.gradingAllowed ? (
          <Button type="button" value="Grade"
            onClick={() => this.props.gradeLayers(
              gradingId,
              this.props.selectStaveNotes(answersLayerId),
              this.props.selectStaveNotes(studentLayerId),
            )}
          />) : null}

        {this.renderGrade(question)}

      </StaveContainer>
    )
  }
}

const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`
const ToolboxContainer = styled.div`
  flex: 3;
  box-shadow: 2px 0 5px -2px rgba(0, 0, 0, 0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
`
const DocumentDescriptionLabel = Label.extend`
  margin-top: 30px;
  margin-bottom: 15px;
`
const DocumentDescription = Label.extend`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  display: inline-block;
`
const QuestionContainer = styled.div`
  flex: 7;
  padding: 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow: auto;
`
const StaveContainer = styled.div`
  flex: 1;

  &:not(:last-child) {
    border-bottom: 1px dashed ${colors.teal};
    margin-bottom: 30px;
    padding-bottom: 30px;
  }
`
const StyledGrade = styled.span`
  color: ${props => props.correct ? 'green' : 'red'};
`
const mapStateToProps = (state) => {
  return {
    selectStaveNotes: selectStaveNotes(state),
    grade: (gradingId) => { return selectGradingById(state, gradingId) },
    questions: state.documents.questions.toJS(),
    document: state.documents.editingDocument,
  }
}
const mapDispatchToProps = ({
  gradeLayers,
  clearGrading,
  clearLayer,
})
export default connect(mapStateToProps, mapDispatchToProps)(StudentsDocument)
