// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from 'views/styles/colors'
import { connect } from 'react-redux'
import uuid from 'uuid'
import Layout from './Layout'
import Toolbox from 'views/toolbox/Toolbox'
import Stave from 'views/music/Stave'
import { Button, Textarea, Label } from 'views/components'
import { editQuestion } from 'modules/documents/actions'
import type { StaveNote, StaveAnswerNote } from 'modules/types'
import { PITCH_EQUAL, DURATION_EQUAL } from 'modules/grading'
import EditQuestion from 'views/pages/DocumentPageEditQuestion'

type StateProps = {
  questions: any,
  question: any,
}
type DispatchProps = {
  editQuestion: any,
}
type Props = StateProps & DispatchProps

class DocumentPage extends Component {
  props: Props
  state: State

  renderQuestion(question: Question): React.Element<any> {
    return (
      <QuestionItem key={question.id}>
        <Label>{question.description}</Label>
        <Button type="button" value="Edit"
          onClick={() => this.props.editQuestion(question.id)} />
      </QuestionItem>
    )
  }

  render(): React.Element<any> {
    return (
      <Layout className="app">
        <div className="header">
          Document
          <Link to={'/questions'}>See questions</Link>
        </div>

        <PageContainer>
          <Sidebar>
            <Label>Document</Label>

            <QuestionContainer>
              {_.map(this.props.questions, x => this.renderQuestion(x))}
            </QuestionContainer>
          </Sidebar>

          <EditQuestion />

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
const QuestionContainer = styled.div`
  flex: 7;
  padding: 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
`
const QuestionItem = styled.div``
const QuestionTextarea = styled(Textarea)`
  margin-bottom: 15px;
  width: 400px;
`
const Sidebar = styled.div`
  flex: 3;
  box-shadow: 2px 0 5px -2px rgba(0, 0, 0, 0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
`
const mapStateToProps = (state) => {
  return {
    questions: state.documents.questions.toJS()
  }
}
const mapDispatchToProps = ({
  editQuestion,
})
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage)
