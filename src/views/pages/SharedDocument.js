// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import SelfAssessmentPage from 'views/pages/SelfAssessmentPage'
import AssignmentPage from 'views/pages/AssignmentPage'
import { editDocument } from 'modules/documents/actions'
import { DocumentType } from 'modules/types'
import type { Document } from 'modules/types'

type StateProps = {
  document: Document,
}
type DispatchProps = {
  editDocument: any,
}
type RouterProps = {
  match: any,
}
type Props = StateProps & DispatchProps & RouterProps

class SharedDocument extends Component {
  props: Props

  constructor(props: Props) {
    super(props)

    const documentId = this.props.match.params.id
    this.props.editDocument(documentId)
  }

  render(): React.Element<any>|null {
    if (!this.props.document) {
      return null
    }

    if (this.props.document.documentType === DocumentType.SELF_ASSESSMENT) {
      return (<SelfAssessmentPage />)
    }

    return (<AssignmentPage />)
  }
}

const mapStateToProps = (state) => {
  return {
    document: state.documents.editingDocument,
  }
}
const mapDispatchToProps = ({
  editDocument,
})
export default connect(mapStateToProps, mapDispatchToProps)(SharedDocument)
