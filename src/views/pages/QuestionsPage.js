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
import { gradeLayers, clearGrading } from 'modules/grading/actions'
import { clearLayer } from 'modules/notes/actions'
import { selectStaveNotes } from 'modules/notes/selectors'
import { selectGradingById } from 'modules/grading/selectors'
import type { StaveNote, StaveAnswerNote } from 'modules/types'
import { lighten } from 'polished'

const questionLayerId = 'question'
const answersLayerId = 'answer'
const studentLayerId = 'student'
const gradingId = 'question-grading'

class QuestionsPage extends Component {
  clearStudentLayer() {
    this.props.clearLayer(studentLayerId)
    this.props.clearGrading(gradingId)
  }

  saveQuestion() {
    this.props.saveQuestion({
      ...this.props.question,
      questionNotes: this.props.selectStaveNotes(questionLayerId),
      answerNotes: this.props.selectStaveNotes(answersLayerId),
      description: this.state.description,
    })
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
          Questions >
          <Link to={'/create'}>Create question</Link>
        </div>

        <PageContainer>
          <ToolboxContainer>
            <Toolbox />

            <Actions>
              <ActionButton type="button" value="Clear Student's Answers"
                onClick={() => this.clearStudentLayer()}
              />

              <ActionButton type="button" value="Grade"
                onClick={() => this.props.gradeLayers(
                  gradingId,
                  this.props.selectStaveNotes(answersLayerId),
                  this.props.selectStaveNotes(studentLayerId),
                )}
              />
            </Actions>
          </ToolboxContainer>

          <QuestionContainer>

            <StaveContainer>
              <Label>{this.props.question.description}</Label>
              <Stave
                editingStaveId={studentLayerId}
                layers={[
                  { id: questionLayerId },
                  { id: studentLayerId }
                ]}
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
const Label = styled.div`
  font-weight: 700;
  color: ${colors.grey};
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.6px;
  padding: 2px 0;
  margin-bottom: 15px;
  text-align: left;
`
const QuestionDescription = Label.extend`
  border-bottom: 1px dashed ${colors.teal};
`
const QuestionTextarea = styled.textarea`
  display: block;
  padding: 10px;
  height: 50px;
  resize: vertical;
  line-height: inherit;
  border: 1px solid #aaa;
  border-radius: 2px;
  background-color: ${colors.white};
  color: ${colors.grey};
  margin-bottom: 15px;
  font-size: 14px;
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
const Button = styled.input`
  border-color: ${colors.teal};
  background-color: ${colors.teal};
  color: ${colors.white};
  display: inline-block;
  margin-bottom: 0;
  border-radius: 4px;
  border: 1px solid;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  line-height: 1.43;
  cursor: pointer;
  padding: 9px 27px;
  font-size: 14px;
  margin-right: 10px;

  &:hover {
    background-color: ${lighten(0.05, colors.teal)};
  }
`
const Actions = styled.div`
  padding: 10px 0;
  margin-top: 20px;
`
const ActionButton = Button.extend`
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
    question: state.create.question.toJS()
  }
}
const mapDispatchToProps = ({
  gradeLayers,
  clearGrading,
  clearLayer,
})
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage)