// @flow

import _ from 'lodash'
import { List } from 'immutable'
import React, { Component } from 'react'
import styled from 'styled-components'
import colors from 'views/styles/colors'
import { connect } from 'react-redux'
import Layout from 'views/pages/Layout'
import { Button, Label, Textarea } from 'views/components'
import { RadioGroup, Radio } from 'react-radio-group'
import { editQuestion, removeQuestion, newQuestion, saveDocument } from 'modules/documents/actions'
import EditingQuestion from 'views/pages/Document/EditingQuestion'
import type { Question } from 'modules/types'
import { DocumentType } from 'modules/types'
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

  constructor(props) {
    super(props)

    this.state = {
      description: props.document.description,
      documentType: props.document.documentType,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.document.id !== this.props.document.id) {
      console.log('next prop clearing')
      this.setState({
        description: nextProps.document.description,
        documentType: nextProps.document.documentType,
      })
    }
  }

  onDescriptionChange(e: Event) {
    if (e.target instanceof HTMLTextAreaElement) {
      this.setState({ description: e.target.value })
    }
  }

  onDocumentTypeChange(value) {
    console.log(value)
    this.setState({ documentType: value })
  }

  saveDocument() {
    this.props.saveDocument({
      ...this.props.document,
      description: this.state.description,
      documentType: this.state.documentType,
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
          onClick={() => this.props.editQuestion(question.id)} />

        <QuestionItemButton type="button" value="Remove"
          onClick={() => this.props.removeQuestion(question.id)} />
      </QuestionItem>
    )
  }

  render(): React.Element<any> {
    return (
      <Layout title="Document">
        <PageContainer>
          <Sidebar>
            <Label>Document</Label>

            <DocumentDescriptionTextarea
              value={this.state.description}
              onChange={(evt) => this.onDescriptionChange(evt)}/>

            <DocumentPropertyContainer>
              <DocumentPropertyLabel>Type:</DocumentPropertyLabel>
              <DocumentTypeRadioGroup name="document-type" selectedValue={this.state.documentType}
                onChange={(value) => this.onDocumentTypeChange(value)}>
                <Radio value={DocumentType.SELF_ASSESSMENT} />Self-Assessment
                <Radio value={DocumentType.ASSIGNMENT} />Assignment
              </DocumentTypeRadioGroup>
            </DocumentPropertyContainer>

            <SaveDocumentButton type="button" value="Save Document"
              onClick={() => this.saveDocument()}
            />

            <Label>Questions</Label>

            <QuestionsContainer>
              {_.map(this.props.questions, x => this.renderQuestion(x))}
            </QuestionsContainer>

            <Button type="button" value="+ New Question"
              onClick={() => this.props.newQuestion()}
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
const DocumentDescriptionTextarea = styled(Textarea)`
  display: inline-block;
  margin-bottom: 15px;
`
const SaveDocumentButton = styled(Button)`
  margin-bottom: 50px;
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
const DocumentPropertyContainer = styled.div`
  text-align: left;
`
const DocumentPropertyLabel = Label.extend`
  display: inline-block;
  font-size: 14px;
`
const DocumentTypeRadioGroup = styled(RadioGroup)`
  display: inline-block;

  input {
    margin-left: 20px;
    height: 15px;
  }
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
    document: state.documents.editingDocument,
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
