// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setDuration } from 'modules/toolbox/actions'
import { shouldHighlightNoteSpecificItems } from 'modules/toolbox/selectors'
import ToolboxItem from 'views/toolbox/ToolboxItem'

class DurationToolboxItem extends Component {
  isDurationSelected() {
    const duration = this.props.duration

    return this.props.toolbox.selectedDuration === duration
      && this.props.shouldHighlightNoteSpecificItems
  }

  render(): React.Element<any> {
    return (
      <ToolboxItem {...this.props}
        disabled={this.props.toolbox.eraserSelected}
        selected={this.isDurationSelected()}
        onClick={() => this.props.setDuration(this.props.duration)}>
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
    setDuration: ((duration) => dispatch(setDuration(duration)))
  }),
)(DurationToolboxItem)
