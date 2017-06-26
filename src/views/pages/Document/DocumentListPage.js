// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { browserHistory } from 'react-router'
import colors from 'views/styles/colors'
import { connect } from 'react-redux'
import Layout from 'views/pages/Layout'
import { Button, Label, Badge } from 'views/components'
import { editDocument, removeDocument, newDocument } from 'modules/documents/actions'
import type { Question, Document } from 'modules/types'

type StateProps = {
  documents: any,
}
type DispatchProps = {
  editDocument: any,
  removeDocument: any,
  newDocument: any,
}
type Props = StateProps & DispatchProps

class DocumentListPage extends Component {
  props: Props

  editDocument(id) {
    this.props.editDocument(id)
    this.props.history.push('/document')
  }

  renderDocumentLabel(description: string): React.Element<any> {
    if (description) {
      return (<DocumentItemLabel>{description}</DocumentItemLabel>)
    } else {
      return (<QuietLabel>{`< No description provided >`}</QuietLabel>)
    }
  }

  renderDocumentType(type: number): React.Element<any> {
    let color, bgColor, content

    if (type === DocumentType.SELF_ASSESSMENT) {
      content = 'SELF-ASSESSMENT'
      bgColor = colors.mustard
    } else {
      content = 'ASSIGNMENT'
      bgColor = colors.tealDeer
    }

    return (<DocumentBadge backgroundColor={bgColor}>{content}</DocumentBadge>)
  }

  renderDocument(document: Document): React.Element<any> {
    return (
      <DocumentItem key={document.id}>
        {this.renderDocumentType(document.documentType)}

        {this.renderDocumentLabel(document.description)}

        <DocumentItemButton type="button" value="Edit"
          onClick={() => this.editDocument(document.id)} />

        <DocumentItemButton type="button" value="Remove"
          onClick={() => this.props.removeDocument(document.id)} />
      </DocumentItem>
    )
  }

  render(): React.Element<any> {
    return (
      <Layout title="Document List">
        <PageContainer>
          <DocumentListContainer>
            {_.map(this.props.documents, x => this.renderDocument(x))}
          </DocumentListContainer>

          <Button type="button" value="+ New Document"
            onClick={() => this.props.newDocument()}
          />
        </PageContainer>
      </Layout>
    )
  }
}

const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
`
const DocumentListContainer = styled.div`
  flex: 1;
`
const DocumentItem = styled.div`
  border-bottom: 1px solid ${colors.lightGrey};
  margin-bottom: 20px;
  padding: 10px;
  min-width: 968px;
`
const DocumentItemLabel = Label.extend`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  padding: 0;
  margin-bottom: 5px;
  display: inline-block;
`
const DocumentItemButton = Button.extend`
  padding: 5px 10px;
  font-weight: 500;
  line-height: 1;
  float: right;
`
const DocumentBadge = Badge.extend`
  float: left;
`
const Sidebar = styled.div`
  flex: 3;
  box-shadow: 2px 0 5px -2px rgba(0, 0, 0, 0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
`
const QuietLabel = DocumentItemLabel.extend`
  color: ${colors.lightGrey};
`
const mapStateToProps = (state) => {
  return {
    documents: state.documents.documents.toJS(),
  }
}
const mapDispatchToProps = ({
  editDocument,
  removeDocument,
  newDocument,
})
export default connect(mapStateToProps, mapDispatchToProps)(DocumentListPage)
