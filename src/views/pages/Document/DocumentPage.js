// @flow

import _ from 'lodash'
import { List } from 'immutable'
import React, { Component } from 'react'
import styled from 'styled-components'
import colors from 'views/styles/colors'
import { connect } from 'react-redux'
import Layout from 'views/pages/Layout'
import { Button, Label } from 'views/components'
import { editQuestion, removeQuestion, newQuestion, saveDocument } from 'modules/documents/actions'
import EditingQuestion from 'views/pages/Document/EditingQuestion'
import type { Question } from 'modules/types'
import { selectQuestions } from 'modules/documents/selectors'

type StateProps = {
  questions: any,
  question: any,
}
type DispatchProps = {
  editQuestion: any,
  removeQuestion: any,
  newQuestion: any,
  saveDocument: any,
}
type Props = StateProps & DispatchProps

class DocumentPage extends Component {
  props: Props

  saveDocument() {
    this.props.saveDocument({
      id: this.props.documentId,
      questions: List(this.props.questions),
    })
  }

  renderQuestionLabel(description: string): React.Element<any> {
    if (description) {
      return (<QuestionItemLabel>{description}</QuestionItemLabel>)
    } else {
      return (<QuietLabel>{`< No description provided >`}</QuietLabel>)
    }
  }

  renderQuestion(question: Question): React.Element<any> {
    return (
      <QuestionItem key={question.id} active={question.id === this.props.question.id}>
        {this.renderQuestionLabel(question.description)}

        <QuestionItemButton type="button" value="Edit"
          onClick={() => this.props.editQuestion(question.id, this.props.documentId)} />

        <QuestionItemButton type="button" value="Remove"
          onClick={() => this.props.removeQuestion(question.id, this.props.documentId)} />
      </QuestionItem>
    )
  }

  render(): React.Element<any> {
    return (
      <Layout title="Document">
        <PageContainer>
          <Sidebar>
            <Label>Document</Label>

            <Button type="button" value="Save Document"
              onClick={() => this.saveDocument()}
            />

            <QuestionsContainer>
              {_.map(this.props.questions, x => this.renderQuestion(x))}
            </QuestionsContainer>

            <Button type="button" value="+ New Question"
              onClick={() => this.props.newQuestion(this.props.documentId)}
            />
          </Sidebar>

          <EditingQuestion />

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
const QuestionsContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`
const QuestionItem = styled.div`
  border: 1px solid ${colors.lightGrey};
  border-radius: 5px;
  margin-bottom: 5px;

  border: ${props => !!props.active ? '2px solid' : '1px solid'};
  border-color: ${props => !!props.active ? colors.mustard : colors.lightGrey};
  box-shadow: ${props => !!props.active ? '0px 0px 7px 0px #FFCF56' : 'none'};
  padding: ${props => !!props.active ? '9px' : '10px'};
`
const QuestionItemLabel = Label.extend`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  padding: 0;
  margin-bottom: 5px;
  display: inline-block;
`
const QuestionItemButton = Button.extend`
  padding: 5px 10px;
  font-weight: 500;
  line-height: 1;
  float: right;
`
const Sidebar = styled.div`
  flex: 3;
  box-shadow: 2px 0 5px -2px rgba(0, 0, 0, 0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
`
const QuietLabel = QuestionItemLabel.extend`
  color: ${colors.lightGrey};
`
const mapStateToProps = (state) => {
  return {
    documentId: state.documents.editingDocumentId,
    questions: state.documents.questions.toJS(),
    question: state.documents.editing,
  }
}
const mapDispatchToProps = ({
  editQuestion,
  removeQuestion,
  newQuestion,
  saveDocument,
})
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage)
