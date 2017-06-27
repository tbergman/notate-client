// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import SelfAssessmentPage from 'views/pages/SelfAssessmentPage'
import AssignmentPage from 'views/pages/AssignmentPage'
import { editDocument } from 'modules/documents/actions'
import { DocumentType } from 'modules/types'

class SharedDocument extends Component {
  constructor(props) {
    super(props)

    const documentId = this.props.match.params.id
    this.props.editDocument(documentId)
  }

  render(): React.Element<any> {
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
