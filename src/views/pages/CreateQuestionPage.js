// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Layout from './Layout'
import Toolbox from 'views/toolbox/Toolbox'
import Stave from 'views/music/Stave'
import PitchComparison from 'modules/grading/comparison.pitch'
import { gradeLayers, clearGrading } from 'modules/grading/actions'
import { clearLayer } from 'modules/notes/actions'
import { selectStaveNotes } from 'modules/notes/selectors'
import { selectGradingById } from 'modules/grading/selectors'

const questionLayerId = 'question'
const answersLayerId = 'answer'
const studentLayerId = 'student'
const gradingId = 'create-question-grading'

class CreateQuestionPage extends Component {
  onBeforeAddingNote(note) {
    note.validators = [PitchComparison.equal]
    return note
  }

  clearStudentLayer() {
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
          <h2>Create Questions</h2>
        </div>

        <PageContainer>
          <ToolboxContainer>
            <Toolbox />
          </ToolboxContainer>

          <QuestionContainer>
            <Stave description={'What will the question look like?'}
              editingStaveId={questionLayerId}
              layers={[
                { id: questionLayerId }
              ]}
            />

            <Stave description={'What would the answers be?'}
              editingStaveId={answersLayerId}
              onBeforeAddingNote={(note) => this.onBeforeAddingNote(note) }
              layers={[
                { id: questionLayerId },
                { id: answersLayerId }
              ]}
            />

            <Stave description={'Answer here as a student would'}
              editingStaveId={studentLayerId}
              layers={[
                { id: questionLayerId },
                { id: studentLayerId }
              ]}
            />

            <input type="button" value="Clear Student's Answers"
              onClick={() => this.clearStudentLayer()}
            />

            <input type="button" value="Grade"
              onClick={() => this.props.gradeLayers(
                gradingId,
                this.props.selectStaveNotes(answersLayerId),
                this.props.selectStaveNotes(studentLayerId),
              )}
            />

            {this.renderGrade()}

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
const ToolboxContainer = styled.div`
  flex: 3;
  box-shadow: 2px 0 5px -2px rgba(0, 0, 0, 0.2);
  padding: 30px;
`
const QuestionContainer = styled.div`
  flex: 7;
  padding: 30px;
`
const StyledGrade = styled.span`
  color: ${props => props.correct ? 'green' : 'red'};
`
const mapStateToProps = (state) => {
  return {
    selectStaveNotes: selectStaveNotes(state),
    grade: selectGradingById(state, gradingId)
  }
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    gradeLayers: ((gradingId, answers, student) => dispatch(gradeLayers(gradingId, answers, student))),
    clearGrading: ((gradingId) => dispatch(clearGrading(gradingId))),
    clearLayer: ((layerId) => dispatch(clearLayer(layerId))),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestionPage)
