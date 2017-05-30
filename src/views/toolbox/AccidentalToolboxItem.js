// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAccidental } from 'modules/toolbox/actions'
import { shouldHighlightNoteSpecificItems } from 'modules/toolbox/selectors'
import ToolboxItem from 'views/toolbox/ToolboxItem'

class AccidentalToolboxItem extends Component {
  isAccidentalSelected() {
    const accidental = this.props.accidental

    return this.props.toolbox.selectedAccidental === accidental
      && !this.props.toolbox.restSelected
      && this.props.shouldHighlightNoteSpecificItems
  }

  render(): React.Element<any> {
    return (
      <ToolboxItem {...this.props}
        disabled={this.props.toolbox.restSelected || this.props.toolbox.eraserSelected}
        selected={this.isAccidentalSelected()}
        onClick={() => this.props.setAccidental(this.props.accidental)}>
      </ToolboxItem>
    )
  }
}

export default connect(
  state => ({
    toolbox: state.toolbox,
    shouldHighlightNoteSpecificItems: shouldHighlightNoteSpecificItems(state)
  }),
  dispatch => ({
    setAccidental: ((accidental) => dispatch(setAccidental(accidental)))
  }),
)(AccidentalToolboxItem)
