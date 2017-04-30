// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Vex, { Flow } from 'vexflow'
import cuid from 'cuid'

class Note extends Component {
  note: Flow.StemmableNote;

  static propTypes = {
    pitch: PropTypes.string,
    duration: PropTypes.number,
    stave: PropTypes.object,
    context: PropTypes.object,
    tickContext: PropTypes.object,
  }

  componentDidUpdate() {
    if (!this.props.tickContext || !this.props.stave) {
      return
    }

    const note = new Flow.StaveNote({
      keys: [this.props.pitch],
      stem_direction: 1,
      duration: this.props.duration.toString(),
    })

    console.log(this.props.tickContext);
    this.props.tickContext.addTickable(note)
    note.setContext(this.props.context).setStave(this.props.stave)
    note.x_shift = 1
    note.draw();
    this.props.tickContext.preFormat().setX(this.props.tickContext.x + 40)
  }

  render(): React.Element<any> {
    return (<div></div>)
  }
}

export default Note
